import Coupon from '../models/Coupon.js';
import CouponRedemption from '../models/CouponRedemption.js';

export async function listCoupons(req, res, next) {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) { next(err); }
}

export async function createCoupon(req, res, next) {
  try {
    const payload = req.body || {};
    payload.code = String(payload.code || '').toUpperCase();
    const exists = await Coupon.findOne({ code: payload.code });
    if (exists) return res.status(409).json({ message: 'Coupon code already exists' });
    const doc = await Coupon.create(payload);
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function updateCoupon(req, res, next) {
  try {
    const id = req.params.id;
    const payload = req.body || {};
    if (payload.code) payload.code = String(payload.code).toUpperCase();
    const updated = await Coupon.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ message: 'Coupon not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteCoupon(req, res, next) {
  try {
    const id = req.params.id;
    const deleted = await Coupon.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
}

function matchesConstraints(coupon, items = []) {
  // If constraints empty, treat as open to all
  const brands = (coupon.allowedBrands || []).filter(Boolean).map((s) => s.toLowerCase());
  const cats = (coupon.allowedCategories || []).filter(Boolean).map((s) => s.toLowerCase());
  if (!brands.length && !cats.length) return true;
  return items.some((it) => {
    const b = (it.brand || '').toLowerCase();
    const c = (it.category || '').toLowerCase();
    return (brands.length ? brands.includes(b) : false) || (cats.length ? cats.includes(c) : false);
  });
}

export async function validateCouponInternal({ code, cartTotal, items, userId }) {
  const normalizedCode = String(code || '').toUpperCase();
  const total = Number(cartTotal || 0);

  const coupon = await Coupon.findOne({ code: normalizedCode });
  if (!coupon) return { ok: false, status: 404, message: 'Invalid code' };

  if (!coupon.isActive) return { ok: false, status: 400, message: 'Coupon is inactive' };
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { ok: false, status: 400, message: 'Coupon has expired' };
  }
  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { ok: false, status: 400, message: 'Coupon usage limit reached' };
  }

  if (Number(coupon.minCartTotal || 0) > total) {
    return { ok: false, status: 400, message: `Minimum cart total is ₹${coupon.minCartTotal}` };
  }

  const ok = matchesConstraints(coupon, Array.isArray(items) ? items : []);
  if (!ok) {
    return { ok: false, status: 400, message: 'Coupon does not apply to selected items' };
  }

  // per-user limit
  if (coupon.perUserLimit && userId) {
    const red = await CouponRedemption.findOne({ coupon: coupon._id, user: userId });
    if (red && red.count >= coupon.perUserLimit) {
      return { ok: false, status: 400, message: 'Per-user redemption limit reached' };
    }
  }

  // Calculate discount
  let discountAmount = 0;
  if (coupon.discountType === 'percent') {
    discountAmount = Math.floor((total * Number(coupon.discountValue)) / 100);
  } else {
    discountAmount = Math.floor(Number(coupon.discountValue));
  }
  if (discountAmount < 0) discountAmount = 0;
  const discountedTotal = Math.max(0, total - discountAmount);

  return {
    ok: true,
    coupon,
    result: {
      valid: true,
      coupon: {
        id: coupon._id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minCartTotal: coupon.minCartTotal,
        expiresAt: coupon.expiresAt,
        usageLimit: coupon.usageLimit,
        usageCount: coupon.usageCount,
        allowedBrands: coupon.allowedBrands,
        allowedCategories: coupon.allowedCategories,
      },
      discountAmount,
      totalBefore: total,
      totalAfter: discountedTotal,
    }
  };
}

export async function validateCoupon(req, res, next) {
  try {
    const { code, cartTotal, items, userId: bodyUserId } = req.body || {};
    const userId = req.user?._id || bodyUserId || null;
    const v = await validateCouponInternal({ code, cartTotal, items, userId });
    if (!v.ok) return res.status(v.status).json({ valid: false, message: v.message });
    res.json(v.result);
  } catch (err) { next(err); }
}
