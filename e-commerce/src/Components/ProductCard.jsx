import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaEye,
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTruck,
  FaFire,
  FaBolt,
  FaGift,
  FaShare,
} from "react-icons/fa";
import { useToast } from "../hooks/useToast.js";

const ProductCard = ({
  id,
  image,
  images = [],
  title,
  price,
  originalPrice,
  badge,
  onAdd,
  onToggleWishlist,
  onQuickView,
  wished = false,
  discount,
  rating = 0,
  reviews = 0,
  category,
  brand,
  inStock = true,
  isNew = false,
  isBestseller = false,
  freeShipping = false,
  className = "",
  size = "md",
  variant = "default",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const cardRef = useRef(null);
  const { addToast } = useToast?.() || { addToast: undefined };

  // Calculate discount percentage (prefer explicit prop, otherwise derive from prices)
  const calculatedDiscount =
    typeof discount === "number" && !isNaN(discount)
      ? Math.max(0, Math.round(discount))
      : originalPrice && price
        ? Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100))
        : 0;

  // Derive original price if only discount is provided
  const derivedOriginal =
    !originalPrice && calculatedDiscount > 0
      ? Math.round(price / (1 - calculatedDiscount / 100))
      : originalPrice;

  // Generate image array if only one image provided
  const productImages = images.length > 0 ? images : image ? [image] : [];

  // Handle image cycling on hover
  const handleImageCycle = () => {
    if (productImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }
    return stars;
  };

  // Size variants
  const sizeClasses = {
    sm: "w-full",
    md: "w-full",
    lg: "w-full",
    xl: "w-full",
  };

  // Variant styles
  const variantClasses = {
    default: "card-interactive",
    minimal: "bg-white rounded-xl border border-gray-100 hover:border-gray-200",
    elevated: "bg-white rounded-2xl shadow-medium hover:shadow-hard",
    bordered:
      "bg-white rounded-xl border-2 border-gray-200 hover:border-primary-300",
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (inStock && onAdd) {
      onAdd({ id, title, price, image: productImages[0] });

      // Add ripple effect
      const button = e.target;
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      ripple.classList.add("ripple");
      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist({ id, title, price, image: productImages[0] });
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView({
        id,
        image: productImages[0],
        images: productImages,
        title,
        price,
        originalPrice,
        rating,
        reviews,
      });
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const handleCopyLink = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/product/${id}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      addToast && addToast("Link copied to clipboard", "success");
    } catch (err) {
      addToast && addToast("Failed to copy link", "error");
    }
    setShowShareMenu(false);
  };

  const handleShareWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(`${title || "Check this out"} - ${window.location.origin}/product/${id}`);
    const wa = `https://wa.me/?text=${text}`;
    window.open(wa, "_blank", "noopener,noreferrer");
    setShowShareMenu(false);
  };

  return (
    <div
      ref={cardRef}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        group relative overflow-hidden transition-all duration-300 h-full flex flex-col
        ${!inStock ? "opacity-60" : ""}
        ${className}
      `}
      onMouseEnter={() => {
        setIsHovered(true);
        if (productImages.length > 1) {
          const interval = setInterval(handleImageCycle, 1000);
          cardRef.current.imageInterval = interval;
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
        if (cardRef.current?.imageInterval) {
          clearInterval(cardRef.current.imageInterval);
        }
      }}
    >
      {/* Image Container */}
      <Link to={`/product/${id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100 block">
        {productImages.length > 0 ? (
          <>
            <img
              src={productImages[currentImageIndex]}
              alt={title}
              className={`
                w-full h-full object-cover transition-all duration-500
                group-hover:scale-110
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!inStock && (
            <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
              Out of Stock
            </span>
          )}
          {isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center">
              <FaBolt className="w-3 h-3 mr-1" />
              NEW
            </span>
          )}
          {isBestseller && (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center">
              <FaFire className="w-3 h-3 mr-1" />
              BESTSELLER
            </span>
          )}
          {badge && (
            <span className="px-3 py-1 bg-primary-500 text-white text-xs font-bold rounded-full">
              {badge}
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div
          className={`
          absolute top-3 right-3 flex flex-col gap-2
          transition-all duration-300 transform
          ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
        `}
        >
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`
              w-10 h-10 rounded-full border-2 backdrop-blur-sm flex items-center justify-center
              transition-all duration-200 transform hover:scale-110 active:scale-95
              ${
                wished
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-white/90 border-white/50 text-gray-600 hover:text-red-500"
              }
            `}
            title={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wished ? (
              <FaHeart className="w-4 h-4" />
            ) : (
              <FaRegHeart className="w-4 h-4" />
            )}
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            onClick={handleQuickView}
            className="w-10 h-10 rounded-full bg-white/90 border-2 border-white/50 text-gray-600 hover:text-primary-500 backdrop-blur-sm transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center"
            title="Quick view"
          >
            <FaEye className="w-4 h-4" />
          </button>

          {/* Share Button */}
          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/90 border-2 border-white/50 text-gray-600 hover:text-primary-500 backdrop-blur-sm transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center"
              title="Share"
            >
              <FaShare className="w-4 h-4" />
            </button>

            {showShareMenu && (
              <div
                className="absolute right-12 top-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20"
                onClick={(e)=>{e.stopPropagation();}}
                onMouseDown={(e)=>{e.preventDefault(); e.stopPropagation();}}
              >
                <button
                  type="button"
                  onClick={handleCopyLink}
                  onMouseDown={(e)=>{e.preventDefault(); e.stopPropagation();}}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  Copy Link
                </button>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  onMouseDown={(e)=>{e.preventDefault(); e.stopPropagation();}}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                >
                  WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Image Indicators */}
        {productImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {productImages.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-200
                  ${index === currentImageIndex ? "bg-white" : "bg-white/50"}
                `}
              />
            ))}
          </div>
        )}

      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="space-y-2">
        {/* Brand */}
        {brand && (
          <div className="text-xs text-gray-700 font-medium">{brand}</div>
        )}

        {/* Title */}
        <Link to={`/product/${id}`} className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center text-xs">{renderStars(rating)}</div>
            <span className="text-xs font-medium text-gray-900">{rating.toFixed(1)}</span>
            {reviews > 0 && (
              <span className="text-xs text-gray-500">({reviews.toLocaleString()})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">₹{price?.toLocaleString()}</span>
            {(derivedOriginal && derivedOriginal > price) && (
              <span className="text-xs text-gray-500 line-through">M.R.P. ₹{derivedOriginal.toLocaleString()}</span>
            )}
            {calculatedDiscount > 0 && (
              <span className="text-xs text-green-600 font-semibold">({calculatedDiscount}% off)</span>
            )}
          </div>
          {calculatedDiscount >= 30 && (
            <div className="inline-block px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-semibold">Limited time deal</div>
          )}
        </div>

        {/* Delivery/Perks */}
        <div className="space-y-0.5 text-xs">
          {freeShipping ? (
            <div className="text-gray-700">FREE delivery Thu, 6 Nov</div>
          ) : (
            <div className="text-gray-700">Delivery by Fri, 7 Nov</div>
          )}
          {price > 1000 && (
            <div className="flex items-center text-purple-600 font-medium">
              <FaGift className="w-3 h-3 mr-1" /> Gift Wrap
            </div>
          )}
        </div>
        </div>

        {/* Add to Cart Button (Desktop) */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`
            mt-auto w-full py-2.5 rounded-md font-medium text-sm
            transition-colors duration-150
            ${inStock ? "bg-amber-400 hover:bg-amber-500 text-gray-900" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          <span className="flex items-center justify-center"><FaShoppingCart className="w-4 h-4 mr-2" /> {inStock ? "Add to cart" : "Out of Stock"}</span>
        </button>
        {/* Ripple effect will be added here */}
      </div>

      {/* Loading Overlay */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};

export default ProductCard;

// Specialized product card variants
export const ProductCardMini = (props) => (
  <ProductCard size="sm" variant="minimal" {...props} />
);

export const ProductCardLarge = (props) => (
  <ProductCard size="lg" variant="elevated" {...props} />
);

export const ProductCardBordered = (props) => (
  <ProductCard variant="bordered" {...props} />
);

// Add ripple effect styles to your CSS
const rippleStyles = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

// Inject styles if not already present
if (
  typeof document !== "undefined" &&
  !document.getElementById("product-card-styles")
) {
  const style = document.createElement("style");
  style.id = "product-card-styles";
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}
