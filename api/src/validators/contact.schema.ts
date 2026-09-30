import { z } from 'zod';

/** Identifiants des domaines, synchronises avec le front. */
export const SUBJECT_VALUES = [
  'legalisation',
  'immobilier',
  'entreprises',
  'fiscalite-social',
  'contrats',
  'achats-sourcing',
  'particuliers',
  'entreprises-assistance',
  'bureau',
  'abonnement-mensuel',
  'offre-globale',
  'autre',
] as const;

export const SUBJECT_LABELS: Record<(typeof SUBJECT_VALUES)[number], string> = {
  legalisation: 'Légalisation et démarches administratives',
  immobilier: 'Immobilier, terrains et foncier',
  entreprises: "Création et formalités d'entreprises",
  'fiscalite-social': 'Fiscalité, CNSS et CNAMGS',
  contrats: 'Contrats, baux et actes juridiques',
  'achats-sourcing': 'Achats, sourcing et intermédiation',
  particuliers: 'Particuliers et démarches judiciaires',
  'entreprises-assistance': 'Services pour entreprises',
  bureau: 'Services rapides et bureau',
  'abonnement-mensuel': 'Abonnement mensuel (L’esprit libre)',
  'offre-globale': 'Offre globale tout-inclus',
  autre: 'Autre demande',
};

export const contactSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Indiquez votre nom, au moins deux caractères.')
      .max(80, 'Le nom ne peut pas dépasser 80 caractères.'),
    email: z.email('Cette adresse électronique est invalide.').max(150),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[0-9+\-.\s()]*$/, 'Le numéro contient des caractères non autorisés.')
      .optional()
      .or(z.literal('')),
    subject: z.enum(SUBJECT_VALUES, {
      message: "L'objet sélectionné n'existe pas.",
    }),
    message: z
      .string()
      .trim()
      .min(20, 'Décrivez votre besoin en quelques mots, au moins vingt caractères.')
      .max(2000, 'Le message ne peut pas dépasser 2000 caractères.'),
    website: z.string().max(200).optional(),
    consent: z.literal(true, {
      message: 'Votre accord est nécessaire pour que je puisse vous répondre.',
    }),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
