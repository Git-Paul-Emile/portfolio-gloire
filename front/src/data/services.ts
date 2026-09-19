import {
  Stamp,
  Home,
  Building2,
  FileSignature,
  UserRound,
  Briefcase,
  Printer,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceDomain {
  /** Identifiant stable, utilise pour l'ancre et les cles React. */
  id: string;
  label: string;
  icon: LucideIcon;
  items: readonly string[];
}

/**
 * Les sept domaines d'intervention, repris de la brochure interieure dans le
 * meme ordre et avec les memes intitules.
 *
 * Aucune phrase de presentation n'est ajoutee : la brochure n'en contient pas,
 * et une description inventee engagerait la juriste sur un service qu'elle n'a
 * pas decrit. Cette liste alimente l'affichage, le menu deroulant du
 * formulaire de contact et les donnees structurees Schema.org.
 */
export const serviceDomains: readonly ServiceDomain[] = [
  {
    id: 'legalisation',
    label: 'Légalisation et démarches administratives',
    icon: Stamp,
    items: [
      'Légalisation de documents : travail, bail, prestation',
      'Enregistrement à la DGI des contrats locatifs',
      'Accompagnement pour les démarches administratives',
      'Demandes de documents : certificats, attestations',
      'Dépôt et suivi de dossiers',
    ],
  },
  {
    id: 'immobilier',
    label: 'Immobilier et location',
    icon: Home,
    items: [
      'Rédaction de contrats de bail, habitation et commercial',
      'Vérification des documents du propriétaire',
      'Enregistrement des baux et suivi fiscal',
      'Accompagnement achat et vente de terrains',
      'Orientation et vérification des documents',
      'Légalisation des documents immobiliers',
    ],
  },
  {
    id: 'entreprises',
    label: "Création et formalités d'entreprises",
    icon: Building2,
    items: [
      'Création de sociétés : SARL, entreprise individuelle',
      "Préparation des dossiers pour l'ANPI",
      'Immatriculation RCCM',
      'Obtention du NIF',
      'Modification des statuts',
      'Préparation et dépôt des documents administratifs',
    ],
  },
  {
    id: 'contrats',
    label: 'Contrats et documents juridiques',
    icon: FileSignature,
    items: [
      'Contrats de prestation de services',
      'Reconnaissances de dette',
      'Procurations',
      'Relecture de contrats avant signature',
      'Rédaction de courriers et actes juridiques',
    ],
  },
  {
    id: 'particuliers',
    label: 'Services pour particuliers',
    icon: UserRound,
    items: [
      "Dossiers d'état civil : naissance, mariage, décès, duplicata",
      'Filiation : reconnaissance et lien parent-enfant',
      'Déclarations et démarches administratives',
      'Demandes, dépôt et suivi de dossiers',
      'Obtention de casier judiciaire',
      'Tous documents afférents au tribunal',
    ],
  },
  {
    id: 'entreprises-assistance',
    label: 'Services pour entreprises',
    icon: Briefcase,
    items: [
      'Constitution de dossiers administratifs',
      'Assistance administrative pour petites entreprises',
      'Assistance fiscale de base : orientation DGI, formulaires simples',
      'Déclaration CNSS des employés',
      'Déclaration CNAMGS des employés',
      'Formalités sociales et administratives',
    ],
  },
  {
    id: 'bureau',
    label: 'Services rapides et bureau',
    icon: Printer,
    items: [
      'Scan, impression, photocopie',
      'Constitution et classement de dossiers',
      'Suivi de dossiers auprès des administrations',
      'Prise de rendez-vous',
      'Traduction simple français vers anglais',
      'Certification conforme de documents',
    ],
  },
] as const;

/** Options du champ « objet » du formulaire, alignees sur les domaines ci-dessus. */
export const contactSubjects = [
  ...serviceDomains.map((domain) => ({ value: domain.id, label: domain.label })),
  { value: 'autre', label: 'Autre demande' },
] as const;
