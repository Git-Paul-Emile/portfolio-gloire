import { Link } from 'react-router';
import { ChevronRight, Compass, House } from 'lucide-react';
import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { navLinks, site } from '@/data/site';

/*
  Les destinations reelles du site, rassemblees pour cette page.

  `navLinks` ne contient que les ancres de l'accueil. Un visiteur egare a pu
  arriver ici depuis un lien vers une page legale : les deux sont donc ajoutees
  a la liste, ce que le menu principal ne fait pas.
*/
const destinations = [
  ...navLinks.map((link) => ({ href: `/#${link.id}`, label: link.label })),
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
];

/**
 * Page 404.
 *
 * Deux principes. D'abord elle dit clairement ce qui s'est passe, sans jargon
 * ni humour : le visiteur cherchait quelque chose de precis et ne l'a pas
 * trouve. Ensuite elle ne laisse aucun cul-de-sac, elle propose les seules
 * adresses qui existent vraiment, plus un contact direct.
 *
 * Elle n'est pas indexee (`noIndex`) : une page d'erreur n'a rien a faire dans
 * les resultats de recherche.
 *
 * Attention : ce composant ne decide pas du code HTTP. Une application a page
 * unique renvoie index.html pour toutes les adresses, donc un 200 par defaut,
 * meme quand cette page s'affiche. C'est `front/public/.htaccess` qui retablit
 * un vrai 404, en ne reecrivant que les routes declarees dans
 * `src/routes/AppRoutes.tsx` et en laissant le reste tomber sur ErrorDocument.
 */
export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page introuvable | NGOLO-MAYOMBO Gloire Barthélémie"
        description="Cette adresse ne correspond à aucune page du site."
        path="/404"
        noIndex
      />

      <section className="bg-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {/*
                Le nombre est un element graphique, pas un titre : il est retire
                de l'arbre d'accessibilite. L'information qu'il porte est rendue
                au lecteur d'ecran par la mention invisible du `h1` ci-dessous,
                sinon elle serait perdue.
              */}
              <p
                className="font-display text-[5rem] leading-none text-blue-100 select-none sm:text-[7rem]"
                aria-hidden="true"
              >
                404
              </p>

              <h1 className="mt-4 max-w-2xl text-3xl leading-tight text-navy-900 sm:text-4xl">
                <span className="sr-only">Erreur 404. </span>
                Cette page n'existe pas, ou elle a changé d'adresse
              </h1>

              <p className="text-lu mt-5 max-w-xl text-base leading-relaxed text-ink-500">
                Le lien que vous avez suivi ne mène à rien. Cela arrive quand une adresse a été
                recopiée en partie, ou quand une page a été déplacée depuis que le lien a été
                écrit. Vous trouverez plus bas les pages qui existent réellement.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/" className={buttonClasses('primary', 'lg')}>
                  <House className="size-4" aria-hidden="true" />
                  Revenir à l'accueil
                </Link>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses('outline', 'lg')}
                >
                  <WhatsAppIcon className="size-4" />
                  Écrire sur WhatsApp
                </a>
              </div>
            </div>

            {/*
              Composition decorative, reprise des deux cercles du hero pour que
              la page reste de la meme famille visuelle. Masquee en petit ecran,
              ou elle repousserait le contenu utile sous la ligne de flottaison
              sans rien apporter.
            */}
            <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
              <div className="relative mx-auto flex size-72 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-blue-100" />
                {/* Le second cercle deborde volontairement : deux disques concentriques formeraient une cible, pas une composition. */}
                <span className="absolute -right-6 -bottom-6 size-36 rounded-full bg-mist-200" />
                <Compass className="relative size-32 text-blue-600" strokeWidth={0.9} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist-200 py-16 lg:py-20">
        <Container>
          <SectionHeading
            title="Les pages du site"
            description="Six adresses, et aucune autre. Si vous êtes arrivé ici depuis un lien que quelqu'un vous a transmis, il est probablement incomplet."
          />

          <nav aria-label="Pages du site" className="mt-10">
            <ul className="grid gap-3 sm:grid-cols-2">
              {destinations.map((destination) => (
                <li key={destination.href}>
                  <Link
                    to={destination.href}
                    className="flex items-center justify-between gap-4 rounded-card border border-mist-300 bg-white px-5 py-4 text-sm text-navy-900 transition-colors hover:border-blue-600"
                  >
                    {destination.label}
                    <ChevronRight className="size-4 shrink-0 text-blue-600" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-10 text-sm text-ink-500">
            Vous cherchiez autre chose ? Appelez le{' '}
            <a
              href={site.phone.href}
              className="text-blue-600 underline underline-offset-4 hover:text-blue-700"
            >
              {site.phone.national}
            </a>
            , ou écrivez à{' '}
            <a
              href={site.email.href}
              className="break-all text-blue-600 underline underline-offset-4 hover:text-blue-700"
            >
              {site.email.address}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
