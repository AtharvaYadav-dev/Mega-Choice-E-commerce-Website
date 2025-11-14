import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function loadFrontendProducts() {
  const filePath = path.resolve(process.cwd(), '..', 'src', 'data', 'products.js');
  let code = fs.readFileSync(filePath, 'utf8');
  // Expose arrays on globalThis so we can read them after eval
  code = code.replace(/const\s+baseProducts\s*=\s*/,'globalThis.baseProducts = ');
  code = code.replace(/const\s+extraProducts\s*=\s*/,'globalThis.extraProducts = ');
  // Remove any ES module exports to keep eval simple
  code = code.replace(/export\s+default\s+[^;]+;?/g, '');
  const context = {};
  vm.createContext(context);
  vm.runInContext(code, context, { filename: 'products.js' });
  const base = Array.isArray(context.baseProducts) ? context.baseProducts : [];
  const extra = Array.isArray(context.extraProducts) ? context.extraProducts : [];
  return [...base, ...extra];
}

function mapToModel(p) {
  return {
    name: p.title,
    description: '',
    price: Number(p.price) || 0,
    category: p.category || '',
    brand: p.brand || '',
    images: p.image ? [p.image] : [],
    stock: 100,
    rating: 4.2,
    isActive: true,
  };
}

async function main() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set in environment.');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const srcProducts = await loadFrontendProducts();
  console.log(`Loaded ${srcProducts.length} products from frontend file.`);

  let inserted = 0;
  let updated = 0;
  for (const raw of srcProducts) {
    if (!raw || !raw.title) continue;
    const doc = mapToModel(raw);
    const existing = await Product.findOne({ name: doc.name });
    if (!existing) {
      await Product.create(doc);
      inserted += 1;
      if (inserted % 50 === 0) console.log(`Inserted ${inserted}...`);
    } else {
      // Update core fields if changed
      existing.price = doc.price;
      existing.category = doc.category;
      existing.brand = doc.brand;
      if (doc.images?.length) existing.images = doc.images;
      existing.isActive = true;
      await existing.save();
      updated += 1;
    }
  }

  console.log(`Done. Inserted ${inserted}, Updated ${updated}.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Migration failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
