import { createApp } from './app.js';
import { env } from './config/env.js';
import { verifyMailer } from './services/mailer.js';
import { logger } from './utils/logger.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info('API de contact demarree', { port: env.PORT, env: env.NODE_ENV });
  void verifyMailer();
});

/**
 * Arret propre : on cesse d'accepter de nouvelles connexions, on laisse les
 * requetes en cours se terminer, et on abandonne au bout de dix secondes.
 * Sans cela, un redeploiement coupe un envoi de courriel en plein vol.
 */
function shutdown(signal: string): void {
  logger.info('Arret demande', { signal });
  server.close(() => {
    logger.info('Serveur arrete proprement');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Arret force : des connexions ne se sont pas fermees a temps");
    process.exit(1);
  }, 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  logger.error('Promesse rejetee sans traitement', { reason: String(reason) });
});
