/**
 * Formules tarifaires.
 *
 * ATTENTION, contenu provisoire. Les brochures ne mentionnent aucun tarif :
 * les montants ci-dessous sont des exemples, posés à la demande du développeur
 * pour donner une maquette réaliste. Ils sont volontairement regroupés ici,
 * loin des composants, pour être remplacés en une seule fois par les montants
 * réels de la juriste.
 *
 * Le site les présente explicitement comme indicatifs. Retirer cette mention le
 * jour où les vrais montants seront connus.
 */

export interface PricingPlan {
  id: string;
  name: string;
  /** Montant affiche, deja formate. */
  price: string;
  /** Unite ou condition, affichee en petit sous le montant. */
  unit: string;
  summary: string;
  includes: readonly string[];
  /** Met la formule en avant visuellement. Une seule a la fois. */
  featured?: boolean;
}

export const pricingCurrency = 'FCFA';

export const pricingPlans: readonly PricingPlan[] = [
  {
    id: 'demarche',
    name: 'Démarche simple',
    price: '15 000',
    unit: 'par démarche',
    summary:
      "Pour un acte isolé : faire légaliser une pièce, obtenir une certification conforme, déposer et suivre un dossier auprès d'une administration.",
    includes: [
      'Légalisation ou certification conforme',
      'Constitution du dossier',
      'Dépôt et suivi auprès de l’administration',
      'Demande de certificat ou d’attestation',
    ],
  },
  {
    id: 'contrat',
    name: 'Contrat et bail',
    price: '50 000',
    unit: 'par contrat',
    summary:
      'Pour sécuriser un engagement avant signature : rédaction ou relecture du contrat, vérification des pièces, enregistrement fiscal du bail.',
    includes: [
      'Rédaction ou relecture du contrat',
      'Vérification des documents du propriétaire',
      'Enregistrement du bail à la DGI',
      'Procuration ou reconnaissance de dette',
    ],
    featured: true,
  },
  {
    id: 'entreprise',
    name: "Création d'entreprise",
    price: '150 000',
    unit: 'par société',
    summary:
      "Pour monter une structure de bout en bout : dossier ANPI, immatriculation, obtention du numéro fiscal et formalités sociales de départ.",
    includes: [
      'Préparation du dossier ANPI',
      'Immatriculation au RCCM',
      'Obtention du NIF',
      'Déclarations CNSS et CNAMGS des employés',
    ],
  },
] as const;
