import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Additional products to add (based on your MongoDB screenshots)
const additionalProducts = [
  {
    name: 'Meing Manan Classic Teal T-Shirts',
    description: 'Casual tee with Meing Manan branding.',
    price: 1549,
    discount: 15,
    category: 'T-Shirts',
    brand: 'Meing Manan',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop'],
    stock: 45,
    rating: 4.3,
    reviews: 189,
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    isActive: true,
  },
  {
    name: 'Meing Manan Formal Denim',
    description: 'Pro Khaki formal denim for professional wear.',
    price: 2899,
    discount: 20,
    category: 'Denim',
    brand: 'Meing Manan',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop'],
    stock: 32,
    rating: 4.5,
    reviews: 267,
    gender: 'Men',
    sizes: ['30', '32', '34', '36'],
    isActive: true,
  },
  {
    name: 'Roadster All-Season Violet Dress',
    description: 'Contemporary design with all-season comfort.',
    price: 3716,
    discount: 25,
    category: 'Dress',
    brand: 'Roadster',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop'],
    stock: 28,
    rating: 4.6,
    reviews: 345,
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    isActive: true,
  },
  {
    name: 'Meing Manan Hooded Olive Socks',
    description: 'Made with attention to detail.',
    price: 234,
    discount: 10,
    category: 'Socks',
    brand: 'Meing Manan',
    images: ['https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&auto=format&fit=crop'],
    stock: 150,
    rating: 4.2,
    reviews: 89,
    gender: 'Unisex',
    sizes: ['Free Size'],
    isActive: true,
  },
  {
    name: 'Meing Manan Backpacks',
    description: 'Durable and stylish backpack for daily use.',
    price: 2744,
    discount: 30,
    category: 'Backpacks',
    brand: 'Meing Manan',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop'],
    stock: 42,
    rating: 4.7,
    reviews: 456,
    gender: 'Unisex',
    sizes: ['Free Size'],
    isActive: true,
  },
  {
    name: 'Mango Original Brown Belts',
    description: 'Crafted from premium materials.',
    price: 1091,
    discount: 15,
    category: 'Belts',
    brand: 'Mango',
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800&auto=format&fit=crop'],
    stock: 78,
    rating: 4.4,
    reviews: 234,
    gender: 'Men',
    sizes: ['Free Size'],
    isActive: true,
  },
  {
    name: 'Zara Pro Teal Sandals',
    description: 'Comfortable sandals for summer.',
    price: 2599,
    discount: 20,
    category: 'Sandals',
    brand: 'Zara',
    images: ['https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&auto=format&fit=crop'],
    stock: 56,
    rating: 4.3,
    reviews: 178,
    gender: 'Women',
    sizes: ['5', '6', '7', '8', '9'],
    isActive: true,
  },
  {
    name: 'Roadster Urban Red Belts',
    description: 'Quality craftsmanship you can trust.',
    price: 1519,
    discount: 25,
    category: 'Belts',
    brand: 'Roadster',
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800&auto=format&fit=crop'],
    stock: 92,
    rating: 4.5,
    reviews: 312,
    gender: 'Men',
    sizes: ['Free Size'],
    isActive: true,
  },
  {
    name: 'Vero Moda Vintage Charcoal Caps',
    description: 'Designed for the modern individual.',
    price: 1267,
    discount: 15,
    category: 'Caps',
    brand: 'Vero Moda',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop'],
    stock: 110,
    rating: 4.2,
    reviews: 156,
    gender: 'Unisex',
    sizes: ['Free Size'],
    isActive: true,
  },
  {
    name: 'Vero Moda Signature Teal Innerwear',
    description: 'Premium quality at an affordable price.',
    price: 1472,
    discount: 20,
    category: 'Innerwear',
    brand: 'Vero Moda',
    images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop'],
    stock: 145,
    rating: 4.6,
    reviews: 678,
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    isActive: true,
  },
  {
    name: 'Mango Rock Oversized Tan Activewear',
    description: 'Crafted from premium materials.',
    price: 1335,
    discount: 30,
    category: 'Activewear',
    brand: 'Mango',
    images: ['https://images.unsplash.com/photo-1614252368970-1a96ce8a93cf?w=800&auto=format&fit=crop'],
    stock: 67,
    rating: 4.4,
    reviews: 234,
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isActive: true,
  },
  {
    name: 'Puma Premium Black Shorts',
    description: 'Premium quality at an affordable price.',
    price: 2391,
    discount: 25,
    category: 'Shorts',
    brand: 'Puma',
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop'],
    stock: 58,
    rating: 4.5,
    reviews: 389,
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL'],
    isActive: true,
  },
  {
    name: 'Calvin Klein Pro Khaki T-Shirts',
    description: 'Comfortable fit with modern styling.',
    price: 1635,
    discount: 15,
    category: 'T-Shirts',
    brand: 'Calvin Klein',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop'],
    stock: 72,
    rating: 4.3,
    reviews: 267,
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isActive: true,
  },
  {
    name: 'H&M Slim Luxury White Sneakers',
    description: 'Elevate your style with this timeless piece.',
    price: 5639,
    discount: 20,
    category: 'Sneakers',
    brand: 'H&M',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop'],
    stock: 34,
    rating: 4.7,
    reviews: 892,
    gender: 'Unisex',
    sizes: ['7', '8', '9', '10', '11'],
    isActive: true,
  },
  {
    name: 'Zara Performance Green Activewear',
    description: 'Stand out with this statement piece.',
    price: 4472,
    discount: 35,
    category: 'Activewear',
    brand: 'Zara',
    images: ['https://images.unsplash.com/photo-1614252368970-1a96ce8a93cf?w=800&auto=format&fit=crop'],
    stock: 28,
    rating: 4.6,
    reviews: 445,
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L'],
    isActive: true,
  },
  {
    name: 'Nike Signature Burgundy Tops',
    description: 'Designed for the modern individual.',
    price: 3740,
    discount: 25,
    category: 'Tops',
    brand: 'Nike',
    images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop'],
    stock: 45,
    rating: 4.5,
    reviews: 523,
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isActive: true,
  },
];

async function main() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set in environment.');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const currentCount = await Product.countDocuments();
  console.log(`Current products in database: ${currentCount}`);

  console.log(`\nAdding ${additionalProducts.length} new products...`);

  let inserted = 0;
  for (const p of additionalProducts) {
    // Check if product already exists
    const exists = await Product.findOne({ name: p.name });
    if (!exists) {
      await Product.create(p);
      inserted += 1;
      console.log(`✓ Inserted: ${p.name}`);
    } else {
      console.log(`- Skipped (already exists): ${p.name}`);
    }
  }

  const newCount = await Product.countDocuments();
  console.log(`\n✅ Complete! Added ${inserted} new products.`);
  console.log(`Total products in database: ${newCount}`);

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Failed:', err);
  try { await mongoose.disconnect(); } catch { }
  process.exit(1);
});
