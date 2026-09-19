import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

/**
 * Limitation du debit sur le formulaire.
 * Un formulaire de contact public est une porte ouverte a l'envoi massif : sans
 * plafond, une seule machine peut saturer la boite de la juriste et faire
 * blacklister le domaine expediteur.
 */
export const contactRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message:
        'Trop de demandes envoyées depuis cet appareil. Patientez quelques minutes avant de réessayer.',
    },
  },
});

/** Garde-fou global, bien plus large, contre le balayage automatise. */
export const globalRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
