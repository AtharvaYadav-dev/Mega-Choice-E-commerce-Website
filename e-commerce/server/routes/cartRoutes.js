import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { computePricing } from '../controllers/cartController.js';

const router = Router();

router.post('/pricing', authenticate, computePricing);

export default router;
