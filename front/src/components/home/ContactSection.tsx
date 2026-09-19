import { Mail, MapPin, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import ContactForm from '@/components/home/ContactForm';
import TakeAway from '@/components/home/TakeAway';
import { site } from '@/data/site';
import { useParallax } from '@/hooks/useParallax';
import { useReveal } from '@/hooks/useReveal';

/**
 * Coordonnees reprises de la brochure exterieure : telephone et WhatsApp,
 * courriel, ville. Aucun horaire n'y figure, donc aucun n'est affiche.
 */
export default function ContactSection() {
  const revealRef = useReveal<HTMLDivElement>();
  const asideRef = useParallax<HTMLDivElement>(18);
  const formRef = useParallax<HTMLDivElement>(-14);

  return (
    <section id="contact" className="scroll-mt-24 bg-mist-200 py-20 lg:py-28">
      <Container>
        <div ref={revealRef} className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div ref={asideRef} className="parallax lg:col-span-5">
            <SectionHeading title="Contact" description={site.listening} />

            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="mt-1 size-5 shrink-0 text-blue-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Téléphone et WhatsApp</p>
                  <a
                    href={site.phone.href}
                    className="text-sm text-blue-600 underline underline-offset-4 hover:text-blue-700"
                  >
                    {site.phone.national}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <WhatsAppIcon className="mt-1 size-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">WhatsApp</p>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline underline-offset-4 hover:text-blue-700"
                  >
                    Ouvrir la conversation
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 size-5 shrink-0 text-blue-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Courriel</p>
                  <a
                    href={site.email.href}
                    className="text-sm break-all text-blue-600 underline underline-offset-4 hover:text-blue-700"
                  >
                    {site.email.address}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-blue-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Adresse</p>
                  <p className="text-sm text-ink-700">{site.address.full}</p>
                </div>
              </li>
            </ul>

            <TakeAway />
          </div>

          <div ref={formRef} className="parallax lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
