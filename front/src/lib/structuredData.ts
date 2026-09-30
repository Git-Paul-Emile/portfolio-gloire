import { serviceDomains } from '@/data/services';
import { site } from '@/data/site';

/**
 * Donnees structurees Schema.org.
 * Elles decrivent a Google ce qu'est ce site : un professionnel du droit,
 * situe a un endroit precis, qui propose une liste de prestations identifiees.
 * C'est ce balisage qui permet d'apparaitre dans les resultats locaux.
 *
 * Tout ce qui est declare ici doit figurer dans les brochures : ni horaires,
 * ni delais, ni tarifs, puisqu'elles n'en mentionnent aucun.
 */

const personId = `${site.url}/#personne`;
const businessId = `${site.url}/#cabinet`;

export function buildLegalServiceSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': businessId,
    name: `${site.fullName}, ${site.jobTitle.toLowerCase()}`,
    description:
      'Conseil, accompagnement et sécurisation juridique, administrative et logistique pour particuliers et entreprises à Moanda. Légalisation, transactions immobilières et foncier, création de société, contrats, fiscalité, achats et sourcing, abonnements mensuels.',
    url: site.url,
    image: `${site.url}/images/og-gloire-mayombo-juriste.jpg`,
    slogan: site.tagline,
    telephone: site.phone.e164,
    email: site.email.address,
    inLanguage: 'fr',
    founder: { '@id': personId },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: 'GA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Moanda' },
      { '@type': 'AdministrativeArea', name: 'Haut-Ogooué' },
      { '@type': 'Country', name: 'Gabon' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: "Domaines d'intervention",
      itemListElement: serviceDomains.map((domain) => ({
        '@type': 'OfferCatalog',
        name: domain.label,
        itemListElement: domain.items.map((item) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: item },
        })),
      })),
    },
  };
}

export function buildPersonSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: site.fullName,
    givenName: site.firstName,
    familyName: site.lastName,
    jobTitle: site.jobTitle,
    image: `${site.url}/images/gloire-mayombo-juriste-736.webp`,
    url: site.url,
    email: site.email.address,
    telephone: site.phone.e164,
    knowsLanguage: ['fr', 'en'],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: site.degree,
    },
    worksFor: { '@id': businessId },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: 'GA',
    },
  };
}

export function buildBreadcrumbSchema(
  trail: ReadonlyArray<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: `${site.url}${step.path}`,
    })),
  };
}

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#site`,
    url: site.url,
    name: site.fullName,
    inLanguage: 'fr',
    publisher: { '@id': personId },
  };
}
