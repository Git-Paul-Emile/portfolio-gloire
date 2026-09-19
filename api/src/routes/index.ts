import { Router } from 'express';
import contactRoutes from './contact.routes.js';

const router = Router();

/** Sonde de supervision : etat du service, sans aucune donnee sensible. */
router.get('/health', (_req, res) => {
  res.json({
    data: { status: 'ok', uptimeSeconds: Math.round(process.uptime()) },
  });
});

router.use('/contact', contactRoutes);

export default router;
