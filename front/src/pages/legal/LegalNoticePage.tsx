import Seo from '@/components/Seo';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { site } from '@/data/site';
import { buildBreadcrumbSchema } from '@/lib/structuredData';

const trail = [
  { name: 'Accueil', path: '/' },
  { name: 'Mentions légales', path: '/mentions-legales' },
];

export default function LegalNoticePage() {
  return (
    <>
      <Seo
        title="Mentions légales | NGOLO-MAYOMBO Gloire Barthélémie"
        description="Éditeur, hébergeur, propriété intellectuelle et responsabilité du site de Gloire Barthélémie NGOLO-MAYOMBO, juriste en droit des affaires à Moanda."
        path="/mentions-legales"
        jsonLd={[buildBreadcrumbSchema(trail)]}
      />

      <div className="bg-navy-950 pt-28 pb-12">
        <Container>
          <h1 className="text-3xl text-white sm:text-4xl">Mentions légales</h1>
        </Container>
      </div>

      <Container className="py-12">
        <Breadcrumb trail={trail} />

        <div className="text-lu mt-10 max-w-3xl space-y-10 text-base leading-relaxed text-ink-700">
          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Éditeur du site</h2>
            <p className="mt-4">
              {site.fullName}, {site.jobTitle.toLowerCase()}, exerçant à titre indépendant.
              <br />
              {site.address.full}
              <br />
              Téléphone : {site.phone.national}
              <br />
              Courriel : {site.email.address}
            </p>
            <p className="mt-4 text-sm text-ink-500">
              Numéro d'identification fiscale et numéro de registre du commerce à compléter avant la
              mise en ligne.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Directrice de la publication</h2>
            <p className="mt-4">{site.fullName}.</p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Hébergement</h2>
            <p className="mt-4 text-sm text-ink-500">
              Nom, adresse et téléphone de l'hébergeur à compléter une fois le contrat d'hébergement
              signé.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Nature des prestations</h2>
            <p className="mt-4">
              Les prestations présentées sur ce site relèvent du conseil juridique, de la rédaction
              d'actes et de l'accompagnement administratif. Elles n'incluent ni la représentation ni
              la plaidoirie devant une juridiction, qui relèvent de la profession d'avocat.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Propriété intellectuelle</h2>
            <p className="mt-4">
              Les textes, la charte graphique et les photographies de ce site sont protégés. Toute
              reproduction, même partielle, est soumise à autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="border-l-2 border-blue-500 pl-4 text-xl text-navy-900">Responsabilité</h2>
            <p className="mt-4">
              Les informations publiées ici ont une vocation générale d'information. Elles ne
              constituent pas une consultation juridique et ne peuvent se substituer à l'examen
              d'une situation précise. Aucune responsabilité ne saurait être engagée sur la base de
              leur seule lecture.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
