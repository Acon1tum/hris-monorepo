import { Router, type Request, type Response } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Online Job Application Portal API - Under Development' });
});

export default router;