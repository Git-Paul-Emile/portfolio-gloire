import { ChevronRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { commitments, site } from '@/data/site';
import { useParallax } from '@/hooks/useParallax';
import { useReveal } from '@/hooks/useReveal';

/**
 * Section « Qui suis-je ».
 *
 * Les deux paragraphes et la liste des engagements viennent mot pour mot de la
 * brochure exterieure. Ne rien y ajouter qui ne s'y trouve pas.
 */
export default function About() {
  const revealRef = useReveal<HTMLDivElement>();
  const portraitRef = useParallax<HTMLDivElement>(42);
  const textRef = useParallax<HTMLDivElement>(-16);

  /*
    La section precedente, le hero, est elle aussi sur fond blanc. Sans rupture
    de couleur pour decouper l'espace, la marge basse de l'une et la marge
    haute de l'autre s'additionnent et creusent un vide deux fois plus grand
    qu'ailleurs. D'ou la marge haute reduite ici. La marge basse, elle, reste
    pleine : en dessous vient « Domaines d'intervention », sur fond brume.
  */
  return (
    <section id="profil" className="scroll-mt-24 bg-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      <Container>
        <div ref={revealRef} className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div ref={portraitRef} className="parallax lg:col-span-5">
            <figure>
              <div className="relative">
                {/* Cadre decale : profondeur sans ombre portee lourde. */}
                <span
                  className="absolute -top-4 -left-4 hidden size-full border border-blue-500 sm:block"
                  aria-hidden="true"
                />
                <img
                  src="/images/gloire-mayombo-juriste-736.webp"
                  srcSet="/images/gloire-mayombo-juriste-400.webp 400w, /images/gloire-mayombo-juriste-600.webp 600w, /images/gloire-mayombo-juriste-736.webp 736w"
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
                  width={736}
                  height={920}
                  loading="lazy"
                  decoding="async"
                  alt={`${site.fullName}, ${site.jobTitle.toLowerCase()} à ${site.address.locality}`}
                  className="relative block w-full object-cover"
                />
              </div>
              <figcaption className="mt-5 border-l-2 border-blue-500 pl-4 text-sm text-ink-500">
                {site.fullName}
                <br />
                {site.jobTitle}
              </figcaption>
            </figure>
          </div>

          <div ref={textRef} className="parallax lg:col-span-7">
            <SectionHeading title="Qui suis-je ?" />

            <div className="text-lu mt-6 space-y-5 text-base leading-relaxed text-ink-700">
              <p>
                Titulaire d'un {site.degree.toLowerCase()}, j'accompagne particuliers et entreprises
                dans leurs démarches juridiques, administratives et fiscales.
              </p>
              <p>
                Mon objectif : vous offrir un service fiable, rapide et personnalisé, pour sécuriser
                vos intérêts et vous permettre d'avancer sereinement.
              </p>
            </div>

            <h3 className="mt-10 text-xl text-navy-900">Mes engagements</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {commitments.map((commitment) => (
                <li
                  key={commitment}
                  className="flex items-start gap-2.5 rounded-card bg-mist-100 px-4 py-3"
                >
                  <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-ink-700">{commitment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
