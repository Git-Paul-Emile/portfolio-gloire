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
        description="Juriste en droit des affaires à Moanda, Haut-Ogooué. Démarches administratives, transactions immobilières & foncier, création d’entreprise, contrats, fiscalité, achats et abonnements mensuels."
        path="/"
        jsonLd={[buildWebSiteSchema(), buildLegalServiceSchema(), buildPersonSchema()]}
      />
      {/*
        Ordre des sections : on se presente avant de presenter son offre. Le
        visiteur sait a qui il parle, puis ce qui est propose, puis a quel
        prix, puis comment prendre contact.
      */}
      <Hero />
      <About />
      <Services />
      <Pricing />
      <ContactSection />
    </>
  );
}
