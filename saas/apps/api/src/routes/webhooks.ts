import { Router } from 'express';

const router = Router();

// TODO: Implement Stripe webhook handler
router.post('/stripe', (req, res) => {
  res.json({ received: true });
});

export { router as webhookRoutes };
