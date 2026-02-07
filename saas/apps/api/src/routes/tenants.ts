import { Router } from 'express';

const router = Router();

// TODO: Implement tenant CRUD operations
router.get('/', (req, res) => {
  res.json({ message: 'Tenant routes - TODO' });
});

export { router as tenantRoutes };
