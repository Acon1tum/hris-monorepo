import { Router, type Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Audit logs routes - TODO: implement' });
});

export default router;


