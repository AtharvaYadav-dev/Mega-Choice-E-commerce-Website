import React, { useState } from 'react';
import { FaCreditCard, FaUniversity, FaWallet, FaShieldAlt, FaLock, FaCheck } from 'react-icons/fa';
import { MdAccountBalanceWallet, MdPayment } from 'react-icons/md';

const Payment = ({ onNext, onPrevious, orderSummary, selectedAddress }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSavedCards, setShowSavedCards] = useState(true);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: FaCreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: MdAccountBalanceWallet,
      description: 'Pay using any UPI app'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: FaUniversity,
      description: 'All major banks supported'
    },
    {
      id: 'wallet',
      name: 'Wallets',
      icon: FaWallet,
      description: 'Paytm, PhonePe, Amazon Pay'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: MdPayment,
      description: 'Pay when you receive'
    }
  ];

  const savedCards = [
    {
      id: 1,
      last4: '1234',
      type: 'Visa',
      name: 'John Doe',
      expiry: '12/25'
    },
    {
      id: 2,
      last4: '5678',
      type: 'Mastercard',
      name: 'John Doe',
      expiry: '03/26'
    }
  ];

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
    'Kotak Mahindra Bank', 'Yes Bank', 'Punjab National Bank', 'Bank of Baroda'
  ];

  const wallets = [
    { name: 'Paytm', icon: '💳' },
    { name: 'PhonePe', icon: '📱' },
    { name: 'Amazon Pay', icon: '🛒' },
    { name: 'Google Pay', icon: '🅖' }
  ];

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').substr(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      if (onNext) {
        onNext({
          paymentMethod: selectedPaymentMethod,
          paymentDetails: selectedPaymentMethod === 'card' ? cardDetails : { upiId },
          orderSummary,
          address: selectedAddress
        });
      }
    }, 3000);
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'card':
        return (
          <div className="space-y-6">
            {/* Saved Cards */}
            {showSavedCards && savedCards.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Saved Cards</h4>
                <div className="space-y-2">
                  {savedCards.map((card) => (
                    <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FaCreditCard className="text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {card.type} ending in {card.last4}
                            </div>
                            <div className="text-sm text-gray-500">
                              {card.name} • Expires {card.expiry}
                            </div>
                          </div>
                        </div>
                        <input type="radio" name="savedCard" className="text-rose-600" />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowSavedCards(false)}
                  className="mt-3 text-rose-600 text-sm hover:text-rose-700"
                >
                  Use a different card
                </button>
              </div>
            )}

            {/* New Card Form */}
            {!showSavedCards && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Add New Card</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardInputChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'upi':
        return (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">UPI Payment</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UPI ID
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@paytm"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
              />
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                💡 You can also scan QR code using any UPI app
              </p>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Select Your Bank</h4>
            <div className="grid grid-cols-2 gap-2">
              {banks.map((bank) => (
                <label key={bank} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="bank" className="mr-3 text-rose-600" />
                  <span className="text-sm">{bank}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Select Wallet</h4>
            <div className="space-y-2">
              {wallets.map((wallet) => (
                <label key={wallet.name} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="wallet" className="mr-3 text-rose-600" />
                  <span className="text-2xl mr-3">{wallet.icon}</span>
                  <span className="font-medium">{wallet.name}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'cod':
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <div className="text-yellow-600 mr-3">💰</div>
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Cash on Delivery</h4>
                <p className="text-yellow-700 text-sm">
                  Pay with cash when your order is delivered to your doorstep.
                </p>
                <p className="text-yellow-700 text-sm mt-2">
                  Additional ₹40 handling charges may apply.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FaLock className="mr-2 text-green-600" />
              Payment Method
            </h2>

            {/* Payment Options */}
            <div className="space-y-3 mb-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id
                      ? 'border-rose-500 bg-rose-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === method.id}
                      onChange={() => setSelectedPaymentMethod(method.id)}
                      className="text-rose-600"
                    />
                    <method.icon className="text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Form */}
            <div className="border-t pt-6">
              {renderPaymentForm()}
            </div>

            {/* Security Info */}
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800">
                <FaShieldAlt />
                <span className="font-medium">100% Safe & Secure Payments</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

            {/* Delivery Address */}
            <div className="border-b pb-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Delivery Address</h4>
              <div className="text-sm text-gray-600">
                <div className="font-medium">{selectedAddress?.name}</div>
                <div>{selectedAddress?.address}</div>
                <div>{selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}</div>
                <div>{selectedAddress?.phone}</div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{orderSummary?.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{orderSummary?.deliveryFee === 0 ? 'FREE' : `₹${orderSummary?.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹{orderSummary?.platformFee}</span>
              </div>
              {orderSummary?.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{orderSummary?.discount}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{orderSummary?.total?.toLocaleString()}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full mt-6 py-4 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FaLock className="mr-2" />
                  Place Order
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <FaShieldAlt className="mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center">
                <FaCheck className="mr-1" />
                <span>Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back to Address
        </button>
      </div>
    </div>
  );
};

export default Payment;
