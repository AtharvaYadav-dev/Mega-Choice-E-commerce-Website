import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: { type: String, enum: ['percent', 'amount'], required: true },
    discountValue: { type: Number, required: true, min: 0 },
    minCartTotal: { type: Number, default: 0, min: 0 },
    allowedBrands: [{ type: String }],
    allowedCategories: [{ type: String }],
    expiresAt: { type: Date },
    usageLimit: { type: Number, default: 0, min: 0 },
    usageCount: { type: Number, default: 0, min: 0 },
    perUserLimit: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

<<<<<<< HEAD
=======

>>>>>>> abd38127457211424207f2d4985f3c0c451dacbb
const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
