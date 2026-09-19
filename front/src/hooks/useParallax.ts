import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/*
  Les deux hooks ci-dessous ne servent que les mises en page a deux colonnes,
  qui n'existent qu'a partir de 1024 px : une image d'un cote, son texte de
  l'autre, chacun decale en sens inverse.

  En dessous de ce seuil, ces deux blocs sont empiles l'un sur l'autre. Les
  deux mouvements, au lieu de se croiser, se rapprochent et mangent l'espace
  qui les separe : le portrait de « Qui suis-je » venait coller son titre. Le
  hero a la meme contrainte pour une autre raison, son image ne deborde et
  n'est rognee qu'a partir de 1024 px.

  D'ou ce garde-fou commun. Il n'y a rien a compenser en petit ecran : sans
  parallaxe, chaque bloc reste simplement a sa place.
*/
const DEUX_COLONNES = '(min-width: 1024px)';

/**
 * Deplacement lent d'un element pendant le defilement.
 *
 * Principe : on mesure la position du centre de l'element par rapport au centre
 * de la fenetre, on normalise entre -1 et 1, et on ecrit le resultat dans la
 * variable CSS `--parallax`. L'element l'applique via la classe `.parallax`,
 * qui ne touche qu'a `transform`. Le navigateur peut donc composer le
 * mouvement sans recalculer la mise en page : aucun reflow au defilement.
 *
 * Trois garde-fous :
 *   1. rien ne tourne tant que l'element n'est pas visible, grace a
 *      IntersectionObserver,
 *   2. le calcul est regroupe dans une seule `requestAnimationFrame` par image,
 *      meme si l'evenement de defilement se declenche dix fois,
 *   3. si le visiteur a demande a son systeme de limiter les animations, la
 *      variable reste a zero et l'element ne bouge pas.
 *
 * `strength` est l'amplitude en pixels de part et d'autre de la position
 * naturelle. Une valeur negative fait remonter l'element quand les autres
 * descendent : c'est ce decalage qui cree la profondeur.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 30) {
  const ref = useRef<T | null>(null);
  const isWide = useMediaQuery(DEUX_COLONNES);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isEnabled = isWide && !prefersReducedMotion;

  useEffect(() => {
    const element = ref.current;
    if (!element || !isEnabled) return;

    let isVisible = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const span = viewportHeight / 2 + rect.height / 2;
      if (span === 0) return;

      // -1 : l'element arrive par le bas. 0 : il est centre. 1 : il sort par le haut.
      const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / span;
      const clamped = Math.max(-1, Math.min(1, progress));
      element.style.setProperty('--parallax', `${(clamped * strength).toFixed(2)}px`);
    };

    const schedule = () => {
      if (!isVisible || frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible) update();
      },
      // La marge evite que l'element apparaisse deja decale au moment ou il entre.
      { rootMargin: '25% 0px 25% 0px' },
    );
    observer.observe(element);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      element.style.removeProperty('--parallax');
    };
  }, [isEnabled, strength]);

  return ref;
}

/**
 * Decalage vertical proportionnel au defilement depuis le haut de la page.
 *
 * Contrairement a `useParallax`, qui mesure la position de l'element par
 * rapport au centre de la fenetre, celui-ci part de zero quand la page est en
 * haut et progresse jusqu'a `distance` pixels vers le haut. C'est ce qu'il faut
 * pour une image volontairement debordante dont le bas est masque au
 * chargement : elle remonte au fur et a mesure et devoile la suite.
 *
 * `travel` est la hauteur de defilement, en pixels, sur laquelle le mouvement
 * s'etale. Au-dela, l'element ne bouge plus.
 */
export function useScrollShift<T extends HTMLElement = HTMLDivElement>(
  distance = 140,
  travel = 700,
) {
  const ref = useRef<T | null>(null);
  const isWide = useMediaQuery(DEUX_COLONNES);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isEnabled = isWide && !prefersReducedMotion;

  useEffect(() => {
    const element = ref.current;
    if (!element || !isEnabled) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / travel));
      element.style.setProperty('--parallax', `${(-progress * distance).toFixed(2)}px`);
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      element.style.removeProperty('--parallax');
    };
  }, [distance, isEnabled, travel]);

  return ref;
}
