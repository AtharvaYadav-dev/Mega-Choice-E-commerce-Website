import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  listCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} from '../controllers/couponController.js';

const router = Router();

// Public: validate a coupon for a given cart
router.post('/validate', validateCoupon);

// Admin CRUD
router.get('/', authenticate, requireAdmin, listCoupons);
router.post('/', authenticate, requireAdmin, createCoupon);
router.put('/:id', authenticate, requireAdmin, updateCoupon);
router.delete('/:id', authenticate, requireAdmin, deleteCoupon);

export default router;
