import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0, index: true },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    category: { type: String, index: true },
    brand: { type: String, index: true },
    images: [{ type: String }],
    sizes: [{ type: String }],
    stock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    gender: { type: String, enum: ['Men', 'Women', 'Kids', 'Unisex'], default: 'Unisex', index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Compound indexes for common queries
productSchema.index({ isActive: 1, category: 1 });
productSchema.index({ isActive: 1, brand: 1 });
productSchema.index({ isActive: 1, gender: 1 });
productSchema.index({ isActive: 1, price: 1 });
productSchema.index({ isActive: 1, createdAt: -1 });


const Product = mongoose.model('Product', productSchema);
export default Product;
