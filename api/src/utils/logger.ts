import { isProduction } from '../config/env.js';

type Level = 'info' | 'warn' | 'error';

/**
 * Journal structure minimal.
 * Une ligne de journal est un objet JSON en production : un agregateur peut la
 * lire sans expression reguliere. En developpement, le format reste lisible.
 * Aucun mot de passe ni contenu de message n'est journalise.
 */
function write(level: Level, message: string, context: Record<string, unknown> = {}): void {
  const entry = { level, time: new Date().toISOString(), message, ...context };
  const line = isProduction ? JSON.stringify(entry) : `[${level}] ${message}`;

  if (level === 'error') console.error(line, isProduction ? '' : context);
  else if (level === 'warn') console.warn(line, isProduction ? '' : context);
  else console.log(line, isProduction ? '' : context);
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => write('info', message, context),
  warn: (message: string, context?: Record<string, unknown>) => write('warn', message, context),
  error: (message: string, context?: Record<string, unknown>) => write('error', message, context),
};
