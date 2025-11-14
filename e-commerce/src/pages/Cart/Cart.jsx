import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaArrowLeft,
  FaHeart,
  FaTrash,
} from "react-icons/fa";
import { MdLocalOffer, MdSecurity } from "react-icons/md";
import CartSteps from "./CartSteps";
import PriceBreakdown from "./PriceBreakdown";
import RecommendedProducts from "./RecommendedProducts";
import Address from "./Address";
import Payment from "./Payment";

const Cart = ({
  items = [],
  onRemoveOne,
  onIncreaseOne,
  onRemoveAll,
  onAddToCart,
  onMoveToWishlist,
  user,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: BAG, 2: ADDRESS, 3: PAYMENT
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isPromoLoading, setIsPromoLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal > 1999 ? 0 : 99;
  const platformFee = 20;
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const total = subtotal + deliveryFee + platformFee - discount;

  // Free delivery progress
  const freeDeliveryThreshold = 1999;
  const remainingForFreeDelivery = Math.max(
    0,
    freeDeliveryThreshold - subtotal,
  );
  const deliveryProgress = Math.min(
    100,
    (subtotal / freeDeliveryThreshold) * 100,
  );

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsPromoLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock promo codes
      const promoCodes = {
        SAVE10: {
          discount: subtotal * 0.1,
          maxDiscount: 500,
          message: "10% off applied!",
        },
        FIRST100: {
          discount: 100,
          maxDiscount: 100,
          message: "₹100 off for first-time users!",
        },
        WELCOME: {
          discount: 50,
          maxDiscount: 50,
          message: "Welcome discount applied!",
        },
      };

      if (promoCodes[promoCode.toUpperCase()]) {
        const promo = promoCodes[promoCode.toUpperCase()];
        setAppliedPromo({
          code: promoCode.toUpperCase(),
          discount: Math.min(promo.discount, promo.maxDiscount),
          message: promo.message,
        });
      }
      setIsPromoLoading(false);
    }, 1000);
  };

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty <= 0) {
      onRemoveAll(itemId);
    } else {
      const item = items.find((i) => i.id === itemId);
      const currentQty = item ? item.qty : 0;

      if (newQty > currentQty) {
        onIncreaseOne(itemId);
      } else {
        onRemoveOne(itemId);
      }
    }
  };

  const handleMoveToWishlist = (item) => {
    if (onMoveToWishlist) {
      onMoveToWishlist(item);
      onRemoveAll(item.id);
    }
  };

  const handleNextStep = (data) => {
    if (currentStep === 2) {
      setSelectedAddress(data);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Handle order completion - redirect to success page
      navigate("/order-success", { state: { orderData: data } });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProceedToCheckout = () => {
    if (user) {
      setCurrentStep(2);
    } else {
      navigate("/login");
    }
  };

  // Step 2: Address Selection
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full mr-4"
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">
                  Delivery Address
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-green-600">
                  <FaShieldAlt className="mr-1" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CartSteps currentStep={currentStep} />
        <Address
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          selectedAddress={selectedAddress}
          onAddressSelect={setSelectedAddress}
        />
      </div>
    );
  }

  // Step 3: Payment
  if (currentStep === 3) {
    const orderSummary = {
      subtotal,
      deliveryFee,
      platformFee,
      discount,
      total,
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full mr-4"
                >
                  <FaArrowLeft className="text-gray-600" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Payment</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-green-600">
                  <FaShieldAlt className="mr-1" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CartSteps currentStep={currentStep} />
        <Payment
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          orderSummary={orderSummary}
          selectedAddress={selectedAddress}
        />
      </div>
    );
  }

  // Step 1: Cart/Bag (default view)
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">Add some items to get started</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full mr-4"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Shopping Bag ({items.reduce((sum, item) => sum + item.qty, 0)}{" "}
                items)
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-green-600">
                <FaShieldAlt className="mr-1" />
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <CartSteps currentStep={currentStep} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Free Delivery Progress */}
            {remainingForFreeDelivery > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Add ₹{remainingForFreeDelivery} more for FREE delivery
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    {deliveryProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${deliveryProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-32 object-cover rounded-lg border"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-900 line-clamp-2 mb-1">
                            {item.title}
                          </h3>

                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-semibold text-gray-900">
                              ₹{item.price}
                            </span>
                            {item.originalPrice &&
                              item.originalPrice > item.price && (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                  <span className="text-sm text-green-600 font-medium">
                                    {Math.round(
                                      (1 - item.price / item.originalPrice) *
                                        100,
                                    )}
                                    % OFF
                                  </span>
                                </>
                              )}
                          </div>

                          {/* Size and Color */}
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            {item.size && (
                              <div>
                                Size:{" "}
                                <span className="font-medium">{item.size}</span>
                              </div>
                            )}
                            {item.color && (
                              <div>
                                Color:{" "}
                                <span className="font-medium">
                                  {item.color}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Delivery Info */}
                          <div className="flex items-center text-sm text-green-600 mb-3">
                            <FaTruck className="mr-1" />
                            <span>Delivery by tomorrow</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900 mb-2">
                            ₹{item.price * item.qty}
                          </div>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.qty - 1)
                              }
                              className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 text-center min-w-[3rem]">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.qty + 1)
                              }
                              className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-sm text-gray-600 hover:text-rose-600 flex items-center"
                          >
                            <FaHeart className="mr-1" />
                            Save for later
                          </button>
                          <button
                            onClick={() => onRemoveAll(item.id)}
                            className="text-sm text-gray-600 hover:text-red-600 flex items-center"
                          >
                            <FaTrash className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MdLocalOffer className="mr-2 text-orange-500" />
                Apply Coupon
              </h3>

              <div className="flex gap-3 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  disabled={!promoCode.trim() || isPromoLoading}
                  className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isPromoLoading ? "Applying..." : "Apply"}
                </button>
              </div>

              {appliedPromo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-green-700">
                      <FaTag className="mr-2" />
                      <span className="font-medium">
                        {appliedPromo.code} applied
                      </span>
                    </div>
                    <div className="text-green-700 font-semibold">
                      -₹{appliedPromo.discount}
                    </div>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    {appliedPromo.message}
                  </p>
                </div>
              )}

              {/* Available Offers */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Available Offers
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaTag className="mr-2 text-orange-500" />
                    <span>SAVE10 - Get 10% off (up to ₹500)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaTag className="mr-2 text-orange-500" />
                    <span>FIRST100 - ₹100 off for first-time users</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Products */}
            <RecommendedProducts onAddToCart={onAddToCart} />
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <PriceBreakdown
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                platformFee={platformFee}
                discount={discount}
                total={total}
                appliedPromo={appliedPromo}
              />

              {/* Checkout Button */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 bg-rose-600 text-white text-lg font-semibold rounded-lg hover:bg-rose-700 transition-colors"
                >
                  {user ? "Proceed to Checkout" : "Login to Checkout"}
                </button>

                <div className="flex items-center justify-center text-sm text-gray-600">
                  <MdSecurity className="mr-1" />
                  <span>Safe and secure payments</span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-green-600 text-xl mb-1">
                      <FaShieldAlt />
                    </div>
                    <div className="text-xs text-gray-600">Secure</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-600 text-xl mb-1">
                      <FaTruck />
                    </div>
                    <div className="text-xs text-gray-600">Fast Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-600 text-xl mb-1">
                      <FaTag />
                    </div>
                    <div className="text-xs text-gray-600">Best Prices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
