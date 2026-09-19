import { useEffect, useState } from 'react';

/**
 * Renvoie l'identifiant de la section actuellement visible.
 * Sert a marquer le lien actif dans la navigation d'une page a ancres.
 * Un IntersectionObserver est utilise plutot qu'un ecouteur de scroll : le
 * navigateur fait le calcul hors du fil principal.
 */
export function useScrollSpy(sectionIds: readonly string[], offsetPx = 96): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: `-${offsetPx}px 0px -55% 0px`, threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [sectionIds, offsetPx]);

  return activeId;
}
