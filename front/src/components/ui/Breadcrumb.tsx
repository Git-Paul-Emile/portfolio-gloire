import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  trail: ReadonlyArray<{ name: string; path: string }>;
}

/**
 * Fil d'Ariane visible. Le balisage Schema.org correspondant est fourni par
 * `buildBreadcrumbSchema`, appele dans la page.
 */
export default function Breadcrumb({ trail }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-500">
        {trail.map((step, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={step.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-navy-900">
                  {step.name}
                </span>
              ) : (
                <>
                  <Link
                    to={step.path}
                    className="underline decoration-blue-500 underline-offset-4 hover:text-navy-900"
                  >
                    {step.name}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
