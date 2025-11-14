import { validateCouponInternal } from './couponController.js';

export async function computePricing(req, res, next) {
  try {
    const { items = [], couponCode } = req.body || {};
    const userId = req.user?._id || null;
    const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0);

    if (!couponCode) {
      return res.json({
        subtotal,
        discount: 0,
        total: subtotal,
      });
    }

    const v = await validateCouponInternal({
      code: couponCode,
      cartTotal: subtotal,
      items: items.map((it) => ({ brand: it.brand, category: it.category })),
      userId,
    });
    if (!v.ok) return res.status(v.status).json({ message: v.message, subtotal, discount: 0, total: subtotal });

    return res.json({
      subtotal: v.result.totalBefore,
      discount: v.result.discountAmount,
      total: v.result.totalAfter,
      coupon: v.result.coupon,
    });
  } catch (err) { next(err); }
}
