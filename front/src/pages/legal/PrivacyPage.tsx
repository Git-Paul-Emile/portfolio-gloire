import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { site } from '@/data/site';
import { buildBreadcrumbSchema } from '@/lib/structuredData';

const trail = [
  { name: 'Accueil', path: '/' },
  { name: 'Politique de confidentialité', path: '/politique-de-confidentialite' },
];

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Politique de confidentialité | NGOLO-MAYOMBO Gloire Barthélémie"
        description="Données collectées par le formulaire de contact, durée de conservation, destinataires et droits des personnes concernées."
        path="/politique-de-confidentialite"
        jsonLd={[buildBreadcrumbSchema(trail)]}
      />

      <div className="bg-navy-950 pt-28 pb-12">
        <Container>
          <h1 className="text-3xl text-white sm:text-4xl">Politique de confidentialité</h1>
        </Container>
      </div>

      <Container className="py-12">
        <Breadcrumb trail={trail} />

        <div className="text-lu mt-10 max-w-3xl space-y-10 text-base leading-relaxed text-ink-700">
          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Données collectées</h2>
            <p className="mt-4">
              Le formulaire de contact recueille votre nom, votre adresse électronique, votre
              numéro de téléphone si vous le renseignez, l'objet de votre demande et le message que
              vous rédigez. Aucun autre élément n'est collecté, et le site n'utilise ni traceur
              publicitaire ni profilage.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Finalité</h2>
            <p className="mt-4">
              Ces données servent uniquement à répondre à votre demande et à assurer le suivi du
              dossier qui en découle. Elles ne sont ni revendues, ni utilisées pour de la
              prospection.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Destinataires</h2>
            <p className="mt-4">
              Votre message n'est lu que par {site.fullName}. Dans le cadre d'un dossier, certaines
              pièces peuvent être transmises aux administrations concernées, et uniquement à elles.
              Le service d'envoi de courriels utilisé pour acheminer les messages traite les données
              pour le compte du cabinet.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Durée de conservation</h2>
            <p className="mt-4">
              Les demandes sans suite sont supprimées au bout de douze mois. Les dossiers traités
              sont conservés pendant la durée légale applicable à la prestation, puis détruits.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Vos droits</h2>
            <p className="mt-4">
              Vous pouvez demander l'accès, la rectification ou la suppression des données qui vous
              concernent, par simple courriel à{' '}
              <a
                href={site.email.href}
                className="text-navy-900 underline decoration-blue-500 underline-offset-4"
              >
                {site.email.address}
              </a>
              . La demande est traitée sous trente jours.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Cookies</h2>
            <p className="mt-4">
              Ce site ne dépose aucun cookie de mesure d'audience ni de publicité. Seules les
              polices de caractères sont chargées depuis un service externe, sans identifiant
              permettant de vous reconnaître.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
