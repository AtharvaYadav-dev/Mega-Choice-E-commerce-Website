import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { createOrder } from '../controllers/orderController.js';

const router = Router();

router.post('/', authenticate, createOrder);

export default router;
