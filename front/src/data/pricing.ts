/**
 * Formules tarifaires et modeles d'offres.
 *
 * Reprend les 3 modeles d'offres du document de presentation :
 * 1. Accompagnement Mensuel : L'esprit libre (Formules 1 a 4)
 * 2. Offres Globales Tout-Inclus (Administrative, Terrain, Achat, Entreprise)
 * 3. Prestations Ponctuelles : Rapide & Cible (Mission ponctuelle ciblee)
 */

export interface PricingPlan {
  id: string;
  name: string;
  /** Montant affiche ou mention 'Sur devis'. */
  price: string;
  /** Unite ou precision affichee sous le montant. */
  unit: string;
  summary: string;
  includes: readonly string[];
  /** Met la formule en avant visuellement. */
  featured?: boolean;
  /** Badge contextuel au sommet de la carte. */
  badge?: string;
}

export interface PricingCategory {
  id: 'abonnements' | 'globales' | 'ponctuelles';
  label: string;
  tag: string;
  badge: string;
  title: string;
  description: string;
  plans: readonly PricingPlan[];
}

export const pricingCurrency = 'FCFA';

/**
 * 1. Accompagnement Mensuel : L'esprit libre.
 * Formules continues pour gerer les affaires sans tracas au quotidien.
 */
export const monthlyPlans: readonly PricingPlan[] = [
  {
    id: 'formule-1',
    name: 'Formule 1 - Appui administratif',
    price: 'Sur devis',
    unit: 'par mois',
    summary:
      'Gestion et organisation documentaire au quotidien pour structurer vos dossiers et ne rater aucune échéance.',
    includes: [
      'Gestion et classement méthodique des documents',
      'Rédaction et suivi des courriers administratifs',
      'Constitution de dossiers complets prêts à l’emploi',
      'Suivi administratif régulier auprès des interlocuteurs',
      'Vérification rigoureuse et préparation des pièces',
      'Rappels et veille sur vos échéances calendaires',
    ],
  },
  {
    id: 'formule-2',
    name: 'Formule 2 - Administratif & Démarches',
    price: 'Sur devis',
    unit: 'par mois',
    summary:
      'Formule 1 enrichie de la prise en charge de vos démarches sociales et fiscales auprès des administrations.',
    includes: [
      'Tous les services inclus dans la Formule 1',
      'Déclarations et suivi régulier CNSS',
      'Démarches d’affiliation et gestion CNAMGS',
      'Préparation et suivi des dossiers fiscaux DGI',
      'Suivi actif des démarches auprès des administrations',
      'Archivage et sécurisation des justificatifs officiels',
    ],
  },
  {
    id: 'formule-3',
    name: 'Formule 3 - Accompagnement Entreprise',
    price: 'Sur devis',
    unit: 'par mois',
    featured: true,
    badge: 'Recommandé Entreprises',
    summary:
      'La solution intégrale : juridique, fiscal, social, baux, PV d’assemblées et sourcing de fournisseurs.',
    includes: [
      'Tous les services inclus dans la Formule 2',
      'Appui juridique continu et recherche juridique',
      'Veille juridique et fiscale pour anticiper les risques',
      'Rédaction et préparation de contrats, baux et PV',
      'Recherche et sourcing de fournisseurs ou équipements',
      'Mise en relation d’affaires et appui projets d’achat/vente',
    ],
  },
  {
    id: 'formule-4',
    name: 'Formule 4 - Sur mesure',
    price: 'Personnalisé',
    unit: 'selon périmètre',
    summary:
      'Une formule construite exactement selon les enjeux, la volumétrie et les spécificités de votre structure.',
    includes: [
      'Périmètre d’intervention 100 % sur mesure',
      'Combinaison ciblée de prestations juridiques et logistiques',
      'Interlocutrice unique et dédiée à vos côtés',
      'Tarif et volume ajustés après un premier échange d’évaluation',
    ],
  },
] as const;

/**
 * 2. Offres Globales Tout-Inclus.
 * Forfaits tout-en-un pour piloter un projet d\'envergure de A a Z.
 */
