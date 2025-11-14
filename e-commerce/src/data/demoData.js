// Demo data and constants for the e-commerce application

export const DEMO_USER = {
  email: 'demo@myshop.com',
  name: 'Demo User',
  mobile: '9876543210',
  gender: 'male',
  dateOfBirth: '1990-01-01',
  isLoggedIn: true,
  profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  joinedDate: '2024-01-15',
  totalOrders: 12,
  totalSpent: 15420,
  loyaltyPoints: 850
}

export const DEMO_PRODUCTS = [
  {
    id: 1,
    title: 'Classic White T-Shirt',
    brand: 'Nike',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.5,
    reviews: 2845,
    category: 'T-Shirts',
    gender: 'Men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Gray'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format&fit=crop'
    ],
    description: 'Premium cotton t-shirt with comfortable fit. Perfect for casual wear.',
    features: ['100% Cotton', 'Machine Washable', 'Comfortable Fit', 'Breathable Fabric'],
    inStock: true,
    fastDelivery: true
  },
  {
    id: 2,
    title: 'Summer Floral Dress',
    brand: 'Zara',
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.3,
    reviews: 1523,
    category: 'Dresses',
    gender: 'Women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral Print', 'Solid Blue', 'Pink'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&auto=format&fit=crop'
    ],
    description: 'Beautiful summer dress with vibrant floral print. Perfect for parties and casual outings.',
    features: ['Floral Print', 'Knee Length', 'Side Zipper', 'Lined'],
    inStock: true,
    fastDelivery: true
  },
  {
    id: 3,
    title: 'Denim Slim Fit Jeans',
    brand: "Levi's",
    price: 3199,
    originalPrice: 4599,
    discount: 30,
    rating: 4.4,
    reviews: 3421,
    category: 'Jeans',
    gender: 'Men',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Light Blue'],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop'
    ],
    description: 'Classic slim fit jeans made from premium denim. Comfortable and stylish.',
    features: ['Slim Fit', '98% Cotton 2% Elastane', '5-Pocket Design', 'Belt Loops'],
    inStock: true,
    fastDelivery: false
  },
  {
    id: 4,
    title: 'Running Sneakers',
    brand: 'Adidas',
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    rating: 4.6,
    reviews: 5234,
    category: 'Sneakers',
    gender: 'Unisex',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Blue', 'Red'],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&auto=format&fit=crop'
    ],
    description: 'High-performance running shoes with superior comfort and support.',
    features: ['Cushioned Sole', 'Breathable Upper', 'Lightweight', 'Non-slip Outsole'],
    inStock: true,
    fastDelivery: true
  },
  {
    id: 5,
    title: 'Elegant Handbag',
    brand: 'H&M',
    price: 1899,
    originalPrice: 2999,
    discount: 36,
    rating: 4.2,
    reviews: 876,
    category: 'Handbags',
    gender: 'Women',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Beige', 'Red'],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&auto=format&fit=crop'
    ],
    description: 'Stylish handbag perfect for work and casual occasions. Spacious and elegant.',
    features: ['Genuine Leather', 'Multiple Compartments', 'Adjustable Strap', 'Metal Hardware'],
    inStock: true,
    fastDelivery: true
  },
  {
    id: 6,
    title: 'Kids Colorful T-Shirt',
    brand: 'Puma',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.4,
    reviews: 432,
    category: 'T-Shirts',
    gender: 'Kids',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Rainbow', 'Blue', 'Pink', 'Green'],
    image: 'https://images.unsplash.com/photo-1519278013264-f2b64d2df1a9?w=400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1519278013264-f2b64d2df1a9?w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&auto=format&fit=crop'
    ],
    description: 'Fun and colorful t-shirt for kids. Made with soft, comfortable fabric.',
    features: ['100% Cotton', 'Colorful Design', 'Soft Fabric', 'Easy Care'],
    inStock: true,
    fastDelivery: true
  }
]

export const CATEGORIES = {
  Men: [
    'T-Shirts',
    'Shirts',
    'Jeans',
    'Trousers',
    'Shorts',
    'Jackets',
    'Sweaters',
    'Sneakers',
    'Formal Shoes',
    'Sandals',
    'Watches',
    'Belts',
    'Wallets'
  ],
  Women: [
    'Dresses',
    'Tops',
    'Jeans',
    'Skirts',
    'Sarees',
    'Kurtas',
    'Jackets',
    'Handbags',
    'Heels',
    'Flats',
    'Sneakers',
    'Jewelry',
    'Scarves'
  ],
  Kids: [
    'T-Shirts',
    'Dresses',
    'Shorts',
    'Jeans',
    'Jackets',
    'Sneakers',
    'Sandals',
    'School Bags',
    'Toys',
    'Hair Accessories'
  ]
}

