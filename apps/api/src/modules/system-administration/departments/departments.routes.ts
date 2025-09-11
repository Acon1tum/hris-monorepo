import { Router, type Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Departments routes - TODO: implement' });
});

export default router;


