import { Download } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { site } from '@/data/site';

/**
 * Bloc « a emporter » de la section Contact.
 *
 * Deux gestes pour garder les coordonnees hors du site : scanner le code QR,
 * qui contient une fiche vCard et remplit directement le repertoire du
 * telephone, ou telecharger la brochure.
 *
 * Le code QR n'est pas decoratif : il porte une information que rien d'autre
 * ne donne sous cette forme, donc il garde un `alt` descriptif et la mention
 * du format est rappelee en texte a cote.
 */
export default function TakeAway() {
  return (
    <div className="mt-10 rounded-card border border-mist-300 bg-white p-6">
      <h3 className="font-sans text-sm font-semibold tracking-wide text-navy-900">
        Garder mes coordonnées
      </h3>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
        <img
          src={site.qrCode.src}
          alt={`Code QR contenant les coordonnées de ${site.fullName} : téléphone, courriel et ville.`}
          width={360}
          height={360}
          loading="lazy"
          decoding="async"
          className="size-28 shrink-0 rounded-sm border border-mist-300 bg-white p-1"
        />

        <div className="min-w-0">
          <p className="text-sm leading-relaxed text-ink-700">
            {site.qrCode.label} : le scan enregistre directement mon nom, mon numéro et mon
            courriel dans votre répertoire.
          </p>

          <a
            href={site.brochure.href}
            download={site.brochure.fileName}
            className={buttonClasses('outline', 'md', 'mt-5')}
          >
            <Download className="size-4" aria-hidden="true" />
            Télécharger la brochure
          </a>
          <p className="mt-2 text-xs text-ink-500">{site.brochure.details}</p>
        </div>
      </div>
    </div>
  );
}
