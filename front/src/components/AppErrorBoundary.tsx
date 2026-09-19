import { Component, type ErrorInfo, type ReactNode } from 'react';
import { site } from '@/data/site';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Frontiere d'erreur placee au-dessus des routes.
 * Un plantage de rendu n'affiche jamais une page blanche : le visiteur garde
 * les deux moyens de contact directs, qui sont l'objectif du site.
 * Le point `reportError` est l'endroit ou brancher un outil de supervision.
 */
export default class AppErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // À remplacer par l'envoi vers l'outil de supervision retenu.
    console.error('[portfolio] erreur de rendu', error, info.componentStack);
  }

  override render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-6 py-16">
        <p className="text-sm font-medium tracking-wide text-blue-600 uppercase">Erreur technique</p>
        <h1 className="text-3xl text-navy-900">La page n'a pas pu s'afficher</h1>
        <p className="text-ink-700">
          Le problème vient du site, pas de votre navigateur. Rechargez la page, ou joignez-moi
          directement pendant que la panne est corrigée.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.phone.href}
            className="rounded-sm bg-navy-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-navy-800"
          >
            Appeler le {site.phone.national}
          </a>
          <a
            href={site.email.href}
            className="rounded-sm border border-navy-900/20 px-5 py-3 text-sm font-medium text-navy-900 transition hover:border-navy-900/50"
          >
            Écrire un courriel
          </a>
        </div>
      </main>
    );
  }
}
