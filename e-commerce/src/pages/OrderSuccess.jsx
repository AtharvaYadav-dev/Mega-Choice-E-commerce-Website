import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTruck, FaDownload, FaShoppingBag, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { MdLocationOn, MdPayment } from 'react-icons/md';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [showTracking, setShowTracking] = useState(false);
  const trackingRef = useRef(null);

  // Generate random order ID and delivery date
  const orderId = `MIA${Date.now().toString().slice(-8)}`;
  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Clear cart items from localStorage since order is successful
    localStorage.setItem('cart_items', JSON.stringify([]));

    // Send order confirmation email (simulate)
    console.log('Order confirmation email sent');
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'upi':
        return 'UPI Payment';
      case 'netbanking':
        return 'Net Banking';
      case 'wallet':
        return 'Digital Wallet';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return 'Online Payment';
    }
  };

  const handleDownloadInvoice = () => {
    // Simulate invoice download
    alert('Invoice download started');
  };

  const handleShareOrder = (platform) => {
    const message = `Just placed an order on MegaChoice! Order ID: ${orderId}`;
    const url = window.location.origin;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`);
    } else if (platform === 'email') {
      window.location.href = `mailto:?subject=My MegaChoice Order&body=${encodeURIComponent(message)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <FaCheckCircle className="text-green-600 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for shopping with us. Your order has been confirmed.
          </p>

          {/* Order ID */}
          <div className="inline-flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600 mr-2">Order ID:</span>
            <span className="font-semibold text-gray-900">{orderId}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaTruck className="mr-2 text-green-600" />
                Delivery Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MdLocationOn className="text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Delivery Address</h3>
                    <div className="text-gray-600 text-sm mt-1">
                      <div className="font-medium">{orderData.address?.name}</div>
                      <div>{orderData.address?.address}</div>
                      <div>{orderData.address?.city}, {orderData.address?.state} - {orderData.address?.pincode}</div>
                      <div>{orderData.address?.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaTruck className="text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Expected Delivery</h3>
                    <div className="text-green-600 font-medium text-sm mt-1">
                      {deliveryDate}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      Standard delivery (5-7 business days)
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline - hidden by default */}
              {showTracking && (
                <div ref={trackingRef} className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">Order Tracking</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Order Confirmed</div>
                        <div className="text-xs text-gray-500">Just now</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Processing</div>
                        <div className="text-xs text-gray-500">Within 24 hours</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Shipped</div>
                        <div className="text-xs text-gray-500">1-2 days</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Out for Delivery</div>
                        <div className="text-xs text-gray-500">On delivery date</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Delivered</div>
                        <div className="text-xs text-gray-500">{deliveryDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MdPayment className="mr-2 text-blue-600" />
                Payment Information
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{getPaymentMethodDisplay(orderData.paymentMethod)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="text-green-600 font-medium">
                    {orderData.paymentMethod === 'cod' ? 'Pending' : 'Paid'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-medium">₹{orderData.orderSummary?.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleDownloadInvoice}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaDownload className="mr-2" />
                  Download Invoice
                </button>

                <button
                  onClick={() => { setShowTracking(true); setTimeout(() => { if (trackingRef.current) trackingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 0); }}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaTruck className="mr-2" />
                  Track Order
                </button>
              </div>

              {/* Share Order */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Share your order</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleShareOrder('whatsapp')}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    <FaWhatsapp className="mr-2" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShareOrder('email')}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <FaEnvelope className="mr-2" />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{orderData.orderSummary?.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>{orderData.orderSummary?.deliveryFee === 0 ? 'FREE' : `₹${orderData.orderSummary?.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span>₹{orderData.orderSummary?.platformFee}</span>
                </div>
                {orderData.orderSummary?.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{orderData.orderSummary?.discount}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>₹{orderData.orderSummary?.total?.toLocaleString()}</span>
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <button className="block text-rose-600 hover:text-rose-700">
                    Contact Customer Support
                  </button>
                  <button className="block text-rose-600 hover:text-rose-700">
                    Return Policy
                  </button>
                  <button className="block text-rose-600 hover:text-rose-700">
                    FAQ
                  </button>
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-md mb-2"></div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Product {item}</h4>
                <p className="text-sm text-gray-600">₹999</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <FaEnvelope className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Order Confirmation Sent</h3>
              <p className="text-blue-800 text-sm">
                We've sent order confirmation and tracking details to your email address.
                Please check your inbox and spam folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
