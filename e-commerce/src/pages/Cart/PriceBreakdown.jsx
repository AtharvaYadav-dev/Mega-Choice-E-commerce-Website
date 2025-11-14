import React from 'react';
import { FaTag, FaTruck, FaPercent } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const PriceBreakdown = ({
  subtotal = 0,
  deliveryFee = 0,
  platformFee = 0,
  discount = 0,
  total = 0,
  appliedPromo = null
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Price Details
      </h3>

      <div className="space-y-3 pb-4 border-b border-gray-200">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700">
            Total MRP ({Math.floor(subtotal / 500)} items)
          </span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <div className="flex items-center">
              <FaTag className="mr-2" />
              <span>Coupon Discount ({appliedPromo?.code})</span>
            </div>
            <span className="font-medium">-₹{discount.toLocaleString()}</span>
          </div>
        )}

        {/* Platform Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-700">Platform Fee</span>
            <div className="ml-2 group relative">
              <div className="w-4 h-4 bg-gray-300 rounded-full text-xs flex items-center justify-center text-white cursor-help">
                ?
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Platform and service charges
              </div>
            </div>
          </div>
          <span className="font-medium">₹{platformFee}</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaTruck className="mr-2 text-gray-500" />
            <span className="text-gray-700">Delivery Fee</span>
          </div>
          <div className="text-right">
            {deliveryFee === 0 ? (
              <div>
                <span className="text-gray-500 line-through text-sm">₹99</span>
                <span className="text-green-600 font-medium ml-2">FREE</span>
              </div>
            ) : (
              <span className="font-medium">₹{deliveryFee}</span>
            )}
          </div>
        </div>
      </div>

      {/* Total Amount */}
      <div className="pt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-gray-900">Total Amount</span>
          <span className="text-gray-900">₹{total.toLocaleString()}</span>
        </div>

        {discount > 0 && (
          <div className="mt-2 text-sm text-green-600 font-medium">
            You saved ₹{discount.toLocaleString()} on this order
          </div>
        )}
      </div>

      {/* Delivery Benefits */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start">
          <MdLocalShipping className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-green-800">
              {deliveryFee === 0 ? 'Congratulations!' : 'Almost there!'}
            </div>
            <div className="text-xs text-green-700 mt-1">
              {deliveryFee === 0
                ? 'You have unlocked FREE delivery on this order'
                : `Add ₹${1999 - subtotal} more to unlock FREE delivery`
              }
            </div>
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center text-orange-800 text-sm font-medium mb-2">
          <FaPercent className="mr-2" />
          Available Offers
        </div>
        <div className="text-xs text-orange-700 space-y-1">
          <div>• 10% Instant Discount on SBI Credit Cards</div>
          <div>• 5% Cashback on Wallet payments</div>
          <div>• EMI options available</div>
        </div>
      </div>

      {/* Safe and Secure */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <div className="flex items-center justify-center mb-1">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>Safe and Secure Payments. Easy returns.</span>
        </div>
        <div>100% Authentic products</div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
