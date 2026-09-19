/**
 * Source unique des informations publiques du cabinet.
 *
 * Regle de contenu : tout ce qui figure ici doit provenir des deux brochures
 * fournies, Brochure_Gloire_Mayombo_EXTERIEUR.pdf et
 * Brochure_Gloire_Mayombo_INTERIEUR_REAJUSTEE.pdf, rangees dans `brief/`.
 * Aucun delai, aucun tarif, aucun horaire n'y figure : ne pas en inventer.
 */

/** Numero national tel qu'il s'ecrit au Gabon. */
const PHONE_NATIONAL = '060 34 65 22';
/** Meme numero au format E.164, utilise par les liens tel: et WhatsApp. */
const PHONE_E164 = '+24160346522';

export const site = {
  /** A remplacer par le domaine reel au moment de la mise en ligne. */
  url: 'https://www.gloire-mayombo.com',
  lastName: 'NGOLO-MAYOMBO',
  firstName: 'Gloire Barthélémie',
  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  },
  jobTitle: 'Juriste en droit des affaires',
  /** Accroche interieure de la brochure. */
  tagline: 'Le droit simplifié, vos intérêts sécurisés.',
  /** Accroche de couverture. */
  promise: 'Des solutions juridiques à vos côtés',
  /** Sous-titre de couverture. */
  approach: 'Conseil, accompagnement, sécurisation',
  /** Phrase de la page contact de la brochure. */
  listening: 'À votre écoute pour vous accompagner.',
  degree: 'Master 2 en droit des affaires, spécialisation fiscalité',
  phone: {
    national: PHONE_NATIONAL,
    e164: PHONE_E164,
    href: `tel:${PHONE_E164}`,
  },
  whatsapp: {
    label: 'WhatsApp',
    href: `https://wa.me/${PHONE_E164.replace('+', '')}`,
  },
  email: {
    address: 'mayombogloire29@gmail.com',
    href: 'mailto:mayombogloire29@gmail.com',
  },
  address: {
    locality: 'Moanda',
    region: 'Haut-Ogooué',
    country: 'Gabon',
    get full() {
      return `${this.locality}, ${this.region}, ${this.country}`;
    },
  },
  /** Coordonnees approximatives de Moanda, pour les donnees structurees. */
  geo: { latitude: -1.5333, longitude: 13.2 },
  /**
   * Documents telechargeables, servis depuis `public/`.
   * La brochure est la fusion des deux faces fournies dans `brief/` : la
   * couverture en page 1, les sept domaines en page 2.
   */
  brochure: {
    href: '/documents/brochure-gloire-mayombo-juriste.pdf',
    fileName: 'brochure-gloire-mayombo-juriste.pdf',
    label: 'Brochure de présentation',
    details: 'PDF, 2 pages, 590 Ko',
  },
  /**
   * Code QR de la brochure. Il contient une fiche vCard : le scanner
   * enregistre directement le nom, le telephone, le courriel et la ville dans
   * les contacts du telephone. Le libelle doit dire cela, pas « me contacter ».
   */
  qrCode: {
    src: '/images/qr-contact-gloire-mayombo.png',
    label: 'Scannez pour enregistrer mes coordonnées',
  },
  /** Auteur du site, credite dans le pied de page. */
  author: {
    name: 'PECKOUET-BINOMBO',
    /** Nom affiche dans le pied de page. */
    displayName: 'Paul Emile',
    role: 'Conception et développement',
    portfolio: 'https://bright-selkie-bdc0a4.netlify.app/',
  },
} as const;

/** Les quatre engagements, repris mot pour mot de la brochure. */
export const commitments = [
  'Écoute et disponibilité',
  'Conseils clairs et adaptés à votre situation',
  'Suivi rigoureux de vos dossiers',
  'Confidentialité et professionnalisme',
] as const;

/** Ancres de navigation de la page d'accueil. */
/*
  L'ordre de ce tableau est celui du menu, mais aussi celui des sections dans
  la page : c'est lui que suit le soulignement de l'element actif. Il doit
  rester aligne sur l'ordre de rendu dans `HomePage`.
*/
export const navLinks = [
  { id: 'profil', label: 'Qui suis-je' },
  { id: 'prestations', label: 'Prestations' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'contact', label: 'Contact' },
] as const;

export type NavLink = (typeof navLinks)[number];