export const BRANDS = [
  'Nike',
  'Adidas',
  'Puma',
  'Zara',
  'H&M',
  "Levi's",
  'Uniqlo',
  'Forever 21',
  'Mango',
  'Reebok',
  'Vans',
  'Converse'
]

export const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
  { label: 'Above ₹5000', min: 5000, max: Infinity }
]

export const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First', value: 'newest' },
  { label: 'Customer Rating', value: 'rating' },
  { label: 'Discount', value: 'discount' }
]

export const SHIPPING_INFO = {
  freeShippingThreshold: 999,
  standardDelivery: {
    days: '5-7',
    cost: 99
  },
  expressDelivery: {
    days: '2-3',
    cost: 199
  },
  premiumDelivery: {
    days: '1-2',
    cost: 299
  }
}

export const RETURN_POLICY = {
  returnWindow: 30,
  exchangeWindow: 30,
  conditions: [
    'Items must be in original condition',
    'Tags should be attached',
    'Original packaging required',
    'No damage or wear signs'
  ]
}

export const PAYMENT_METHODS = [
  'Credit Card',
  'Debit Card',
  'Net Banking',
  'UPI',
  'Wallets',
  'Cash on Delivery'
]

export const SIZE_GUIDES = {
  clothing: {
    men: {
      'XS': { chest: '34-36', waist: '28-30' },
      'S': { chest: '36-38', waist: '30-32' },
      'M': { chest: '38-40', waist: '32-34' },
      'L': { chest: '40-42', waist: '34-36' },
      'XL': { chest: '42-44', waist: '36-38' },
      'XXL': { chest: '44-46', waist: '38-40' }
    },
    women: {
      'XS': { bust: '30-32', waist: '24-26', hips: '34-36' },
      'S': { bust: '32-34', waist: '26-28', hips: '36-38' },
      'M': { bust: '34-36', waist: '28-30', hips: '38-40' },
      'L': { bust: '36-38', waist: '30-32', hips: '40-42' },
      'XL': { bust: '38-40', waist: '32-34', hips: '42-44' }
    }
  },
  footwear: {
    'UK 6': 'US 7 | EU 39',
    'UK 7': 'US 8 | EU 40',
    'UK 8': 'US 9 | EU 41',
    'UK 9': 'US 10 | EU 42',
    'UK 10': 'US 11 | EU 43',
    'UK 11': 'US 12 | EU 44'
  }
}

export const OFFERS = [
  {
    id: 1,
    title: 'FLAT 50% OFF',
    description: 'On orders above ₹1999',
    code: 'FLAT50',
    minOrder: 1999,
    discount: 50,
    type: 'percentage',
    validTill: '2024-12-31'
  },
  {
    id: 2,
    title: 'BUY 2 GET 1 FREE',
    description: 'On selected items',
    code: 'BUY2GET1',
    minOrder: 0,
    type: 'bogo',
    validTill: '2024-12-31'
  },
  {
    id: 3,
    title: 'FIRST ORDER',
    description: 'Get ₹200 off on first order',
    code: 'FIRST200',
    minOrder: 999,
    discount: 200,
    type: 'fixed',
    validTill: '2024-12-31'
  }
]

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/myshop',
  instagram: 'https://instagram.com/myshop',
  twitter: 'https://twitter.com/myshop',
  youtube: 'https://youtube.com/myshop'
}

export const CONTACT_INFO = {
  phone: '+91 1800-123-4567',
  email: 'support@myshop.com',
  address: '123 Fashion Street, Mumbai, Maharashtra 400001',
  workingHours: 'Mon-Sat: 10:00 AM - 8:00 PM'
}

// Mock API responses for demonstration
export const API_RESPONSES = {
  loginSuccess: {
    status: 'success',
    message: 'Login successful',
    user: DEMO_USER
  },
  signupSuccess: {
    status: 'success',
    message: 'Account created successfully',
    user: DEMO_USER
  },
  orderPlaced: {
    status: 'success',
    message: 'Order placed successfully',
    orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }
}
