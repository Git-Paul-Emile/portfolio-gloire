import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Inclinaison 3D d'un element suivant la position du pointeur.
 *
 * Le hook n'ecrit jamais de `transform` : il ne pose que quatre variables CSS,
 * deux angles et la position de la brillance, que la classe `.tilt` consomme
 * (voir `index.css`). C'est ce qui permet a la rotation de cohabiter avec le
 * soulevement au survol, qui passe lui par la propriete `translate`.
 *
 * L'effet est reserve aux pointeurs fins qui savent survoler, c'est-a-dire a
 * la souris et au pave tactile. Sur un ecran tactile, il n'y a pas de survol :
 * la carte resterait inclinee apres le doigt, ce qui gene la lecture. Il est
 * egalement neutralise si le systeme demande moins d'animations.
 *
 * @param maxDeg angle maximal, atteint dans les coins.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 7) {
  const ref = useRef<T | null>(null);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isEnabled = canHover && !prefersReducedMotion;

  useEffect(() => {
    const element = ref.current;
    if (!element || !isEnabled) return;

    /*
      Un `pointermove` par pixel parcouru, mais un seul calcul par image
      affichee : le navigateur en emet souvent plus de soixante par seconde et
      ecrire une variable CSS a chaque evenement declencherait autant de
      repeints inutiles.
    */
    let frame = 0;
    let position: { x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      if (!position) return;

      const { x, y } = position;
      // `x` et `y` vont de -1 (bord gauche ou haut) a 1 (bord droit ou bas).
      // Le signe de la rotation horizontale est inverse : pointeur en haut,
      // la carte se penche vers l'arriere.
      element.style.setProperty('--tilt-y', `${(x * maxDeg).toFixed(2)}deg`);
      element.style.setProperty('--tilt-x', `${(-y * maxDeg).toFixed(2)}deg`);
      element.style.setProperty('--tilt-glare-x', `${(((x + 1) / 2) * 100).toFixed(1)}%`);
      element.style.setProperty('--tilt-glare-y', `${(((y + 1) / 2) * 100).toFixed(1)}%`);
    };

    const onPointerMove = (event: PointerEvent) => {
      // Un stylet ou un doigt peut emettre `pointermove` sans survol reel.
      if (event.pointerType !== 'mouse') return;

      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      position = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
      };

      if (!frame) frame = requestAnimationFrame(paint);
    };

    /*
      Remise a plat : on retire les variables au lieu de les remettre a zero,
      pour que la carte reprenne exactement les valeurs par defaut declarees
      dans la feuille de style.
    */
    const reset = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      position = null;
      element.style.removeProperty('--tilt-x');
      element.style.removeProperty('--tilt-y');
      element.style.removeProperty('--tilt-glare-x');
      element.style.removeProperty('--tilt-glare-y');
    };

    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerleave', reset);
    // Un defilement au clavier ou a la molette peut sortir la carte de sous le
    // pointeur sans declencher `pointerleave`.
    element.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);

    return () => {
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerleave', reset);
      element.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
      reset();
    };
  }, [isEnabled, maxDeg]);

  return ref;
}
