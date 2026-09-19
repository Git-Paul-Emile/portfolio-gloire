/**
 * Lien d'evitement : premier element focusable de la page.
 * Il permet a une personne qui navigue au clavier de sauter la navigation et
 * d'atteindre directement le contenu. Il n'apparait qu'au focus.
 */
export default function SkipLink() {
  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-sm focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      Aller au contenu principal
    </a>
  );
}
