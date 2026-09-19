import 'dotenv/config';
import { z } from 'zod';

/**
 * Validation des variables d'environnement au demarrage.
 *
 * Le principe est simple : un serveur mal configure doit refuser de demarrer,
 * pas tomber en panne trois heures plus tard sur la premiere requete. Toute
 * variable manquante ou absurde est signalee ici, avec son nom.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8000),

  /** Origines autorisees a appeler l'API, separees par une virgule. */
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:5173')
    .transform((value) =>
      value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),

  SMTP_HOST: z.string().min(1, 'SMTP_HOST est obligatoire.'),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  /** true pour le port 465 (TLS implicite), false pour 587 (STARTTLS). */
  SMTP_SECURE: z
    .string()
    .default('false')
    .transform((value) => value.toLowerCase() === 'true'),
  SMTP_USER: z.string().min(1, 'SMTP_USER est obligatoire.'),
  SMTP_PASSWORD: z.string().min(1, 'SMTP_PASSWORD est obligatoire.'),

  /** Expediteur affiche. Doit appartenir au domaine authentifie SPF et DKIM. */
  MAIL_FROM: z.string().min(1),
  /** Boite qui recoit les demandes. */
  MAIL_TO: z.email('MAIL_TO doit etre une adresse valide.'),

  SITE_URL: z.url().default('https://www.gloire-mayombo.com'),

  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().int().positive().default(15),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.')} : ${issue.message}`)
    .join('\n');
  throw new Error(`Configuration invalide dans le fichier .env :\n${details}`);
}

export const env = parsed.data;
export const isProduction = env.NODE_ENV === 'production';
