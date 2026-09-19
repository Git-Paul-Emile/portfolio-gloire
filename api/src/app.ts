import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env, isProduction } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { globalRateLimiter } from './middlewares/rateLimit.js';
import { AppError } from './utils/AppError.js';

/**
 * Assemblage de l'application Express, sans ecoute reseau.
 * Separer `app` de `server` permet de monter l'application dans un test sans
 * ouvrir de port.
 */
export function createApp() {
  const app = express();

  // Derriere un proxy inverse, req.ip doit refleter le vrai client, sinon la
  // limitation de debit s'applique a l'adresse du proxy pour tout le monde.
  app.set('trust proxy', isProduction ? 1 : false);
  app.disable('x-powered-by');

  app.use(helmet());

  app.use(
    cors({
      origin(origin, callback) {
        // Requetes sans origine : outils en ligne de commande, sondes de sante.
        if (!origin || env.CORS_ORIGINS.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(new AppError(403, 'CORS_REJECTED', "Origine non autorisée."));
      },
      methods: ['GET', 'POST'],
      maxAge: 86_400,
    }),
  );

  // Un formulaire de contact n'a aucune raison d'envoyer plus de quelques
  // kilooctets : plafonner la taille du corps evite un deni de service trivial.
  app.use(express.json({ limit: '32kb' }));

  app.use(globalRateLimiter);

  app.use('/api/v1', routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
