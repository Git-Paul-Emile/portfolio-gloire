import {
  Stamp,
  Home,
  Building2,
  Receipt,
  FileSignature,
  Handshake,
  Scale,
  Printer,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceDomain {
  /** Identifiant stable, utilisé pour l'ancre et les clés React. */
  id: string;
  label: string;
  icon: LucideIcon;
  items: readonly string[];
}

/**
 * Les huit domaines d'intervention, enrichis selon la brochure complète et le document
 * officiel de présentation des services de NGOLO-MAYOMBO Gloire Barthélémie.
 */
export const serviceDomains: readonly ServiceDomain[] = [
  {
    id: 'legalisation',
    label: 'Légalisation & démarches administratives',
    icon: Stamp,
    items: [
      'Légalisation de documents : travail, bail, prestation de services',
      'Certification conforme et vérification formelle des actes',
      'Enregistrement à la DGI et formalités fiscales associées',
      'Demandes officielles de documents : certificats, attestations',
      'Constitution, dépôt et suivi rigoureux de dossiers complets',
      'Rédaction de courriers administratifs clairs et professionnels',
    ],
  },
  {
    id: 'immobilier',
    label: 'Immobilier, terrains & foncier',
    icon: Home,
    items: [
      'Recherche active de terrains disponibles à l’achat ou à la vente',
      'Mise en relation directe entre vendeurs et acheteurs de terrains',
      'Vérification minutieuse des dossiers, titres et pièces foncières',
      'Accompagnement administratif complet lors des transactions',
      'Rédaction et relecture de baux d’habitation et baux commerciaux',
      'Enregistrement fiscal des baux et suivi locatif sécurisé',
    ],
  },
  {
    id: 'entreprises',
    label: 'Création & formalités d’entreprises',
    icon: Building2,
    items: [
      'Création et constitution de sociétés : SARL, SAS, entreprise individuelle',
      'Préparation intégrale et dépôt des dossiers auprès de l’ANPI',
      'Immatriculation au Registre du Commerce et du Crédit Mobilier (RCCM)',
      'Obtention du Numéro d’Identification Fiscale (NIF)',
      'Modification des statuts, cessions de parts et réorganisations',
      'Formalités administratives et juridiques de lancement et de suivi',
    ],
  },
  {
    id: 'fiscalite-social',
    label: 'Fiscalité, CNSS & CNAMGS',
    icon: Receipt,
    items: [
      'Déclarations et formalités CNSS des employés sans stress',
      'Démarches d’affiliation et de suivi auprès de la CNAMGS',
      'Dossiers fiscaux préparés avec soin pour la DGI',
      'Assistance dans les formalités auprès de l’administration fiscale',
      'Veille fiscale et juridique pour anticiper vos obligations',
      'Suivi régulier des échéances et archivage des justificatifs',
    ],
  },
  {
    id: 'contrats',
    label: 'Contrats, baux & actes juridiques',
    icon: FileSignature,
    items: [
      'Rédaction de contrats de prestation de services et contrats commerciaux',
      'Préparation et sécurisation de baux d’habitation et professionnels',
      'Rédaction de procès-verbaux (assemblées générales, réunions de direction)',
      'Reconnaissances de dettes, accords bilatéraux et conventions',
      'Rédaction de procurations officielles et mandats',
      'Lecture et analyse juridique de contrats avant signature',
    ],
  },
  {
    id: 'achats-sourcing',
    label: 'Achats, sourcing & intermédiation',
    icon: Handshake,
    items: [
      'Recherche ciblée de produits, équipements et matériels',
      'Sourcing, identification et qualification de fournisseurs fiables',
      'Comparaison approfondie des offres de prix et conditions commerciales',
      'Mise en relation d’affaires entre entreprises, fournisseurs et clients',
      'Assistance à la passation de commande et suivi d’acheminement',
      'Accompagnement à la vente de biens, produits ou équipements',
    ],
  },
  {
    id: 'particuliers',
    label: 'Particuliers & démarches judiciaires',
    icon: Scale,
    items: [
      'Demande et obtention de casier judiciaire',
      'Préparation de documents et dossiers liés aux démarches judiciaires',
      'Dossiers d’état civil : naissance, mariage, décès, duplicatas',
      'Dossiers de filiation : reconnaissance et lien parent-enfant',
      'Rédaction de courriers administratifs, recours et requêtes',
      'Accompagnement dans les formalités auprès du tribunal',
    ],
  },
  {
    id: 'bureau',
    label: 'Services rapides & assistance de bureau',
    icon: Printer,
    items: [
      'Classement, archivage et organisation méthodique de documents',
      'Préparation de dossiers administratifs prêts à l’emploi',
      'Scan, impression, photocopie et reproduction de pièces',
      'Prise de rendez-vous et suivi auprès des administrations',
      'Traduction simple de documents et courriers français / anglais',
      'Assistance de secrétariat juridique et administratif',
    ],
  },
] as const;

/** Options du champ « objet » du formulaire, alignees sur les prestations et formules. */
export const contactSubjects = [
  ...serviceDomains.map((domain) => ({ value: domain.id, label: domain.label })),
  { value: 'abonnement-mensuel', label: 'Abonnement mensuel (L’esprit libre)' },
  { value: 'offre-globale', label: 'Offre globale tout-inclus' },
  { value: 'autre', label: 'Autre demande' },
] as const;
