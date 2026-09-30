import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import {
  pricingCategories,
  pricingCurrency,
  type PricingCategory,
  type PricingPlan,
} from '@/data/pricing';
import { useParallax } from '@/hooks/useParallax';
import { useReveal } from '@/hooks/useReveal';
import { useTilt } from '@/hooks/useTilt';

/**
 * Une carte de formule ou forfait.
 * Chaque carte possede son propre hook useTilt et gere le depliement local
 * des options supplementaires ("Voir plus").
 */
function PlanCard({ plan }: { plan: PricingPlan }) {
  const [expanded, setExpanded] = useState(false);
  const tiltRef = useTilt<HTMLElement>(5);

  const displayedIncludes = expanded ? plan.includes : plan.includes.slice(0, 2);
  const hasMore = plan.includes.length > 2;

  return (
    <article
      ref={tiltRef}
      className={`tilt relative flex flex-col rounded-card border bg-white p-6 sm:p-7 transition duration-200 hover:-translate-y-1 hover:border-blue-600 hover:shadow-[0_24px_50px_-28px_rgb(11_31_58/0.55)] ${
        plan.featured ? 'border-blue-600 shadow-md ring-1 ring-blue-600/30' : 'border-mist-300'
      }`}
    >
      <span
        className="tilt-glare pointer-events-none absolute inset-0 rounded-card"
        aria-hidden="true"
      />

      <div className="tilt-layer relative">
        {plan.badge ? (
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {plan.badge}
            </span>
          </div>
        ) : (
          <div className="mb-3 h-6" aria-hidden="true" />
        )}

        <h3 className="font-sans text-base font-semibold tracking-tight text-navy-900">
          {plan.name}
        </h3>

        <div className="mt-4 flex items-baseline gap-1.5">
          {plan.price === 'Sur devis' || plan.price === 'Personnalisé' ? (
            <span className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
              {plan.price}
            </span>
          ) : (
            <>
              <span className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                {plan.price}
              </span>
              <span className="text-sm font-medium text-ink-500">{pricingCurrency}</span>
            </>
          )}
        </div>
        <p className="mt-1 text-xs text-ink-500">{plan.unit}</p>
      </div>

      <p className="relative mt-4 text-xs leading-relaxed text-ink-700 sm:text-sm">
        {plan.summary}
      </p>

      {/* Options de la formule : 2 options par defaut, suite disponible via 'Voir plus' */}
      <ul className="relative mt-6 space-y-2.5">
        {displayedIncludes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden="true" />
            <span className="text-xs leading-relaxed text-ink-700 sm:text-sm">{item}</span>
          </li>
        ))}
      </ul>

      {/* Action 'Voir plus' puis bouton de souscription toujours visible */}
      <div className="relative mt-auto pt-6 flex flex-col gap-4">
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            <span>{expanded ? 'Voir moins' : 'Voir plus'}</span>
            <ChevronDown
              className={`size-3.5 transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        )}

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
 * Section Tarifs & Modeles d'offres.
 *
 * Integre 3 modes d'intervention clairement segmentes en onglets :
 * 1. Abonnements mensuels (L'esprit libre)
 * 2. Offres Globales Tout-Inclus (Projets cles en main)
 * 3. Prestations Ponctuelles (Rapide & cible)
 */
export default function Pricing() {
  const [activeCategoryId, setActiveCategoryId] =
    useState<PricingCategory['id']>('abonnements');

  const revealRef = useReveal<HTMLDivElement>();
  const headingRef = useParallax<HTMLDivElement>(16);
  const cardsRef = useParallax<HTMLDivElement>(-10);

  const fallbackCategory: PricingCategory = pricingCategories[0]!;
  const activeCategory: PricingCategory =
    pricingCategories.find((c) => c.id === activeCategoryId) ?? fallbackCategory;

  return (
    <section id="tarifs" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container>
        <div ref={revealRef}>
          {/* Titre aligne a gauche comme les autres sections */}
          <div ref={headingRef} className="parallax">
            <SectionHeading
              title="Modèles d'offres et tarifs"
              description="Abonnement mensuel, pack projet tout-inclus ou intervention ponctuelle : choisissez l'approche adaptée à vos besoins et à votre rythme."
            />

            {/* Selecteur d'onglets de categories d'offres avec fond en #2549B8 et sans icones */}
            <div className="mt-10 flex justify-start">
              <div
                role="tablist"
                aria-label="Catégories d'offres tarifaires"
                className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl border border-mist-300 bg-mist-100 p-1.5 sm:gap-3"
              >
                {pricingCategories.map((category) => {
                  const isSelected = category.id === activeCategoryId;
                  return (
                    <button
                      key={category.id}
                      role="tab"
                      id={`tab-${category.id}`}
                      aria-selected={isSelected}
                      aria-controls={`panel-${category.id}`}
                      type="button"
                      onClick={() => setActiveCategoryId(category.id)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold sm:px-5 sm:text-sm transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2549B8] text-white shadow-sm'
                          : 'text-ink-700 hover:bg-white/80 hover:text-navy-900'
                      }`}
                    >
                      <span>{category.label}</span>
                      <span
                        className={`hidden rounded-full px-2 py-0.5 text-[0.7rem] sm:inline-block ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-mist-200 text-ink-500'
                        }`}
                      >
                        {category.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 max-w-2xl text-left">
              <p className="text-sm font-medium text-ink-700 sm:text-base">
                {activeCategory.description}
              </p>
            </div>
          </div>

          {/* Grille des offres pour la categorie active */}
          <div
            id={`panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            tabIndex={0}
            ref={cardsRef}
            className={`parallax mt-12 grid gap-6 ${
              activeCategory.plans.length === 1
                ? 'mx-auto max-w-md grid-cols-1'
                : 'sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {activeCategory.plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <div className="mt-10 rounded-sm border border-mist-300 bg-mist-100 p-5 text-center text-xs text-ink-500 sm:text-sm">
            <p>
              <strong className="text-navy-900">Transparence tarifaire :</strong> Les montants
              forfaitaires et abonnements sont confirmés par devis écrit après notre premier
              échange. Les frais officiels versés aux administrations (droits d’enregistrement DGI,
              timbres, frais de greffe) sont facturés au débours réel sans marge.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
