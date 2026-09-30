import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import { serviceDomains, type ServiceDomain } from '@/data/services';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useParallax } from '@/hooks/useParallax';
import { useReveal } from '@/hooks/useReveal';

/** Liste des prestations d'un domaine, partagee par les deux affichages. */
function DomainItems({ domain }: { domain: ServiceDomain }) {
  return (
    <div>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {domain.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <ChevronRight className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden="true" />
            <span className="text-sm leading-relaxed text-ink-700">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-mist-200 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-ink-500">
          Besoin d’une prise en charge sur ce domaine ? Échangeons sur votre projet.
        </p>
        <a href="#contact" className={buttonClasses('outline', 'md')}>
          Demander ce service
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** Affichage large : liste de domaines a gauche, detail a droite. */
function DomainTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = serviceDomains[activeIndex] ?? serviceDomains[0];

  if (!active) return null;

  /** Navigation au clavier attendue dans un jeu d'onglets vertical. */
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = serviceDomains.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowDown') next = activeIndex === lastIndex ? 0 : activeIndex + 1;
    if (event.key === 'ArrowUp') next = activeIndex === 0 ? lastIndex : activeIndex - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = lastIndex;

    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const ActiveIcon = active.icon;

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-12">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Domaines d'intervention"
        className="lg:col-span-5 space-y-1"
      >
        {serviceDomains.map((domain, index) => {
          const isActive = index === activeIndex;
          const Icon = domain.icon;
          return (
            <button
              key={domain.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`onglet-${domain.id}`}
              aria-selected={isActive}
              aria-controls={`panneau-${domain.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={onKeyDown}
              className={`flex w-full items-center gap-4 rounded-r-lg border-l-3 py-3.5 pr-4 pl-5 text-left transition-colors cursor-pointer ${
                isActive
                  ? 'border-l-blue-600 bg-white text-navy-900 shadow-xs'
                  : 'border-l-transparent text-ink-500 hover:border-l-blue-400 hover:bg-white/60 hover:text-navy-900'
              }`}
            >
              <Icon
                className={`size-5 shrink-0 transition-colors ${
                  isActive ? 'text-blue-600' : 'text-ink-500'
                }`}
                aria-hidden="true"
              />
              <span className={`text-sm leading-snug ${isActive ? 'font-semibold text-navy-900' : ''}`}>
                {domain.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panneau-${active.id}`}
        aria-labelledby={`onglet-${active.id}`}
        tabIndex={0}
        className="rounded-card border border-mist-300 bg-white p-8 lg:col-span-7 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-3 border-b border-mist-200 pb-5 mb-6">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <ActiveIcon className="size-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wide uppercase text-blue-600">
                Domaine d’intervention
              </span>
              <h3 className="text-2xl text-navy-900">{active.label}</h3>
            </div>
          </div>

          <DomainItems domain={active} />
        </div>
      </div>
    </div>
  );
}

/** Affichage etroit : chaque domaine se deplie sur place. */
function DomainAccordion() {
  const [openId, setOpenId] = useState<string | null>(serviceDomains[0]?.id ?? null);

  return (
    <div className="mt-10 divide-y divide-mist-300 border-y border-mist-300">
      {serviceDomains.map((domain) => {
        const isOpen = openId === domain.id;
        const Icon = domain.icon;
        return (
          <div key={domain.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`bloc-${domain.id}`}
                onClick={() => setOpenId(isOpen ? null : domain.id)}
                className="flex w-full items-center gap-4 py-5 text-left cursor-pointer"
              >
                <Icon className="size-5 shrink-0 text-blue-600" aria-hidden="true" />
                <span className="flex-1 font-sans text-base leading-snug font-semibold text-navy-900">
                  {domain.label}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-ink-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div id={`bloc-${domain.id}`} hidden={!isOpen} className="pb-7">
              <DomainItems domain={domain} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Services() {
  const isWide = useMediaQuery('(min-width: 1024px)');
  const revealRef = useReveal<HTMLDivElement>();
  const headingRef = useParallax<HTMLDivElement>(16);
  const panelRef = useParallax<HTMLDivElement>(-12);

  return (
    <section id="prestations" className="scroll-mt-24 bg-mist-200 py-20 lg:py-28">
      <Container>
        <div ref={revealRef}>
          <div ref={headingRef} className="parallax">
            <SectionHeading
              title="Domaines d'intervention"
              description="Huit domaines d’expertise : du conseil juridique et foncier à la gestion administrative, aux achats professionnels et à l’intermédiation."
            />
          </div>
          <div ref={panelRef} className="parallax">
            {isWide ? <DomainTabs /> : <DomainAccordion />}
          </div>
        </div>
      </Container>
    </section>
  );
}