export const globalOffers: readonly PricingPlan[] = [
  {
    id: 'offre-administrative',
    name: 'Offre Administrative',
    price: 'Sur devis',
    unit: 'par mission globale',
    summary:
      'Vous avez plusieurs démarches administratives à mener ? Nous prenons tout en charge de manière fluide et coordonnée.',
    includes: [
      'Analyse approfondie de votre situation et de vos besoins',
      'Constitution intégrale de tous les dossiers requis',
      'Préparation et rédaction soignée des documents',
      'Accomplissement des démarches auprès des autorités compétentes',
      'Suivi de dossier de bout en bout et classement des pièces',
    ],
  },
  {
    id: 'offre-terrain',
    name: 'Offre Terrain & Foncier',
    price: 'Sur devis',
    unit: 'par transaction',
    featured: true,
    badge: 'Sécurité Foncière',
    summary:
      'Un projet d’achat ou de vente de terrain ? Un accompagnement sécurisé du premier jour jusqu’à la conclusion.',
    includes: [
      'Recherche active du terrain ou d’acquéreurs qualifiés',
      'Mise en relation directe et sécurisée entre les parties',
      'Vérification minutieuse des titres et documents disponibles',
      'Préparation du dossier et rédaction des actes de vente',
      'Suivi rigoureux des démarches jusqu’à l’étape finale convenue',
    ],
  },
  {
    id: 'offre-achat',
    name: 'Offre Achat & Sourcing',
    price: 'Sur devis',
    unit: 'par opération',
    summary:
      'Vous cherchez un équipement, des produits ou un fournisseur fiable ? Nous optimisons vos achats professionnels.',
    includes: [
      'Recherche ciblée du produit, équipement ou fournisseur',
      'Sélection rigoureuse et comparaison détaillée des offres',
      'Mise en relation avec les vendeurs ou fabricants',
      'Assistance technique à la commande et négociation',
      'Suivi de la commande et suivi logistique de livraison',
    ],
  },
  {
    id: 'offre-entreprise',
    name: 'Offre Entreprise Multi-services',
    price: 'Sur devis',
    unit: 'pack 360°',
    summary:
      'Un accompagnement complet et structurant qui regroupe tous les besoins stratégiques et opérationnels de votre entreprise.',
    includes: [
      'Gestion administrative complète et classement documentaire',
      'Contrats d’affaires, baux commerciaux et procès-verbaux',
      'Formalités déclaratives CNSS, CNAMGS et fiscalité DGI',
      'Sourcing fournisseurs et intermédiation d’affaires ciblée',
      'Formule 100 % personnalisable selon votre croissance',
    ],
  },
] as const;

/**
 * 3. Prestations Ponctuelles : Rapide & Cible.
 * Actes isoles et forfaits ponctuels avec montants indicatifs.
 * L\'onglet prestations ponctuelles ne conserve que la carte \'Mission ponctuelle ciblée\'.
 */
export const punctualPlans: readonly PricingPlan[] = [
  {
    id: 'sur-devis',
    name: 'Mission ponctuelle ciblée',
    price: 'Sur devis',
    unit: 'selon la nature du besoin',
    featured: true,
    summary:
      'Recherche de terrain, sourcing équipement, intermédiation ou démarche judiciaire spécifique. Devis transparent avant démarrage.',
    includes: [
      'Recherche de terrain, acheteur ou fournisseur',
      'Mise en relation d’affaires et suivi des échanges',
      'Dossier judiciaire ou démarche spécifique auprès du tribunal',
      'Devis clair et engagement écrit sans surprise',
    ],
  },
] as const;

/** Liste des 3 categories d\'offres pour l\'affichage en onglets. */
export const pricingCategories: readonly PricingCategory[] = [
  {
    id: 'abonnements',
    label: 'Abonnements mensuels',
    tag: 'Mensuel',
    badge: 'L’esprit libre',
    title: 'Accompagnement mensuel : L’esprit libre',
    description:
      'Une gestion continue de votre quotidien administratif, fiscal et juridique. Quatre formules évolutives pour diriger l’esprit serein sans tracas.',
    plans: monthlyPlans,
  },
  {
    id: 'globales',
    label: 'Offres Tout-Inclus',
    tag: 'Clé en main',
    badge: 'Packs projets',
    title: 'Offres globales tout-inclus',
    description:
      'Des formules complètes pour tout confier en toute confiance. Prise en charge intégrale de votre projet de A à Z par un interlocuteur unique.',
    plans: globalOffers,
  },
  {
    id: 'ponctuelles',
    label: 'Prestations ponctuelles',
    tag: 'Rapide & ciblé',
    badge: 'Tarifs indicatifs',
    title: 'Prestations ponctuelles : Rapide & ciblé',
    description:
      'Un besoin précis ou une démarche ciblée à accomplir ? Étude personnalisée et devis transparent avant démarrage.',
    plans: punctualPlans,
  },
] as const;

/** Pour retro-compatibilite directe si un composant lit pricingPlans. */
export const pricingPlans = punctualPlans;
