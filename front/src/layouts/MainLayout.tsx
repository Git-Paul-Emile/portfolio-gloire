import { Outlet } from 'react-router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/layout/SkipLink';
import ScrollToHash from '@/components/layout/ScrollToHash';
import FloatingActions from '@/components/layout/FloatingActions';

/**
 * Mise en page commune a toutes les routes : en-tete fixe, contenu, pied de page.
 * `#contenu` est la cible du lien d'evitement.
 */
export default function MainLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <ScrollToHash />
      <Header />
      <main id="contenu" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
