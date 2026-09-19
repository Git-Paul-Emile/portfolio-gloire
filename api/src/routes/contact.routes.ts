import { Router } from 'express';
import { postContact } from '../controllers/contact.controller.js';
import { contactRateLimiter } from '../middlewares/rateLimit.js';

const router = Router();

/**
 * POST /api/v1/contact
 *
 * Cree une demande de contact. La ressource n'est pas persistee en base : elle
 * est transmise par courriel. Le code 201 et la reference renvoyee respectent
 * malgre tout la semantique REST d'une creation.
 *
 * Corps attendu :
 *   fullName  string   obligatoire, 2 a 80 caracteres
 *   email     string   obligatoire, adresse valide
 *   phone     string   facultatif, 30 caracteres maximum
 *   subject   string   obligatoire, identifiant de domaine ou « autre »
 *   message   string   obligatoire, 20 a 2000 caracteres
 *   consent   boolean  obligatoire, doit valoir true
 *   website   string   doit rester vide, champ piege
 *
 * Reponses :
 *   201 { data: { reference, message } }
 *   202 demande ecartee silencieusement, champ piege rempli
 *   400 { error: { code, message, details[] } }
 *   429 { error: { code, message } }
 *   503 { error: { code, message } } service de messagerie indisponible
 */
router.post('/', contactRateLimiter, postContact);

export default router;
