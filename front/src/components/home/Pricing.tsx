import { ChevronRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import { pricingCurrency, pricingPlans, type PricingPlan } from '@/data/pricing';
import { useParallax } from '@/hooks/useParallax';
import { useReveal } from '@/hooks/useReveal';
import { useTilt } from '@/hooks/useTilt';

/**
 * Une formule.
 *
 * Composant a part entiere, et non un simple bloc dans la boucle : chaque
 * carte a besoin de son propre `useTilt`, or un hook ne peut pas etre appele
 * dans un `map`. C'est la regle des hooks de React, pas une preference de
 * style.
 */
function PlanCard({ plan }: { plan: PricingPlan }) {
  const tiltRef = useTilt<HTMLElement>(6);

  return (
    <article
      ref={tiltRef}
      /*
        Trois effets se superposent au survol, sur trois proprietes CSS
        differentes pour ne pas se marcher dessus : `translate` pour le
        soulevement, `transform` pour l'inclinaison 3D (classe `.tilt`,
        alimentee par le hook), `box-shadow` pour l'ombre portee.
      */
      className={`tilt relative flex flex-col rounded-card border bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-[0_24px_50px_-28px_rgb(11_31_58/0.55)] ${
        plan.featured ? 'border-blue-600 lg:-mt-3 lg:pb-10' : 'border-mist-300'
      }`}
    >
      {/* Reflet purement decoratif, sous le contenu et sans capture du clic. */}
      <span
        className="tilt-glare pointer-events-none absolute inset-0 rounded-card"
        aria-hidden="true"
      />

      {/* Le nom et le montant avancent vers le spectateur : c'est ce decollement qui cree le relief. */}
      <div className="tilt-layer relative">
        <h3 className="font-sans text-sm font-semibold tracking-wide text-ink-500">{plan.name}</h3>

        <p className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl text-navy-900">{plan.price}</span>
          <span className="text-base text-ink-500">{pricingCurrency}</span>
        </p>
        <p className="mt-1 text-sm text-ink-500">{plan.unit}</p>
      </div>

      <p className="text-lu relative mt-5 text-sm leading-relaxed text-ink-700">{plan.summary}</p>

      <ul className="relative mt-6 space-y-2.5">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden="true" />
            <span className="text-sm leading-relaxed text-ink-700">{item}</span>
          </li>
        ))}
      </ul>

      {/* `mt-auto` aligne les boutons entre eux, quelle que soit la longueur des listes. */}
      <div className="relative mt-auto pt-8">
        <a
          href="#contact"
          className={buttonClasses(plan.featured ? 'primary' : 'outline', 'md', 'w-full')}
        >
          Demander cette formule
          <span className="sr-only"> : {plan.name}</span>
        </a>
      </div>
    </article>
  );
}

/**
 * Formules tarifaires, trois cartes de meme structure.
 *
 * Les montants sont provisoires : la mention « à titre indicatif » fait partie
 * du contenu, elle ne doit pas etre retiree tant que les vrais tarifs ne sont
 * pas connus. Voir `src/data/pricing.ts`.
 */
export default function Pricing() {
  const revealRef = useReveal<HTMLDivElement>();
  const headingRef = useParallax<HTMLDivElement>(16);
  const cardsRef = useParallax<HTMLDivElement>(-12);

  return (
    <section id="tarifs" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <div ref={revealRef}>
          <div ref={headingRef} className="parallax">
            <SectionHeading
              title="Formules et tarifs"
              description="Trois formules selon la nature de la démarche. Les montants ci-dessous sont donnés à titre indicatif : le tarif exact vous est confirmé par écrit après le premier échange, avant tout démarrage."
            />
          </div>

          <div ref={cardsRef} className="parallax mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="mt-8 text-sm text-ink-500">
            Les frais versés à l'administration, timbres et droits d'enregistrement compris, sont
            facturés en plus et vous sont indiqués séparément.
          </p>
        </div>
      </Container>
    </section>
  );
}
