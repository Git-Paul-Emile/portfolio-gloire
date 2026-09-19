import type { NextFunction, Request, Response } from 'express';
import { contactSchema } from '../validators/contact.schema.js';
import { handleContactRequest } from '../services/contact.service.js';
import { AppError } from '../utils/AppError.js';
import { logger } from '../utils/logger.js';

/**
 * Le controleur ne contient aucune regle metier : il valide l'entree, delegue
 * au service, puis met en forme la reponse HTTP. C'est ce decoupage qui permet
 * de tester le service sans monter un serveur.
 */
export async function postContact(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      field: String(issue.path[0] ?? 'formulaire'),
      message: issue.message,
    }));
    next(AppError.badRequest('Certains champs doivent être corrigés.', details));
    return;
  }

  // Champ piege rempli : on repond comme si tout allait bien, sans rien envoyer.
  // Un robot qui recoit une erreur reessaie, un robot qui recoit un succes part.
  if (parsed.data.website && parsed.data.website.length > 0) {
    logger.warn('Requete de contact ecartee, champ piege rempli', { ip: req.ip });
    res.status(202).json({
      data: { reference: 'GM-000000', message: 'Votre demande a été prise en compte.' },
    });
    return;
  }

  try {
    const result = await handleContactRequest(parsed.data, req.ip);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
}
