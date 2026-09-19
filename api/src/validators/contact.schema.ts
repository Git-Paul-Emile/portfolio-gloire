import { z } from 'zod';

/** Identifiants des domaines, repris du front. Une valeur inconnue est rejetee. */
export const SUBJECT_VALUES = [
  'legalisation',
  'immobilier',
  'entreprises',
  'contrats',
  'particuliers',
  'entreprises-assistance',
  'bureau',
  'autre',
] as const;

export const SUBJECT_LABELS: Record<(typeof SUBJECT_VALUES)[number], string> = {
  legalisation: 'Légalisation et démarches administratives',
  immobilier: 'Immobilier et location',
  entreprises: "Création et formalités d'entreprises",
  contrats: 'Contrats et documents juridiques',
  particuliers: 'Services pour particuliers',
  'entreprises-assistance': 'Services pour entreprises',
  bureau: 'Services rapides de bureau',
  autre: 'Autre demande',
};

/**
 * Regle d'or : le serveur ne fait jamais confiance au client.
 * Les memes contraintes existent cote navigateur pour le confort, mais seules
 * celles-ci font autorite. `strict()` rejette tout champ non prevu, ce qui
 * evite qu'une donnee inattendue se retrouve dans le courriel envoye.
 */
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
    /**
     * Champ piege. Le schema l'accepte rempli ou vide : c'est le controleur qui
     * decide quoi en faire. Le rejeter ici renverrait une erreur de validation
     * au robot, ce qui lui apprend exactement quel champ eviter au prochain
     * essai. Mieux vaut accepter, ne rien envoyer, et repondre un succes.
     */
    website: z.string().max(200).optional(),
    consent: z.literal(true, {
      message: 'Votre accord est nécessaire pour que je puisse vous répondre.',
    }),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
