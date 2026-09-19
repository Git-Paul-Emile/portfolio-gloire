import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Sur une page a ancres, le routeur ne repositionne pas la vue tout seul.
 * Ce composant remonte en haut lors d'un changement de page, et rejoint
 * l'ancre demandee quand l'URL en contient une.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    // La cible peut ne pas encore etre montee au moment du changement d'URL.
    const frame = window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
