import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Source database (miashop) connection string
const MIASHOP_URI = process.env.MONGODB_URI; // Same cluster, different database
const ECOMMERCE_URI = process.env.MONGODB_URI; // Your e-commerce database

// Product Schema (matching your model)
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    category: { type: String, index: true },
    brand: { type: String },
    images: [{ type: String }],
    sizes: [{ type: String }],
    stock: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0, min: 0 },
    gender: { type: String, enum: ['Men', 'Women', 'Kids', 'Unisex'], default: 'Unisex', index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

async function main() {
  try {
    // Connect to miashop database
    console.log('Connecting to miashop database...');
    const miashopConnection = await mongoose.createConnection(
      MIASHOP_URI.replace(/\/[^/]*\?/, '/miashop?')
    ).asPromise();
    console.log('✓ Connected to miashop database');

    // Connect to e-commerce database
    console.log('Connecting to e-commerce database...');
    const ecommerceConnection = await mongoose.createConnection(
      ECOMMERCE_URI.replace(/\/[^/]*\?/, '/ecommerce?')
    ).asPromise();
    console.log('✓ Connected to e-commerce database');

    // Create models for both databases
    const MiashopProduct = miashopConnection.model('Product', productSchema);
    const EcommerceProduct = ecommerceConnection.model('Product', productSchema);

    // Get counts
    const miashopCount = await MiashopProduct.countDocuments();
    const ecommerceCountBefore = await EcommerceProduct.countDocuments();

    console.log(`\n📊 Database Status:`);
    console.log(`   Miashop products: ${miashopCount}`);
    console.log(`   E-commerce products (before): ${ecommerceCountBefore}`);

    // Fetch all products from miashop
    console.log(`\n🔄 Fetching products from miashop...`);
    const miashopProducts = await MiashopProduct.find({}).lean();
    console.log(`✓ Fetched ${miashopProducts.length} products`);

    // Migrate products
    console.log(`\n🚀 Migrating products to e-commerce database...`);
    let inserted = 0;
    let skipped = 0;
    let updated = 0;

    for (const product of miashopProducts) {
      try {
        // Remove MongoDB _id to let it generate a new one
        const { _id, __v, createdAt, updatedAt, ...productData } = product;

        // Check if product already exists by name
        const existingProduct = await EcommerceProduct.findOne({ name: productData.name });

        if (existingProduct) {
          // Update existing product
          await EcommerceProduct.updateOne(
            { _id: existingProduct._id },
            { $set: productData }
          );
          updated++;
          console.log(`↻ Updated: ${productData.name}`);
        } else {
          // Insert new product
          await EcommerceProduct.create(productData);
          inserted++;
          console.log(`✓ Inserted: ${productData.name}`);
        }
      } catch (err) {
        skipped++;
        console.log(`✗ Skipped: ${product.name} (Error: ${err.message})`);
      }
    }

    const ecommerceCountAfter = await EcommerceProduct.countDocuments();

    console.log(`\n✅ Migration Complete!`);
    console.log(`   New products inserted: ${inserted}`);
    console.log(`   Existing products updated: ${updated}`);
    console.log(`   Products skipped: ${skipped}`);
    console.log(`   E-commerce products (after): ${ecommerceCountAfter}`);

    // Close connections
    await miashopConnection.close();
    await ecommerceConnection.close();
    console.log(`\n✓ Database connections closed`);

  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

main().catch(console.error);
