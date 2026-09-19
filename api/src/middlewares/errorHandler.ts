import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

/** Route inexistante : reponse JSON homogene, pas la page HTML d'Express. */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(AppError.notFound(`La route ${req.method} ${req.originalUrl} n'existe pas.`));
}

/**
 * Dernier maillon de la chaine : toute erreur finit ici.
 * Regle de securite : une erreur inattendue ne revele jamais sa cause au
 * client. Le detail part dans les journaux, le client recoit un code et un
 * message neutre.
 */
export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      logger.error(error.message, { code: error.code, path: req.originalUrl });
    }
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details.length > 0 ? { details: error.details } : {}),
      },
    });
    return;
  }

  logger.error('Erreur non gérée', {
    path: req.originalUrl,
    method: req.method,
    reason: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: "Une erreur interne est survenue. Réessayez dans quelques instants.",
    },
  });
}
