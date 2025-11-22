import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Product generation data
const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', "Levi's", 'Tommy Hilfiger', 'Calvin Klein', 'Gap', 'Uniqlo', 'Forever 21', 'Mango', 'Vero Moda', 'Only', 'Jack & Jones', 'Roadster', 'Wrogn', 'Being Human', 'US Polo', 'Arrow'];

const categories = {
  'T-Shirts': { price: [599, 1999], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  'Shirts': { price: [999, 2999], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'Jeans': { price: [1499, 4999], sizes: ['28', '30', '32', '34', '36', '38'] },
  'Denim': { price: [1999, 5999], sizes: ['28', '30', '32', '34', '36', '38'] },
  'Trousers': { price: [1299, 3999], sizes: ['28', '30', '32', '34', '36', '38'] },
  'Shorts': { price: [799, 2499], sizes: ['S', 'M', 'L', 'XL'] },
  'Hoodies': { price: [1499, 4999], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'Sweatshirts': { price: [1299, 3999], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'Jackets': { price: [2499, 7999], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'Sweaters': { price: [1499, 4499], sizes: ['S', 'M', 'L', 'XL'] },
  'Sneakers': { price: [2999, 14999], sizes: ['6', '7', '8', '9', '10', '11', '12'] },
  'Formal Shoes': { price: [2499, 8999], sizes: ['6', '7', '8', '9', '10', '11'] },
  'Sandals': { price: [799, 2999], sizes: ['6', '7', '8', '9', '10', '11'] },
  'Dress': { price: [1499, 5999], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  'Skirts': { price: [999, 2999], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  'Tops': { price: [699, 2499], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  'Blazers': { price: [2999, 7999], sizes: ['S', 'M', 'L', 'XL'] },
  'Activewear': { price: [1299, 3999], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  'Sportswear': { price: [1499, 4999], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'Polo': { price: [1299, 3499], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'Kurtas': { price: [999, 3999], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  'Ethnic Wear': { price: [1499, 5999], sizes: ['S', 'M', 'L', 'XL'] },
  'Innerwear': { price: [399, 1499], sizes: ['S', 'M', 'L', 'XL'] },
  'Socks': { price: [199, 699], sizes: ['Free Size'] },
  'Caps': { price: [399, 1299], sizes: ['Free Size'] },
  'Belts': { price: [499, 1999], sizes: ['Free Size'] },
  'Bags': { price: [1499, 5999], sizes: ['Free Size'] },
  'Backpacks': { price: [1999, 6999], sizes: ['Free Size'] },
  'Watches': { price: [1999, 9999], sizes: ['Free Size'] },
  'Sunglasses': { price: [799, 3999], sizes: ['Free Size'] },
};

const adjectives = ['Classic', 'Premium', 'Casual', 'Formal', 'Slim Fit', 'Regular Fit', 'Oversized', 'Vintage', 'Modern', 'Trendy', 'Stylish', 'Comfortable', 'Elegant', 'Sporty', 'Athletic', 'Urban', 'Street', 'Designer', 'Luxury', 'Essential', 'Basic', 'Signature', 'Original', 'Pro', 'Elite', 'Performance', 'Everyday', 'Weekend', 'Summer', 'Winter', 'All-Season'];

const colors = ['Black', 'White', 'Navy', 'Grey', 'Blue', 'Red', 'Green', 'Beige', 'Brown', 'Olive', 'Maroon', 'Charcoal', 'Khaki', 'Tan', 'Burgundy', 'Teal', 'Purple', 'Pink', 'Yellow', 'Orange'];

const descriptions = [
  'Perfect for everyday wear with superior comfort.',
  'Crafted from premium quality materials.',
  'Designed for style and durability.',
  'A wardrobe essential for any season.',
  'Contemporary design meets classic comfort.',
  'Versatile piece that pairs with anything.',
  'Made with attention to detail and quality.',
  'Elevate your style with this timeless piece.',
  'Comfortable fit with modern styling.',
  'Quality craftsmanship you can trust.',
  'Stand out with this statement piece.',
  'Effortlessly stylish and comfortable.',
  'Perfect blend of fashion and function.',
  'Designed for the modern individual.',
  'Premium quality at an affordable price.',
];

const images = [
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614252368970-1a96ce8a93cf?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop',
];

const genders = ['Men', 'Women', 'Unisex', 'Kids'];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProduct(index) {
  const category = random(Object.keys(categories));
  const categoryData = categories[category];
  const brand = random(brands);
  const adjective = random(adjectives);
  const color = random(colors);
  const gender = random(genders);

  const basePrice = randomRange(categoryData.price[0], categoryData.price[1]);
  const discount = randomRange(0, 50);
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
  const reviews = randomRange(10, 2000);
  const stock = randomRange(5, 150);

  // Generate sizes based on category
  let sizes = categoryData.sizes;
  if (sizes.length > 3 && Math.random() > 0.3) {
    // Randomly select 3-5 sizes
    const numSizes = randomRange(3, Math.min(5, sizes.length));
    sizes = [...sizes].sort(() => 0.5 - Math.random()).slice(0, numSizes);
  }

  const name = `${brand} ${adjective} ${color} ${category}`;
  const description = random(descriptions);
  const image = random(images);

  return {
    name,
    description,
    price: basePrice,
    discount,
    category,
    brand,
    images: [image],
    stock,
    rating: parseFloat(rating),
    reviews,
    gender,
    sizes,
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

  // Clear existing products
  await Product.deleteMany({});
  console.log('Cleared existing products');

  const NUM_PRODUCTS = 500;
  const products = [];

  console.log(`Generating ${NUM_PRODUCTS} products...`);
  for (let i = 0; i < NUM_PRODUCTS; i++) {
    products.push(generateProduct(i));
  }

  console.log('Inserting products into database...');
  let inserted = 0;
  const batchSize = 50;

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    await Product.insertMany(batch);
    inserted += batch.length;
    console.log(`Inserted ${inserted}/${NUM_PRODUCTS} products...`);
  }

  console.log(`✅ Seeding complete! Inserted ${inserted} products.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Seed failed:', err);
  try { await mongoose.disconnect(); } catch { }
  process.exit(1);
});
