import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaHome, FaBriefcase } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Address = ({ onNext, onPrevious, selectedAddress, onAddressSelect }) => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      phone: '+91 9876543210',
      address: '123, MG Road, Sector 14',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      phone: '+91 9876543210',
      address: 'Tower A, Cyber City',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122002',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(selectedAddress?.id || addresses[0]?.id);

  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      ...formData,
      id: Date.now(),
    };

    setAddresses(prev => [...prev, newAddress]);
    setFormData({
      type: 'Home',
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false
    });
    setShowAddForm(false);
  };

  const handleEditAddress = (address) => {
    setFormData(address);
    setEditingAddress(address.id);
    setShowAddForm(true);
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    setAddresses(prev =>
      prev.map(addr =>
        addr.id === editingAddress
          ? { ...formData, id: editingAddress }
          : addr
      )
    );
    setFormData({
      type: 'Home',
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false
    });
    setEditingAddress(null);
    setShowAddForm(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(addresses[0]?.id);
    }
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    const address = addresses.find(addr => addr.id === addressId);
    if (onAddressSelect) {
      onAddressSelect(address);
    }
  };

  const handleNext = () => {
    const selectedAddr = addresses.find(addr => addr.id === selectedAddressId);
    if (selectedAddr && onNext) {
      onNext(selectedAddr);
    }
  };

  const getAddressIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'home':
        return <FaHome className="text-blue-600" />;
      case 'work':
        return <FaBriefcase className="text-green-600" />;
      default:
        return <FaMapMarkerAlt className="text-gray-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <MdLocationOn className="mr-2 text-rose-600" />
            Delivery Address
          </h2>
          <p className="text-gray-600 mt-1">Choose where you want your order to be delivered</p>
        </div>

        <div className="p-6">
          {/* Add New Address Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-rose-300 hover:text-rose-600 transition-colors mb-6 flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Add New Address
            </button>
          )}

          {/* Add/Edit Address Form */}
          {showAddForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Address Type */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Type
                    </label>
                    <div className="flex space-x-4">
                      {['Home', 'Work', 'Other'].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={formData.type === type}
                            onChange={handleInputChange}
                            className="mr-2 text-rose-600"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{6}"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  {/* Default Address */}
                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleInputChange}
                        className="mr-2 text-rose-600"
                      />
                      Make this my default address
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                  >
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAddress(null);
                      setFormData({
                        type: 'Home',
                        name: '',
                        phone: '',
                        address: '',
                        city: '',
                        state: '',
                        pincode: '',
                        landmark: '',
                        isDefault: false
                      });
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Existing Addresses */}
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedAddressId === address.id
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSelectAddress(address.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddressId === address.id}
                      onChange={() => handleSelectAddress(address.id)}
                      className="mt-1 text-rose-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getAddressIcon(address.type)}
                        <span className="font-semibold text-gray-900">{address.type}</span>
                        {address.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-gray-900 font-medium">{address.name}</div>
                      <div className="text-gray-600 text-sm mt-1">
                        {address.address}, {address.city}, {address.state} - {address.pincode}
                      </div>
                      <div className="text-gray-600 text-sm">{address.phone}</div>
                      {address.landmark && (
                        <div className="text-gray-500 text-sm">Near: {address.landmark}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(address);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaEdit size={16} />
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(address.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <FaTrash size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Timeline */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Delivery Information</h4>
            <div className="text-green-700 text-sm space-y-1">
              <div>🚚 Standard Delivery: 5-7 business days</div>
              <div>⚡ Express Delivery: 2-3 business days (₹99 extra)</div>
              <div>🏃‍♂️ Same Day Delivery: Available in select areas (₹199 extra)</div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onPrevious}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to Cart
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAddressId}
              className="px-6 py-3 bg-rose-600 text-white rounded-md hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
