import Seo from '@/components/Seo';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Pricing from '@/components/home/Pricing';
import About from '@/components/home/About';
import ContactSection from '@/components/home/ContactSection';
import {
  buildLegalServiceSchema,
  buildPersonSchema,
  buildWebSiteSchema,
} from '@/lib/structuredData';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Juriste en droit des affaires à Moanda | NGOLO-MAYOMBO Gloire Barthélémie"
        description="Juriste en droit des affaires à Moanda, Haut-Ogooué. Légalisation, baux, création de société, contrats, état civil, déclarations CNSS et CNAMGS."
        path="/"
        jsonLd={[buildWebSiteSchema(), buildLegalServiceSchema(), buildPersonSchema()]}
      />
      {/*
        Ordre des sections : on se presente avant de presenter son offre. Le
        visiteur sait a qui il parle, puis ce qui est propose, puis a quel
        prix, puis comment prendre contact.

        Les marges verticales de chaque section dependent de celle qui la
        precede : deux sections de meme fond, ici Hero et About, additionnent
        leurs marges sans rupture de couleur pour les decouper. Toucher a cet
        ordre impose donc de reverifier les marges de `Hero`, `About` et
        `Pricing`, ou le rythme de la page se creuse par endroits.
      */}
      <Hero />
      <About />
      <Services />
      <Pricing />
      <ContactSection />
    </>
  );
}
