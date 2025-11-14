import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const products = [
  {
    name: 'Air Tee',
    description: 'Breathable cotton tee for everyday comfort.',
    price: 999,
    category: 'T-Shirts',
    brand: 'Nike',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop'],
    stock: 50,
    rating: 4.4,
    isActive: true,
  },
  {
    name: 'Originals Hoodie',
    description: 'Cozy fleece-lined hoodie for cool days.',
    price: 2499,
    category: 'Hoodies',
    brand: 'Adidas',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop'],
    stock: 35,
    rating: 4.6,
    isActive: true,
  },
  {
    name: 'Classic Denim',
    description: 'Timeless straight-fit denim.',
    price: 2799,
    category: 'Denim',
    brand: "Levi's",
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop'],
    stock: 40,
    rating: 4.5,
    isActive: true,
  },
  {
    name: 'Air Max 90',
    description: 'Iconic sneakers with responsive cushioning.',
    price: 7999,
    category: 'Sneakers',
    brand: 'Nike',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop'],
    stock: 25,
    rating: 4.7,
    isActive: true,
  },
  {
    name: 'Basic Tee',
    description: 'Soft everyday tee with a classic fit.',
    price: 599,
    category: 'T-Shirts',
    brand: 'H&M',
    images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&auto=format&fit=crop'],
    stock: 100,
    rating: 4.2,
    isActive: true,
  },
  {
    name: 'Zara Dress',
    description: 'Flattering midi dress for any occasion.',
    price: 1999,
    category: 'Dress',
    brand: 'Zara',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop'],
    stock: 30,
    rating: 4.3,
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

  let inserted = 0;
  for (const p of products) {
    const exists = await Product.findOne({ name: p.name });
    if (!exists) {
      await Product.create(p);
      inserted += 1;
      console.log(`Inserted: ${p.name}`);
    } else {
      console.log(`Skipped (exists): ${p.name}`);
    }
  }
  console.log(`Seeding complete. Inserted ${inserted} new product(s).`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Seed failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
