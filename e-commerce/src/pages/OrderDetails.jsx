import React, { useState } from 'react';
import TrackOrderModal from "../Components/TrackOrderModal.jsx";
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaTruck,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
  FaDownload,
  FaShare,
  FaWhatsapp,
  FaEnvelope,
  FaStar,
  FaExchangeAlt,
  FaHeadset
} from 'react-icons/fa';
import { MdLocationOn, MdPayment, MdCheck } from 'react-icons/md';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);

  // Mock order data - in real app, fetch from API based on orderId
  const orderData = {
    id: orderId,
    date: "2024-01-20",
    total: 2499,
    status: "Delivered",
    trackingId: "TRK123456789",
    estimatedDelivery: "2024-01-25",
    actualDelivery: "2024-01-24",
    items: [
      {
        id: 1,
        name: "Blue Denim Jacket",
        price: 1899,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
        size: "L",
        color: "Blue",
        sku: "DJ001"
      },
      {
        id: 2,
        name: "White Cotton T-Shirt",
        price: 600,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        size: "M",
        color: "White",
        sku: "TS002"
      }
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210"
    },
    billingAddress: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 9876543210"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    orderSummary: {
      subtotal: 2499,
      delivery: 0,
      platformFee: 5,
      discount: 100,
      total: 2404
    },
    trackingHistory: [
      {
        status: "Order Placed",
        date: "2024-01-20",
        time: "10:30 AM",
        completed: true,
        description: "Your order has been placed successfully"
      },
      {
        status: "Payment Confirmed",
        date: "2024-01-20",
        time: "10:32 AM",
        completed: true,
        description: "Payment has been processed"
      },
      {
        status: "Processing",
        date: "2024-01-21",
        time: "02:15 PM",
        completed: true,
        description: "Your order is being prepared"
      },
      {
        status: "Shipped",
        date: "2024-01-22",
        time: "11:45 AM",
        completed: true,
        description: "Your order has been shipped"
      },
      {
        status: "Out for Delivery",
        date: "2024-01-24",
        time: "09:20 AM",
        completed: true,
        description: "Your order is out for delivery"
      },
      {
        status: "Delivered",
        date: "2024-01-24",
        time: "02:45 PM",
        completed: true,
        description: "Order delivered successfully"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canCancelOrder = () => {
    return ['processing', 'shipped'].includes(orderData.status.toLowerCase());
  };

  const canReturnOrder = () => {
    return orderData.status.toLowerCase() === 'delivered';
  };

  const handleDownloadInvoice = () => {
    // Simulate invoice download
    alert('Invoice download started');
  };

  const handleShareOrder = (platform) => {
    const message = `Check out my order from MegaChoice! Order ID: ${orderData.id}`;
    const url = window.location.href;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + url)}`);
    } else if (platform === 'email') {
      window.location.href = `mailto:?subject=MegaChoice Order Details&body=${encodeURIComponent(message)}`;
    }
  };

  const handleCancelOrder = () => {
    // Implement cancel order logic
    alert('Order cancellation request submitted');
    setShowCancelDialog(false);
  };

  const handleReturnOrder = () => {
    // Implement return order logic
    alert('Return request submitted');
    setShowReturnDialog(false);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order not found</h2>
          <button
            onClick={() => navigate('/profile')}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Profile
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{orderData.id}
              </h1>
              <p className="text-gray-600 mt-1">
                Placed on {new Date(orderData.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="mt-4 sm:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                {orderData.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <div className="mt-1 text-sm text-gray-500">
                          <p>SKU: {item.sku}</p>
                          <p>Size: {item.size} | Color: {item.color}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            ₹{item.price} each
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Tracking
                  </h2>
                  <div className="text-sm text-gray-600">
                    Tracking ID: <span className="font-medium">{orderData.trackingId}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {orderData.trackingHistory.map((track, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        track.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {track.completed ? (
                          <MdCheck className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${track.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {track.status}
                          </h3>
                          <div className="text-sm text-gray-500">
                            {track.date} at {track.time}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{track.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Information</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                      <MdLocationOn className="mr-2 text-gray-400" />
                      Shipping Address
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium text-gray-900">{orderData.shippingAddress.name}</p>
                      <p>{orderData.shippingAddress.address}</p>
                      <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.pincode}</p>
                      <p className="flex items-center">
                        <FaPhone className="mr-2" />
                        {orderData.shippingAddress.phone}
                      </p>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                      <FaCreditCard className="mr-2 text-gray-400" />
                      Billing Address
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium text-gray-900">{orderData.billingAddress.name}</p>
                      <p>{orderData.billingAddress.address}</p>
                      <p>{orderData.billingAddress.city}, {orderData.billingAddress.state} - {orderData.billingAddress.pincode}</p>
                      <p className="flex items-center">
                        <FaPhone className="mr-2" />
                        {orderData.billingAddress.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Actions</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={handleDownloadInvoice}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaDownload className="mr-2" />
                    Download Invoice
                  </button>

                  <button
                    onClick={() => setTrackOpen(true)}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaTruck className="mr-2" />
                    Track Order
                  </button>

                  {canCancelOrder() && (
                    <button
                      onClick={() => setShowCancelDialog(true)}
                      className="flex items-center justify-center px-4 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FaExchangeAlt className="mr-2" />
                      Cancel Order
                    </button>
                  )}

                  {canReturnOrder() && (
                    <button
                      onClick={() => setShowReturnDialog(true)}
                      className="flex items-center justify-center px-4 py-3 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <FaExchangeAlt className="mr-2" />
                      Return Order
                    </button>
                  )}

                  <button
                    onClick={() => navigate('/contact')}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaHeadset className="mr-2" />
                    Contact Support
                  </button>
                </div>

                {/* Share Options */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <FaShare className="mr-2" />
                    Share Order
                  </h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleShareOrder('whatsapp')}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      <FaWhatsapp className="mr-2" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShareOrder('email')}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      <FaEnvelope className="mr-2" />
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{orderData.orderSummary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span>{orderData.orderSummary.delivery === 0 ? 'FREE' : `₹${orderData.orderSummary.delivery}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span>₹{orderData.orderSummary.platformFee}</span>
                </div>
                {orderData.orderSummary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{orderData.orderSummary.discount}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold text-base">
                  <span>Total Paid</span>
                  <span>₹{orderData.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <MdPayment className="mr-2 text-gray-400" />
                  Payment Details
                </h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Method</span>
                    <span className="font-medium">{orderData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className={`font-medium ${
                      orderData.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {orderData.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/shop"
                  className="w-full block text-center py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      <TrackOrderModal open={trackOpen} onClose={() => setTrackOpen(false)} order={orderData} />
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Order</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return Order Modal */}
      {showReturnDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Order</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for returning this order:
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              rows={3}
              placeholder="Enter reason for return..."
            ></textarea>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowReturnDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReturnOrder}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Submit Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
