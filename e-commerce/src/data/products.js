// Centralized product data with extensive variety and working image URLs

const baseProducts = [
  // CLOTHING SECTION

  // Nike Products
  {
    id: 101,
    title: "Air Tee",
    price: 999,
    brand: "Nike",
    discount: 20,
    sizes: ["S", "M", "L"],
    gender: "Men",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop",
  },
  {
    id: 102,
    title: "Originals Hoodie",
    price: 2499,
    brand: "Nike",
    discount: 35,
    sizes: ["M", "L", "XL"],
    gender: "Men",
    category: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop",
  },
  {
    id: 103,
    title: "Pro Training Shorts",
    price: 1799,
    brand: "Nike",
    discount: 25,
    sizes: ["S", "M", "L", "XL"],
    gender: "Men",
    category: "Shorts",
    image:
      "https://images.unsplash.com/photo-1549721759-42b7899b8d0a?w=500&auto=format&fit=crop",
  },
  {
    id: 104,
    title: "Air Max 90",
    price: 7999,
    brand: "Nike",
    discount: 10,
    sizes: ["L", "XL"],
    gender: "Unisex",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
  },
  {
    id: 105,
    title: "Tech Fleece Joggers",
    price: 4999,
    brand: "Nike",
    discount: 30,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Joggers",
    image:
      "https://images.unsplash.com/photo-1607519782559-0f46c6b7d287?w=500&auto=format&fit=crop",
  },
  {
    id: 106,
    title: "Dri-FIT Tank",
    price: 1199,
    brand: "Nike",
    discount: 15,
    sizes: ["S", "M", "L"],
    gender: "Women",
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1596707327318-78b02221b6a7?w=500&auto=format&fit=crop",
  },
  {
    id: 107,
    title: "Kids Revolution",
    price: 1899,
    brand: "Nike",
    discount: 10,
    sizes: ["S", "M"],
    gender: "Kids",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop",
  },
  {
    id: 108,
    title: "React Running Shoes",
    price: 8999,
    brand: "Nike",
    discount: 20,
    sizes: ["M", "L", "XL"],
    gender: "Unisex",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop",
  },

  // Adidas Products
  {
    id: 109,
    title: "Adilette Slides",
    price: 1499,
    brand: "Adidas",
    discount: 20,
    sizes: ["L", "XL"],
    gender: "Unisex",
    category: "Sandals",
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=500&auto=format&fit=crop",
  },
  {
    id: 110,
    title: "Trefoil T-Shirt",
    price: 1299,
    brand: "Adidas",
    discount: 10,
    sizes: ["S", "M", "L"],
    gender: "Unisex",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&auto=format&fit=crop",
  },
  {
    id: 111,
    title: "Superstar Shoes",
    price: 6999,
    brand: "Adidas",
    discount: 5,
    sizes: ["M", "L"],
    gender: "Women",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&auto=format&fit=crop",
  },
  {
    id: 112,
    title: "Z.N.E. Pants",
    price: 3999,
    brand: "Adidas",
    discount: 25,
    sizes: ["M", "L", "XL"],
    gender: "Men",
    category: "Pants",
    image:
      "https://images.unsplash.com/photo-1560948589-32215c2d1b7e?w=500&auto=format&fit=crop",
  },
  {
    id: 113,
    title: "Kids Logo Tee",
    price: 799,
    brand: "Adidas",
    discount: 15,
    sizes: ["S"],
    gender: "Kids",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop",
  },
  {
    id: 114,
    title: "Gym Leggings",
    price: 2599,
    brand: "Adidas",
    discount: 30,
    sizes: ["S", "M", "L"],
    gender: "Women",
    category: "Sportswear",
    image:
      "https://images.unsplash.com/photo-1506629905607-d3ac882b7b43?w=500&auto=format&fit=crop",
  },

  // Levi's Products
  {
    id: 115,
    title: "Classic Denim",
    price: 2799,
    brand: "Levi's",
    discount: 15,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Denim",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop",
  },
  {
    id: 116,
    title: "501 Original Fit",
    price: 4999,
    brand: "Levi's",
    discount: 10,
    sizes: ["M", "L", "XL"],
    gender: "Men",
    category: "Denim",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
  },
  {
    id: 117,
    title: "Trucker Jacket",
    price: 5499,
    brand: "Levi's",
    discount: 15,
    sizes: ["S", "M", "L"],
    gender: "Unisex",
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500&auto=format&fit=crop",
  },
  {
    id: 118,
    title: "High-Rise Skinny",
    price: 3999,
    brand: "Levi's",
    discount: 30,
    sizes: ["S", "M"],
    gender: "Women",
    category: "Denim",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop",
  },
  {
    id: 119,
    title: "Kids Denim Shirt",
    price: 1699,
    brand: "Levi's",
    discount: 20,
    sizes: ["S", "M"],
    gender: "Kids",
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop",
  },

  // H&M Products
  {
    id: 120,
    title: "Basic Tee",
    price: 599,
    brand: "H&M",
    discount: 30,
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop",
  },
  {
    id: 121,
    title: "Slim Fit Chinos",
    price: 1899,
    brand: "H&M",
    discount: 20,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Pants",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop",
  },
  {
    id: 122,
    title: "Ribbed Knit Sweater",
    price: 1499,
    brand: "H&M",
    discount: 40,
    sizes: ["S", "M", "L"],
    gender: "Women",
    category: "Sweaters",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop",
  },
  {
    id: 123,
    title: "Basic Tank Top",
    price: 399,
    brand: "H&M",
    discount: 10,
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&auto=format&fit=crop",
  },
  {
    id: 124,
    title: "Denim Jacket",
    price: 3499,
    brand: "H&M",
    discount: 25,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop",
  },

  // Zara Products
  {
    id: 125,
    title: "Zara Dress",
    price: 1999,
    brand: "Zara",
    discount: 25,
    sizes: ["S", "M", "L"],
    gender: "Women",
    category: "Dress",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format&fit=crop",
  },
  {
    id: 126,
    title: "Slim Fit Blazer",
    price: 4999,
    brand: "Zara",
    discount: 10,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Blazers",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
  },
  {
    id: 127,
    title: "Floral Midi Skirt",
    price: 2199,
    brand: "Zara",
    discount: 35,
    sizes: ["S", "M"],
    gender: "Women",
    category: "Skirts",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format&fit=crop",
  },
  {
    id: 128,
    title: "Linen Shirt",
    price: 1999,
    brand: "Zara",
    discount: 20,
    sizes: ["M", "L", "XL"],
    gender: "Unisex",
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop",
  },

  // Puma Products
  {
    id: 129,
    title: "Runner Tee",
    price: 899,
    brand: "Puma",
    discount: 10,
    sizes: ["S", "M"],
    gender: "Men",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=500&auto=format&fit=crop",
  },
  {
    id: 130,
    title: "Puma Suede Classic",
    price: 4599,
    brand: "Puma",
    discount: 15,
    sizes: ["M", "L"],
    gender: "Unisex",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1579633215233-a447335d5a71?w=500&auto=format&fit=crop",
  },

  // ELECTRONICS SECTION
  {
    id: 201,
    title: "iPhone 15 Pro",
    price: 99999,
    brand: "Apple",
    discount: 5,
    sizes: ["128GB", "256GB", "512GB"],
    gender: "Unisex",
    category: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop",
  },
  {
    id: 202,
    title: "MacBook Air M2",
    price: 119999,
    brand: "Apple",
    discount: 10,
    sizes: ["256GB", "512GB"],
    gender: "Unisex",
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop",
  },
  {
    id: 203,
    title: "AirPods Pro",
    price: 24999,
    brand: "Apple",
    discount: 15,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&auto=format&fit=crop",
  },
  {
    id: 204,
    title: "iPad Air",
    price: 59999,
    brand: "Apple",
    discount: 8,
    sizes: ["64GB", "256GB"],
    gender: "Unisex",
    category: "Tablets",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
  },

  {
    id: 205,
    title: "Galaxy S24 Ultra",
    price: 89999,
    brand: "Samsung",
    discount: 12,
    sizes: ["256GB", "512GB"],
    gender: "Unisex",
    category: "Smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop",
  },
  {
    id: 206,
    title: "Galaxy Tab S9",
    price: 54999,
    brand: "Samsung",
    discount: 20,
    sizes: ["128GB", "256GB"],
    gender: "Unisex",
    category: "Tablets",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
  },
  {
    id: 207,
    title: "Galaxy Buds Pro",
    price: 19999,
    brand: "Samsung",
    discount: 25,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop",
  },

  {
    id: 208,
    title: "Surface Laptop 5",
    price: 89999,
    brand: "Microsoft",
    discount: 15,
    sizes: ["256GB", "512GB"],
    gender: "Unisex",
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop",
  },
  {
    id: 209,
    title: "Xbox Series X",
    price: 49999,
    brand: "Microsoft",
    discount: 10,
    sizes: ["1TB"],
    gender: "Unisex",
    category: "Gaming",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop",
  },

  {
    id: 210,
    title: "PlayStation 5",
    price: 49999,
    brand: "Sony",
    discount: 8,
    sizes: ["825GB"],
    gender: "Unisex",
    category: "Gaming",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop",
  },
  {
    id: 211,
    title: "WH-1000XM5 Headphones",
    price: 34999,
    brand: "Sony",
    discount: 18,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&auto=format&fit=crop",
  },

  // HOME & LIVING SECTION
  {
    id: 301,
    title: 'Smart LED TV 55"',
    price: 45999,
    brand: "Samsung",
    discount: 20,
    sizes: ['55"', '65"', '75"'],
    gender: "Unisex",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop",
  },
  {
    id: 302,
    title: "Coffee Maker",
    price: 8999,
    brand: "Philips",
    discount: 15,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop",
  },
  {
    id: 303,
    title: "Air Fryer",
    price: 6999,
    brand: "Philips",
    discount: 25,
    sizes: ["3L", "5L"],
    gender: "Unisex",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1585515656956-31ea9ad25d8a?w=500&auto=format&fit=crop",
  },
  {
    id: 304,
    title: "Robot Vacuum",
    price: 24999,
    brand: "iRobot",
    discount: 30,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
  },
  {
    id: 305,
    title: "Smart Speaker",
    price: 7999,
    brand: "Amazon",
    discount: 20,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&auto=format&fit=crop",
  },

  // Furniture
  {
    id: 306,
    title: "Office Chair",
    price: 12999,
    brand: "IKEA",
    discount: 15,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop",
  },
  {
    id: 307,
    title: "Standing Desk",
    price: 18999,
    brand: "IKEA",
    discount: 20,
    sizes: ["120cm", "140cm"],
    gender: "Unisex",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop",
  },
  {
    id: 308,
    title: "Sofa 3-Seater",
    price: 45999,
    brand: "IKEA",
    discount: 25,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop",
  },
  {
    id: 309,
    title: "Bed Frame King",
    price: 25999,
    brand: "IKEA",
    discount: 10,
    sizes: ["King", "Queen"],
    gender: "Unisex",
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&auto=format&fit=crop",
  },

  // BEAUTY & PERSONAL CARE
  {
    id: 401,
    title: "Skincare Set",
    price: 2999,
    brand: "The Ordinary",
    discount: 20,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Skincare",
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop",
  },
  {
    id: 402,
    title: "Foundation",
    price: 1899,
    brand: "Maybelline",
    discount: 15,
    sizes: ["Light", "Medium", "Dark"],
    gender: "Women",
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
  },
  {
    id: 403,
    title: "Lipstick Set",
    price: 1299,
    brand: "MAC",
    discount: 25,
    sizes: ["Standard"],
    gender: "Women",
    category: "Makeup",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop",
  },
  {
    id: 404,
    title: "Hair Dryer",
    price: 4999,
    brand: "Dyson",
    discount: 10,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&auto=format&fit=crop",
  },
  {
    id: 405,
    title: "Electric Toothbrush",
    price: 3999,
    brand: "Oral-B",
    discount: 30,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Oral Care",
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop",
  },

  // SPORTS & FITNESS
  {
    id: 501,
    title: "Yoga Mat",
    price: 1999,
    brand: "Reebok",
    discount: 20,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop",
  },
  {
    id: 502,
    title: "Dumbbells Set",
    price: 4999,
    brand: "Nike",
    discount: 15,
    sizes: ["5kg", "10kg", "15kg"],
    gender: "Unisex",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
  },
  {
    id: 503,
    title: "Fitness Tracker",
    price: 8999,
    brand: "Fitbit",
    discount: 25,
    sizes: ["S", "M", "L"],
    gender: "Unisex",
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop",
  },
  {
    id: 504,
    title: "Protein Shaker",
    price: 799,
    brand: "Optimum Nutrition",
    discount: 10,
    sizes: ["500ml", "750ml"],
    gender: "Unisex",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop",
  },
  {
    id: 505,
    title: "Resistance Bands",
    price: 1299,
    brand: "Reebok",
    discount: 30,
    sizes: ["Light", "Medium", "Heavy"],
    gender: "Unisex",
    category: "Fitness",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
  },

  // BOOKS & EDUCATION
  {
    id: 601,
    title: "Programming Bible",
    price: 1499,
    brand: "O'Reilly",
    discount: 20,
    sizes: ["Paperback", "Hardcover"],
    gender: "Unisex",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
  },
  {
    id: 602,
    title: "Design Patterns",
    price: 2199,
    brand: "Addison-Wesley",
    discount: 15,
    sizes: ["Paperback"],
    gender: "Unisex",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&auto=format&fit=crop",
  },
  {
    id: 603,
    title: "Digital Marketing Guide",
    price: 1799,
    brand: "Wiley",
    discount: 25,
    sizes: ["Paperback", "E-book"],
    gender: "Unisex",
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
  },
  {
    id: 604,
    title: "Notebook Set",
    price: 599,
    brand: "Moleskine",
    discount: 10,
    sizes: ["A4", "A5"],
    gender: "Unisex",
    category: "Stationery",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop",
  },

  // ACCESSORIES & BAGS
  {
    id: 701,
    title: "Leather Wallet",
    price: 2999,
    brand: "Tommy Hilfiger",
    discount: 20,
    sizes: ["Standard"],
    gender: "Men",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
  },
  {
    id: 702,
    title: "Handbag",
    price: 4999,
    brand: "Michael Kors",
    discount: 30,
    sizes: ["Medium", "Large"],
    gender: "Women",
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop",
  },
  {
    id: 703,
    title: "Backpack",
    price: 3499,
    brand: "Herschel",
    discount: 25,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
  },
  {
    id: 704,
    title: "Sunglasses",
    price: 1999,
    brand: "Ray-Ban",
    discount: 15,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=500&auto=format&fit=crop",
  },
  {
    id: 705,
    title: "Watch",
    price: 12999,
    brand: "Fossil",
    discount: 20,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Watches",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop",
  },

  // AUTOMOTIVE
  {
    id: 801,
    title: "Car Phone Holder",
    price: 899,
    brand: "Generic",
    discount: 15,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Automotive",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&auto=format&fit=crop",
  },
  {
    id: 802,
    title: "Car Charger",
    price: 599,
    brand: "Anker",
    discount: 10,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Automotive",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop",
  },
  {
    id: 803,
    title: "Dash Cam",
    price: 7999,
    brand: "Garmin",
    discount: 25,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Automotive",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&auto=format&fit=crop",
  },

  // FOOD & BEVERAGES
  {
    id: 901,
    title: "Organic Coffee Beans",
    price: 1299,
    brand: "Blue Mountain",
    discount: 15,
    sizes: ["250g", "500g", "1kg"],
    gender: "Unisex",
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&auto=format&fit=crop",
  },
  {
    id: 902,
    title: "Green Tea Set",
    price: 899,
    brand: "Twinings",
    discount: 20,
    sizes: ["Standard"],
    gender: "Unisex",
    category: "Beverages",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop",
  },
  {
    id: 903,
    title: "Protein Powder",
    price: 3499,
    brand: "Optimum Nutrition",
    discount: 10,
    sizes: ["1kg", "2kg"],
    gender: "Unisex",
    category: "Supplements",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop",
  },
  {
    id: 904,
    title: "Multivitamins",
    price: 1499,
    brand: "Centrum",
    discount: 25,
    sizes: ["60 tablets", "120 tablets"],
    gender: "Unisex",
    category: "Supplements",
    image:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format&fit=crop",
  },

  // TOYS & GAMES
  {
    id: 1001,
    title: "LEGO Architecture Set",
    price: 8999,
    brand: "LEGO",
    discount: 20,
    sizes: ["Standard"],
    gender: "Kids",
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop",
  },
  {
    id: 1002,
    title: "Board Game Collection",
    price: 2999,
    brand: "Hasbro",
    discount: 15,
    sizes: ["Standard"],
    gender: "Kids",
    category: "Games",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&auto=format&fit=crop",
  },
  {
    id: 1003,
    title: "Remote Control Car",
    price: 4999,
    brand: "Hot Wheels",
    discount: 30,
    sizes: ["Standard"],
    gender: "Kids",
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop",
  },
  {
    id: 1004,
    title: "Educational Tablet",
    price: 12999,
    brand: "LeapFrog",
    discount: 25,
    sizes: ["Standard"],
    gender: "Kids",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop",
  },
  {
    id: 1005,
    title: "Kids Art Set",
    price: 1999,
    brand: "Crayola",
    discount: 20,
    sizes: ["Standard"],
    gender: "Kids",
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&auto=format&fit=crop",
  },

  // MORE CLOTHING BRANDS
  {
    id: 1101,
    title: "Iconic Stripe Polo",
    price: 3499,
    brand: "Tommy Hilfiger",
    discount: 15,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Polos",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=500&auto=format&fit=crop",
  },
  {
    id: 1102,
    title: "Flag Hoodie",
    price: 4999,
    brand: "Tommy Hilfiger",
    discount: 20,
    sizes: ["S", "M", "L"],
    gender: "Unisex",
    category: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop",
  },
  {
    id: 1103,
    title: "Denim Skirt",
    price: 2999,
    brand: "Tommy Hilfiger",
    discount: 30,
    sizes: ["S", "M"],
    gender: "Women",
    category: "Denim",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format&fit=crop",
  },

  // GAP Products
  {
    id: 1104,
    title: "Arch Logo Sweatshirt",
    price: 2699,
    brand: "GAP",
    discount: 25,
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    category: "Sweatshirts",
    image:
      "https://images.unsplash.com/photo-1520975922071-1d89f72a1a5e?w=500&auto=format&fit=crop",
  },
  {
    id: 1105,
    title: "Straight Fit Jeans",
    price: 3199,
    brand: "GAP",
    discount: 10,
    sizes: ["L", "XL"],
    gender: "Men",
    category: "Denim",
    image:
      "https://images.unsplash.com/photo-1541099641775-658a5c9a72d7?w=500&auto=format&fit=crop",
  },
  {
    id: 1106,
    title: "Maternity Tee",
    price: 1099,
    brand: "GAP",
    discount: 50,
    sizes: ["M", "L"],
    gender: "Women",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1520975892202-99f2d85d5a53?w=500&auto=format&fit=crop",
  },
  {
    id: 1107,
    title: "Kids Logo Hoodie",
    price: 1599,
    brand: "GAP",
    discount: 15,
    sizes: ["S", "M"],
    gender: "Kids",
    category: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop",
  },

  // Under Armour Products
  {
    id: 1108,
    title: "HeatGear Compression",
    price: 2299,
    brand: "Under Armour",
    discount: 20,
    sizes: ["S", "M"],
    gender: "Men",
    category: "Sportswear",
    image:
      "https://images.unsplash.com/photo-1549721759-42b7899b8d0a?w=500&auto=format&fit=crop",
  },
  {
    id: 1109,
    title: "Rival Fleece Joggers",
    price: 2899,
    brand: "Under Armour",
    discount: 10,
    sizes: ["M", "L"],
    gender: "Women",
    category: "Joggers",
    image:
      "https://images.unsplash.com/photo-1560948589-32215c2d1b7e?w=500&auto=format&fit=crop",
  },
  {
    id: 1110,
    title: "Gym Bag",
    price: 1999,
    brand: "Under Armour",
    discount: 5,
    sizes: ["M"],
    gender: "Unisex",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
  },

  // Luxury Brands
  {
    id: 1201,
    title: "Monogram Scarf",
    price: 15000,
    brand: "Louis Vuitton",
    discount: 0,
    sizes: ["M"],
    gender: "Unisex",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1579633215233-a447335d5a71?w=500&auto=format&fit=crop",
  },
  {
    id: 1202,
    title: "Alma BB Handbag",
    price: 95000,
    brand: "Louis Vuitton",
    discount: 0,
    sizes: ["S"],
    gender: "Women",
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop",
  },

  // Outdoor & Adventure
  {
    id: 1203,
    title: "Better Sweater Fleece",
    price: 8999,
    brand: "Patagonia",
    discount: 10,
    sizes: ["S", "M", "L", "XL"],
    gender: "Unisex",
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500&auto=format&fit=crop",
  },
  {
    id: 1204,
    title: "Capilene T-Shirt",
    price: 2499,
    brand: "Patagonia",
    discount: 5,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Sportswear",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop",
  },

  // Fashion Forward Brands
  {
    id: 1301,
    title: "Puff Sleeve Dress",
    price: 2999,
    brand: "ASOS Design",
    discount: 40,
    sizes: ["S", "M", "L"],
    gender: "Women",
    category: "Dress",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format&fit=crop",
  },
  {
    id: 1302,
    title: "Oversized Suit",
    price: 7999,
    brand: "ASOS Design",
    discount: 30,
    sizes: ["M", "L", "XL"],
    gender: "Men",
    category: "Suits",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
  },

  // Forever 21
  {
    id: 1303,
    title: "Crop Top",
    price: 799,
    brand: "Forever 21",
    discount: 20,
    sizes: ["S", "M"],
    gender: "Women",
    category: "Tops",
    image:
      "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&auto=format&fit=crop",
  },
  {
    id: 1304,
    title: "Cycling Shorts",
    price: 999,
    brand: "Forever 21",
    discount: 10,
    sizes: ["S", "M", "L"],
    gender: "Women",
    category: "Shorts",
    image:
      "https://images.unsplash.com/photo-1549721759-42b7899b8d0a?w=500&auto=format&fit=crop",
  },

  // Athletic Footwear
  {
    id: 1401,
    title: "574 Core Sneakers",
    price: 6999,
    brand: "New Balance",
    discount: 15,
    sizes: ["L", "XL"],
    gender: "Unisex",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&auto=format&fit=crop",
  },
  {
    id: 1402,
    title: "Running Jacket",
    price: 4199,
    brand: "New Balance",
    discount: 25,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500&auto=format&fit=crop",
  },

  // Fila
  {
    id: 1403,
    title: "Disruptor Shoes",
    price: 3999,
    brand: "Fila",
    discount: 30,
    sizes: ["S", "M"],
    gender: "Women",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&auto=format&fit=crop",
  },
  {
    id: 1404,
    title: "Velour Tracksuit",
    price: 5499,
    brand: "Fila",
    discount: 45,
    sizes: ["M", "L"],
    gender: "Unisex",
    category: "Tracksuits",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop",
  },

  // Casual Brands
  {
    id: 1501,
    title: "Flannel Shirt",
    price: 1699,
    brand: "Old Navy",
    discount: 20,
    sizes: ["M", "L", "XL"],
    gender: "Men",
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop",
  },
  {
    id: 1502,
    title: "Sundress",
    price: 1799,
    brand: "Old Navy",
    discount: 30,
    sizes: ["S", "M"],
    gender: "Women",
    category: "Dress",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format&fit=crop",
  },
  {
    id: 1503,
    title: "Kids Cargo Shorts",
    price: 899,
    brand: "Old Navy",
    discount: 10,
    sizes: ["S", "M"],
    gender: "Kids",
    category: "Shorts",
    image:
      "https://images.unsplash.com/photo-1549721759-42b7899b8d0a?w=500&auto=format&fit=crop",
  },

  // Additional Variety
  {
    id: 1601,
    title: "Slim Fit Tee",
    price: 1199,
    brand: "Nike",
    discount: 10,
    sizes: ["M", "L"],
    gender: "Men",
    category: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop",
  },
  {
    id: 1602,
    title: "511 Slim Fit",
    price: 3899,
    brand: "Levi's",
    discount: 25,
    sizes: ["L", "XL"],
    gender: "Men",
    category: "Denim",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
  },
  {
    id: 1603,
    title: "Running Shoes",
    price: 5999,
    brand: "Puma",
    discount: 10,
    sizes: ["M", "L"],
    gender: "Unisex",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop",
  },
  {
    id: 1604,
    title: "Knit Cardigan",
    price: 2299,
    brand: "H&M",
    discount: 35,
    sizes: ["S", "M", "L"],
    gender: "Women",
    category: "Sweaters",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop",
  },
  {
    id: 1605,
    title: "Pencil Skirt",
    price: 1899,
    brand: "Zara",
    discount: 50,
    sizes: ["S", "M"],
    gender: "Women",
    category: "Skirts",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format&fit=crop",
  },
  {
    id: 1606,
    title: "Canvas Backpack",
    price: 1999,
    brand: "GAP",
    discount: 15,
    sizes: ["M"],
    gender: "Unisex",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop",
  },
  {
    id: 1607,
    title: "Woven Shorts",
    price: 1599,
    brand: "Under Armour",
    discount: 20,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Shorts",
    image:
      "https://images.unsplash.com/photo-1549721759-42b7899b8d0a?w=500&auto=format&fit=crop",
  },

  // Final additions
  {
    id: 1701,
    title: "Classic Blazer",
    price: 6999,
    brand: "Tommy Hilfiger",
    discount: 10,
    sizes: ["L", "XL"],
    gender: "Men",
    category: "Blazers",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
  },
  {
    id: 1702,
    title: "Kids Winter Boots",
    price: 2999,
    brand: "New Balance",
    discount: 20,
    sizes: ["S", "M"],
    gender: "Kids",
    category: "Boots",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop",
  },
  {
    id: 1703,
    title: "High Top Sneakers",
    price: 7499,
    brand: "Nike",
    discount: 15,
    sizes: ["M", "L"],
    gender: "Unisex",
    category: "Sneakers",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
  },
  {
    id: 1704,
    title: "Tartan Shirt",
    price: 1999,
    brand: "H&M",
    discount: 10,
    sizes: ["S", "M", "L"],
    gender: "Men",
    category: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop",
  },
  {
    id: 1705,
    title: "Striped Dress",
    price: 2399,
    brand: "Zara",
    discount: 25,
    sizes: ["M", "L"],
    gender: "Women",
    category: "Dress",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format&fit=crop",
  },
  {
    id: 1706,
    title: "Kids Sweatshirt",
    price: 1399,
    brand: "GAP",
    discount: 30,
    sizes: ["S"],
    gender: "Kids",
    category: "Sweatshirts",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop",
  },
  {
    id: 1707,
    title: "Classic Leather Belt",
    price: 1499,
    brand: "Levi's",
    discount: 5,
    sizes: ["M", "L"],
    gender: "Men",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1579633215233-a447335d5a71?w=500&auto=format&fit=crop",
  },
  {
    id: 1708,
    title: "Track Jacket",
    price: 3299,
    brand: "Puma",
    discount: 40,
    sizes: ["S", "M"],
    gender: "Unisex",
    category: "Jackets",
    image:
      "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500&auto=format&fit=crop",
  },
  {
    id: 1709,
    title: "Mini Dress",
    price: 1699,
    brand: "Forever 21",
    discount: 35,
    sizes: ["S"],
    gender: "Women",
    category: "Dress",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&auto=format&fit=crop",
  },
  {
    id: 1710,
    title: "Outdoor Vest",
    price: 7999,
    brand: "Patagonia",
    discount: 0,
    sizes: ["M", "L", "XL"],
    gender: "Men",
    category: "Vests",
    image:
      "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500&auto=format&fit=crop",
  },
];

// Generate additional products to reach a large dataset
const extraProducts = Array.from({ length: 100 }, (_, i) => ({
  id: 2000 + i,
  title: `Premium Product ${i + 1}`,
  price: Math.floor(Math.random() * 15000) + 500,
  brand: ["Nike", "Adidas", "H&M", "Zara", "Puma"][
    Math.floor(Math.random() * 5)
  ],
  discount: Math.floor(Math.random() * 50),
  sizes: [
    ["S", "M"],
    ["M", "L"],
    ["S", "M", "L"],
    ["M", "L", "XL"],
    ["S", "M", "L", "XL"],
  ][Math.floor(Math.random() * 5)],
  gender: ["Men", "Women", "Unisex", "Kids"][Math.floor(Math.random() * 4)],
  category: [
    "T-Shirts",
    "Shirts",
    "Pants",
    "Shorts",
    "Sneakers",
    "Tops",
    "Dresses",
  ][Math.floor(Math.random() * 7)],
  image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 200000000)}?w=500&auto=format&fit=crop`,
}));

const products = [...baseProducts, ...extraProducts];

export default products;
