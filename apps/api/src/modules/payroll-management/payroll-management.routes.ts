import { Router, type Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Payroll Management API - Under Development' });
});

export default router;