import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import { LinkButton } from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { useScrollShift } from '@/hooks/useParallax';
import { site } from '@/data/site';

export default function Hero() {
  /*
    En grand ecran, l'image depasse le bas de la section, qui la coupe grace a
    `overflow-hidden`. Ce decalage la fait remonter pendant les 700 premiers
    pixels de defilement et devoile la partie masquee.

    Les 96 px correspondent a la hauteur cachee, mesuree dans le navigateur.
    Si l une des trois hauteurs
    change, section `lg:pt-36`, cellule `lg:h-[30rem]`, image `lg:h-[40rem]`,
    il faut la recalculer : au-dela, la tete de la statue passerait sous
    l'en-tete et serait coupee a son tour.
  */
  const statueRef = useScrollShift<HTMLImageElement>(96, 700);

  return (
    <section
      className="relative isolate overflow-hidden bg-white pt-24 pb-14 lg:pt-36 lg:pb-16"
      aria-labelledby="titre-principal"
    >
      <Container>
        <div className="grid grid-cols-12 items-center gap-x-5 gap-y-8 sm:gap-x-8">
          <div className="col-span-7 self-center">
            <h1 id="titre-principal" className="text-navy-900">
              <span className="block text-[1.6rem] leading-[1.12] sm:text-4xl lg:text-5xl">
                Des solutions juridiques
              </span>
              <span className="mt-1 block text-[1.6rem] leading-[1.12] text-blue-600 sm:text-4xl lg:text-5xl">
                à vos côtés
              </span>
            </h1>
          </div>

          {/*
            En petit ecran l'image est dans le flux, a cote du titre, et
            entierement visible. A partir de lg elle est sortie du flux et
            depasse la section : c'est le bord bas de la section qui la coupe.
          */}
          <div className="col-span-5 row-span-2 self-end lg:relative lg:row-span-3 lg:h-[30rem]">
            <div className="relative flex h-full items-end justify-center">
              <span
                className="absolute bottom-[12%] left-1/2 -z-10 aspect-square w-[92%] -translate-x-1/2 rounded-full bg-blue-100 lg:top-4 lg:right-0 lg:bottom-auto lg:left-auto lg:w-[24rem] lg:translate-x-0"
                aria-hidden="true"
              />
              <span
                className="absolute bottom-[6%] left-1/2 -z-10 aspect-square w-[62%] -translate-x-1/2 rounded-full bg-mist-200 lg:top-40 lg:right-20 lg:bottom-auto lg:left-auto lg:w-[15rem] lg:translate-x-0"
                aria-hidden="true"
              />
              {/*
                C'est cette image que mesure le Largest Contentful Paint : elle
                est prechargee dans index.html et dimensionnee en dur pour
                qu'aucun decalage de mise en page ne se produise.
              */}
              <img
                ref={statueRef}
                src="/images/statue-justice.webp"
                alt="Statue de la Justice tenant la balance, symbole du droit."
                width={387}
                height={561}
                fetchPriority="high"
                decoding="async"
                className="parallax h-auto w-full max-w-xs object-contain sm:max-w-sm lg:absolute lg:top-0 lg:right-4 lg:h-[40rem] lg:w-auto lg:max-w-none"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <p className="text-base text-ink-700 sm:text-lg">{site.jobTitle}</p>
            <p className="text-lu mt-6 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
              Je vous aide à créer votre société, à signer un bail sans mauvaise surprise, à mettre
              un dossier administratif en règle. Je prends en charge la partie juridique, vous
              gardez votre temps pour le reste.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <LinkButton href="#contact" variant="primary" size="lg">
                Décrire ma situation
                <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
              >
                <WhatsAppIcon className="size-4" />
                Écrire sur WhatsApp
              </LinkButton>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <p className="font-display text-lg text-navy-900 italic">{site.tagline}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
