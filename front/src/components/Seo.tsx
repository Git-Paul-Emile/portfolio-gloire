import { Helmet } from 'react-helmet-async';
import { site } from '@/data/site';

interface SeoProps {
  title: string;
  description: string;
  /** Chemin de la page, commencant par une barre oblique. */
  path: string;
  /** Une page utilitaire ne doit pas etre indexee. */
  noIndex?: boolean;
  /** Donnees structurees Schema.org, deja serialisables. */
  jsonLd?: Array<Record<string, unknown>>;
}

/**
 * Metadonnees par page : titre, description, URL canonique, Open Graph et
 * donnees structurees. Un seul composant pour eviter qu'une page en oublie.
 */
export default function Seo({ title, description, path, noIndex = false, jsonLd }: SeoProps) {
  const canonical = `${site.url}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="fr" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/*
        Une page non indexable ne declare pas d'URL canonique. La 404 est servie
        sous l'adresse que le visiteur a tapee, qui n'existe pas : annoncer
        `/404` comme sa version canonique reviendrait a designer une page qui
        n'est dans aucun plan de site, et a donner deux consignes contradictoires
        au robot. Le `noindex` suffit.
      */}
      {noIndex ? null : <link rel="canonical" href={canonical} />}
      <meta
        name="robots"
        content={noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {jsonLd?.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
