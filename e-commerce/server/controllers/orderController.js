import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import CouponRedemption from '../models/CouponRedemption.js';
import { validateCouponInternal } from './couponController.js';

export async function createOrder(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user?._id;
    const { items = [], couponCode } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    // Validate stock and prepare products
    const productIds = items.map((it) => it.productId).filter(Boolean);
    const products = await Product.find({ _id: { $in: productIds } }).session(session);
    const byId = new Map(products.map((p) => [String(p._id), p]));

    for (const it of items) {
      const p = byId.get(String(it.productId));
      if (!p) {
        throw new Error('Product not found: ' + it.productId);
      }
      if (typeof p.stock === 'number' && p.stock < Number(it.qty || 0)) {
        throw new Error(`Insufficient stock for ${p.name}`);
      }
    }

    const subtotal = items.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0), 0);

    // Optional coupon
    let discountAmount = 0;
    let couponDoc = null;
    if (couponCode) {
      const v = await validateCouponInternal({
        code: couponCode,
        cartTotal: subtotal,
        items: items.map((it) => ({ brand: it.brand, category: it.category })),
        userId,
      });
      if (!v.ok) return res.status(v.status).json({ message: v.message });
      discountAmount = v.result.discountAmount;
      couponDoc = v.coupon;
    }

    const total = Math.max(0, subtotal - discountAmount);

    // Decrement stock
    for (const it of items) {
      const updated = await Product.findOneAndUpdate(
        { _id: it.productId, stock: { $gte: it.qty } },
        { $inc: { stock: -Number(it.qty || 0) } },
        { new: true, session }
      );
      if (!updated) throw new Error('Stock update failed for product ' + it.productId);
    }

    // Create order
    const order = await Order.create([
      {
        user: userId,
        items: items.map((it) => ({
          productId: it.productId,
          name: it.name,
          brand: it.brand,
          category: it.category,
          price: Number(it.price || 0),
          qty: Number(it.qty || 0),
        })),
        subtotal,
        discountAmount,
        total,
        couponCode: couponCode || undefined,
        status: 'paid',
      },
    ], { session });

    // Update coupon usage if applied
    if (couponDoc) {
      await Coupon.updateOne({ _id: couponDoc._id }, { $inc: { usageCount: 1 } }, { session });
      await CouponRedemption.updateOne(
        { coupon: couponDoc._id, user: userId },
        { $inc: { count: 1 } },
        { upsert: true, session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ ok: true, order: order[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
}
