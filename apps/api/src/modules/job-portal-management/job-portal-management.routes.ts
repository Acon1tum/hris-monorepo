import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Job Portal Management API - Under Development' });
});

export default router;