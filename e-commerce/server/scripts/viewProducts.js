import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set in environment.');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Fetch existing products from the database
  const existingProducts = await Product.find({}).limit(50);

  console.log(`\nFound ${existingProducts.length} existing products in database:\n`);

  existingProducts.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   Brand: ${product.brand || 'N/A'}`);
    console.log(`   Category: ${product.category || 'N/A'}`);
    console.log(`   Price: ₹${product.price}`);
    console.log(`   Gender: ${product.gender || 'N/A'}`);
    console.log(`   Stock: ${product.stock}`);
    console.log('');
  });

  console.log('\n=== Product Statistics ===');
  const stats = await Product.aggregate([
    {
      $group: {
        _id: '$brand',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  console.log('\nProducts by Brand:');
  stats.forEach(stat => {
    console.log(`  ${stat._id || 'Unknown'}: ${stat.count} products`);
  });

  const totalCount = await Product.countDocuments();
  console.log(`\nTotal Products in Database: ${totalCount}`);

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Failed:', err);
  try { await mongoose.disconnect(); } catch { }
  process.exit(1);
});
