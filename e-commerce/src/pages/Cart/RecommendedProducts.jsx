import React, { useState, useEffect } from "react";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";

// Mock recommended products data
const mockRecommendedProducts = [
  {
    id: "rec_1",
    title: "Cotton Blend Casual Shirt",
    price: 899,
    originalPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
    rating: 4.2,
    reviews: 156,
    discount: 40,
  },
  {
    id: "rec_2",
    title: "Premium Denim Jeans",
    price: 1299,
    originalPrice: 2199,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
    rating: 4.5,
    reviews: 234,
    discount: 41,
  },
  {
    id: "rec_3",
    title: "Leather Casual Sneakers",
    price: 1799,
    originalPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
    rating: 4.3,
    reviews: 89,
    discount: 40,
  },
  {
    id: "rec_4",
    title: "Cotton T-Shirt Pack of 3",
    price: 699,
    originalPrice: 1199,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
    rating: 4.1,
    reviews: 178,
    discount: 42,
  },
];

const RecommendedProducts = ({ onAddToCart }) => {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setRecommendedItems(mockRecommendedProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recommended for you
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Recommended for you
        </h3>
        <button className="text-sm text-rose-600 hover:text-rose-700 font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendedItems.map((item) => (
          <div key={item.id} className="group relative">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Discount Badge */}
              {item.discount && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {item.discount}% OFF
                </div>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
                <FaHeart
                  className="text-gray-400 hover:text-red-500"
                  size={12}
                />
              </button>

              {/* Quick Add to Cart */}
              <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-rose-600 text-white py-2 px-3 rounded-md text-sm font-medium hover:bg-rose-700 transition-colors flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-1" size={12} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                {item.title}
              </h4>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" size={12} />
                  <span className="text-xs text-gray-600 ml-1">
                    {item.rating} ({item.reviews})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">
                  ₹{item.price.toLocaleString()}
                </span>
                {item.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cross-sell Banner */}
      <div className="mt-6 bg-gradient-to-r from-rose-50 to-orange-50 p-4 rounded-lg border border-rose-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Complete your look
            </h4>
            <p className="text-xs text-gray-600">
              Add these trending items to your cart
            </p>
          </div>
          <button className="text-sm bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Recently viewed by you
        </h4>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {recommendedItems.slice(0, 3).map((item) => (
            <div key={`recent_${item.id}`} className="flex-shrink-0 w-16">
              <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-1">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-600 text-center truncate">
                ₹{item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
