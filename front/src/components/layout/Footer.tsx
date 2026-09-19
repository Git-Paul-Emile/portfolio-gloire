import { Link } from 'react-router';
import { Mail, MapPin, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { useParallax } from '@/hooks/useParallax';
import { navLinks, site } from '@/data/site';
import { serviceDomains } from '@/data/services';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  /*
    La parallaxe porte sur l'image, le centrage vertical sur son conteneur.
    Les deux ne peuvent pas cohabiter sur le meme element : `.parallax` ecrit
    un `transform` qui ecraserait le `-translate-y-1/2`.
  */
  const statueRef = useParallax<HTMLImageElement>(34);

  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-mist-100">
      {/*
        Statue en filigrane, reprise de la section supprimee. Purement
        decorative : opacite basse, retiree de l'arbre d'accessibilite, et
        masquee en petit ecran ou elle n'apporterait rien.

        Elle est centree verticalement et tient entierement dans la hauteur du
        pied de page, parallaxe comprise : aucune partie, tete comprise, n'est
        coupee. C'est pour cela que le bloc est en `lg:py-24` et non `py-16`.

        Le conteneur reserve une bande a droite (`lg:pr-64`) pour qu'elle ne
        passe jamais sous le texte. C'est ce qui permet de monter l'opacite a
        0,3 sans abimer la lisibilite des coordonnees.
      */}
      <div
        className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <img
          ref={statueRef}
          src="/images/statue-justice-chrome.webp"
          alt=""
          width={509}
          height={899}
          loading="lazy"
          decoding="async"
          className="parallax h-[26rem] w-auto object-contain opacity-30 xl:h-[30rem]"
        />
      </div>

      <Container className="relative z-10 lg:pr-64">
        <div className="grid gap-12 py-16 md:grid-cols-12 lg:py-24">
          <div className="md:col-span-4">
            <p className="font-display text-xl text-white">{site.lastName}</p>
            <p className="mt-1 text-sm text-blue-300">{site.firstName}</p>
            <p className="mt-4 text-sm text-mist-200/80">{site.jobTitle}</p>
            <p className="mt-5 font-display text-base text-white italic">{site.tagline}</p>
          </div>

          <nav aria-labelledby="footer-nav" className="md:col-span-2">
            <h2 id="footer-nav" className="text-sm font-semibold tracking-wide text-white">
              Le site
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    className="text-mist-200/80 transition-colors hover:text-blue-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.brochure.href}
                  download={site.brochure.fileName}
                  className="text-mist-200/80 transition-colors hover:text-blue-300"
                >
                  Télécharger la brochure
                </a>
              </li>
              <li>
                <Link
                  to="/mentions-legales"
                  className="text-mist-200/80 transition-colors hover:text-blue-300"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/politique-de-confidentialite"
                  className="text-mist-200/80 transition-colors hover:text-blue-300"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-domaines" className="md:col-span-3">
            <h2 id="footer-domaines" className="text-sm font-semibold tracking-wide text-white">
              Domaines
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceDomains.map((domain) => (
                <li key={domain.id}>
                  <a
                    href="/#prestations"
                    className="text-mist-200/80 transition-colors hover:text-blue-300"
                  >
                    {domain.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.phone.href}
                  className="flex items-start gap-2 text-mist-200/80 transition-colors hover:text-blue-300"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-blue-300" aria-hidden="true" />
                  {site.phone.national}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-mist-200/80 transition-colors hover:text-blue-300"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-blue-300" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.email.href}
                  className="flex items-start gap-2 break-all text-mist-200/80 transition-colors hover:text-blue-300"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-blue-300" aria-hidden="true" />
                  {site.email.address}
                </a>
              </li>
              <li className="flex items-start gap-2 text-mist-200/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-300" aria-hidden="true" />
                <span>
                  {site.address.locality}
                  <br />
                  {site.address.region}, {site.address.country}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-mist-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {site.fullName}. Tous droits réservés.
          </p>
          <p>
            {site.author.role} :{' '}
            <a
              href={site.author.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist-200/80 underline decoration-blue-300/60 underline-offset-4 transition-colors hover:text-blue-300"
            >
              {site.author.displayName}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
