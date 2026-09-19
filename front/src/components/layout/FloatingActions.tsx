import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { site } from '@/data/site';

/**
 * Deux actions flottantes, en bas a droite.
 *
 * WhatsApp est toujours visible : c'est le canal de contact le plus direct de
 * la brochure. Le retour en haut n'apparait qu'apres un ecran de defilement,
 * sinon il occupe la place sans servir a rien.
 *
 * Le bloc reste sous l'en-tete dans l'ordre d'empilement (z-40 contre z-50)
 * pour ne jamais recouvrir le menu mobile ouvert.
 */
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    // Le reglage systeme prime : pas de defilement anime si les animations
    // sont reduites.
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={scrollToTop}
        hidden={!showTop}
        aria-label="Revenir en haut de la page"
        className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-mist-400 bg-white text-navy-900 shadow-lg transition-colors hover:bg-navy-900 hover:text-white"
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>

      <a
        href={site.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Écrire sur WhatsApp"
        className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </div>
  );
}
