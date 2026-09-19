import { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Fait apparaitre un bloc quand il entre dans la fenetre.
 *
 * Point important : la classe `reveal`, qui met l'element a `opacity: 0`, est
 * posee par le script, pas ecrite dans le HTML. Si le JavaScript ne s'execute
 * pas, ou si IntersectionObserver est absent, le contenu reste simplement
 * visible. Une animation ne doit jamais pouvoir masquer le contenu.
 *
 * `useLayoutEffect` pose la classe avant la peinture, ce qui evite de voir le
 * bloc apparaitre puis disparaitre avant de reapparaitre en fondu.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delayMs = 0) {
  const ref = useRef<T | null>(null);
  const isArmed = useRef(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    element.classList.add('reveal');
    isArmed.current = true;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isArmed.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          window.setTimeout(() => element.classList.add('reveal-visible'), delayMs);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    observer.observe(element);

    // Filet de securite : si l'observateur ne s'est jamais declenche au bout de
    // deux secondes, on affiche le contenu quand meme.
    const safety = window.setTimeout(() => {
      element.classList.add('reveal-visible');
      observer.disconnect();
    }, 2000);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
  }, [delayMs]);

  return ref;
}
