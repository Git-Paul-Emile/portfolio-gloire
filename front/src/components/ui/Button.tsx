import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'outlineLight' | 'quiet';
export type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-center font-medium whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

/**
 * Chaque variante decrit son etat normal et son survol au complet.
 *
 * Ne jamais corriger une variante en ajoutant une classe de survol concurrente
 * via `className` : deux utilitaires `hover:text-*` sur le meme element sont
 * departages par leur ordre dans la feuille de style produite, pas par l'ordre
 * dans l'attribut class. Un fond different appelle une variante, pas une
 * surcharge.
 *
 * Le fond des boutons pleins utilise blue-600 et non blue-500 : le blanc sur
 * blue-500 ne monte qu'a 3,94:1, sous le seuil WCAG AA pour du texte courant.
 */
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'border border-mist-400 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white',
  outlineLight: 'border border-white/50 text-white hover:border-white hover:bg-white hover:text-navy-900',
  quiet: 'text-blue-600 underline decoration-blue-500 underline-offset-4 hover:text-blue-700',
};

const sizes: Record<ButtonSize, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

/** Compose les classes d'un bouton. Expose a part pour styler un lien du routeur. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonProps = StyleProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;
type LinkButtonProps = StyleProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>;

/** Action qui declenche du code : envoi de formulaire, ouverture d'un panneau. */
export default function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

/**
 * Action qui mene ailleurs : appel telephonique, WhatsApp, ancre.
 * C'est un vrai `<a>`, donc ouvrable dans un nouvel onglet et lisible par les
 * technologies d'assistance comme un lien.
 */
export function LinkButton({ variant, size, className, children, ...rest }: LinkButtonProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
