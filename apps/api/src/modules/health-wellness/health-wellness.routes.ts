import { Router, type Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Health Wellness API - Under Development' });
});

export default router;