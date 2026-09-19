interface SectionHeadingProps {
  title: string;
  /** Texte d'introduction, en petit, sous le titre. */
  description?: string;
  /** Niveau reel du titre : la page d'accueil n'a qu'un seul h1, dans le hero. */
  as?: 'h2' | 'h3';
  tone?: 'light' | 'dark';
}

/**
 * Entete de section : le grand titre d'abord, le petit texte ensuite.
 *
 * Aucun surtitre, aucun repere lateral, aucun filet. La hierarchie tient a la
 * taille et a la couleur, ce qui evite la repetition mecanique d'un meme motif
 * decoratif a chaque section.
 */
export default function SectionHeading({
  title,
  description,
  as: Tag = 'h2',
  tone = 'light',
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <header className="max-w-2xl">
      <Tag
        className={`text-3xl leading-tight sm:text-4xl ${isDark ? 'text-white' : 'text-navy-900'}`}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={`text-lu mt-4 text-base leading-relaxed ${
            isDark ? 'text-mist-200' : 'text-ink-500'
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
