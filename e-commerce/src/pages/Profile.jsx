import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  FaEdit,
  FaHeart,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaSignOutAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCamera,
} from "react-icons/fa";
import PaymentMethodForm from "../Components/PaymentMethodForm.jsx";
import TrackOrderModal from "../Components/TrackOrderModal.jsx";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: authUser, logout: authLogout } = useAuth();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const fileInputRef = useRef(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [pmOpen, setPmOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Load user data from context/localStorage based on token presence
    try {
      const token = localStorage.getItem("token");
      const stored = JSON.parse(localStorage.getItem("user") || "null");
      const base = authUser || stored;
      if (token && base) {
        const hydrated = {
          ...base,
          joinedDate: base.joinedDate || "2024-01-15",
          totalOrders: base.totalOrders ?? 12,
          totalSpent: base.totalSpent ?? 15420,
          loyaltyPoints: base.loyaltyPoints ?? 850,
          profileImage:
            base.profileImage ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        };
        setUser(hydrated);
        setEditData(base);
      } else {
        setUser(null);
      }
    } catch {}
  }, [authUser]);

  // Sync tab from query parameter, e.g., /profile?tab=orders
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    const allowed = new Set(["profile", "orders", "wishlist", "addresses", "payments", "settings"]);
    if (tab && allowed.has(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditData(user);
    }
  };

  const handleSave = () => {
    const next = { ...user, ...editData };
    setUser(next);
    localStorage.setItem("user", JSON.stringify(next));
    try { window.dispatchEvent(new Event("user_updated")); } catch {}
    setIsEditing(false);
  };

  const handleLogout = () => {
    authLogout();
    navigate("/", { replace: true });
  };

  const handleProfileImageClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const updated = { ...(user || {}), profileImage: dataUrl, isLoggedIn: true };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      window.dispatchEvent(new Event("user_updated"));
    };
    reader.readAsDataURL(file);
    // reset the input so the same file can be selected again later if needed
    e.target.value = "";
  };

  const recentOrders = [
    {
      id: "ORD001",
      date: "2024-01-20",
      total: 2499,
      status: "Delivered",
      items: [
        { name: "Blue Denim Jacket", quantity: 1, price: 1899 },
        { name: "White T-Shirt", quantity: 1, price: 600 },
      ],
      itemCount: 2,
      trackingId: "TRK123456789",
      estimatedDelivery: "2024-01-25",
      paymentMethod: "Credit Card",
    },
    {
      id: "ORD002",
      date: "2024-01-15",
      total: 1799,
      status: "Shipped",
      items: [{ name: "Black Sneakers", quantity: 1, price: 1799 }],
      itemCount: 1,
      trackingId: "TRK987654321",
      estimatedDelivery: "2024-01-20",
      paymentMethod: "UPI",
    },
    {
      id: "ORD003",
      date: "2024-01-10",
      total: 3299,
      status: "Delivered",
      items: [
        { name: "Summer Dress", quantity: 1, price: 2299 },
        { name: "Handbag", quantity: 1, price: 800 },
        { name: "Sunglasses", quantity: 1, price: 200 },
      ],
      itemCount: 3,
      trackingId: "TRK456789123",
      estimatedDelivery: "2024-01-15",
      paymentMethod: "Net Banking",
    },
  ];

  // Load and persist payment methods
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("payment_methods") || "[]");
      if (Array.isArray(saved)) setPaymentMethods(saved);
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("payment_methods", JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const addPaymentMethod = (method) => {
    setPaymentMethods((prev) => {
      let next = [...prev];
      if (method.isDefault) next = next.map((m) => ({ ...m, isDefault: false }));
      next.unshift(method);
      return next;
    });
  };
  const setDefaultPayment = (id) => {
    setPaymentMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  };
  const removePayment = (id) => {
    setPaymentMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: user?.name || "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: user?.name || "John Doe",
      address: "456 Business Park, Floor 5",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002",
      isDefault: false,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to view your profile
          </p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "orders", label: "Orders", icon: FaShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: FaHeart },
    { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
    { id: "payments", label: "Payments", icon: FaCreditCard },
    { id: "settings", label: "Settings", icon: FaBell },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                src={user.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button onClick={handleProfileImageClick} className="absolute bottom-0 right-0 bg-pink-500 text-white p-1.5 rounded-full shadow-lg hover:bg-pink-600 transition-colors" title="Change profile picture" aria-label="Change profile picture">
                <FaCamera className="w-3 h-3" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center">
                  <FaCalendarAlt className="w-3 h-3 mr-1" /> Joined{" "}
                  {new Date(user.joinedDate).toLocaleDateString()}
                </span>
                <span>{user.totalOrders} Orders</span>
                <span>₹{user.totalSpent.toLocaleString()} Spent</span>
                <span className="text-pink-600 font-medium">
                  {user.loyaltyPoints} Points
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-pink-50 text-pink-600 border-r-2 border-pink-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Personal Information
                    </h2>
                    <button
                      onClick={isEditing ? handleSave : handleEditToggle}
                      className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      <FaEdit className="w-4 h-4 mr-2" />
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.name || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      ) : (
                        <p className="text-gray-900">{user.name}</p>
                      )}

              <TrackOrderModal open={trackOpen} onClose={() => setTrackOpen(false)} order={selectedOrder} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="flex items-center">
                        <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.mobile || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, mobile: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      ) : (
                        <div className="flex items-center">
                          <FaPhone className="w-4 h-4 text-gray-400 mr-2" />
                          <p className="text-gray-900">
                            {user.mobile || "Not provided"}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.gender || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, gender: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 capitalize">
                          {user.gender || "Not specified"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.dateOfBirth || ""}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              dateOfBirth: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {user.dateOfBirth
                            ? new Date(user.dateOfBirth).toLocaleDateString()
                            : "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Order History
                    </h2>
                    <div className="text-sm text-gray-600">
                      {recentOrders.length} order
                      {recentOrders.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {recentOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <FaShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">No orders yet</p>
                      <p className="text-sm text-gray-400 mb-6">
                        Start shopping to see your orders here
                      </p>
                      <Link
                        to="/shop"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all"
                      >
                        Start Shopping →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 bg-white"
                        >
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  Order #{order.id}
                                </h3>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Shipped"
                                        ? "bg-blue-100 text-blue-800"
                                        : order.status === "Processing"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>

                              <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                  <span className="font-medium">Ordered:</span>{" "}
                                  {new Date(order.date).toLocaleDateString(
                                    "en-IN",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    },
                                  )}
                                </p>
                                <p>
                                  <span className="font-medium">Items:</span>{" "}
                                  {order.itemCount} item
                                  {order.itemCount !== 1 ? "s" : ""}
                                </p>
                                {order.trackingId && (
                                  <p>
                                    <span className="font-medium">
                                      Tracking:
                                    </span>{" "}
                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                      {order.trackingId}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="mt-3 sm:mt-0 sm:ml-6 text-right">
                              <p className="text-xl font-bold text-gray-900 mb-1">
                                ₹{order.total.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500 mb-3">
                                via {order.paymentMethod}
                              </p>
                              <Link
                                to={`/order/${order.id}`}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                View Details
                                <svg
                                  className="ml-2 w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </div>

                          {/* Order Items Preview */}
                          <div className="border-t border-gray-100 pt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">
                              Order Items:
                            </h4>
                            <div className="space-y-2">
                              {order.items.slice(0, 2).map((item, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span className="text-gray-700">
                                    {item.quantity}x {item.name}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    ₹
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <div className="text-sm text-gray-500 italic">
                                  +{order.items.length - 2} more item
                                  {order.items.length - 2 !== 1 ? "s" : ""}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="border-t border-gray-100 pt-4 mt-4">
                            <div className="flex flex-wrap gap-3">
                              {order.status === "Delivered" && (
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                  Rate & Review
                                </button>
                              )}
                              {order.status === "Shipped" && (
                                <button onClick={() => { setSelectedOrder(order); setTrackOpen(true); }} className="text-sm text-green-600 hover:text-green-700 font-medium">
                                  Track Package
                                </button>
                              )}
                              <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                                Download Invoice
                              </button>
                              {(order.status === "Processing" ||
                                order.status === "Shipped") && (
                                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                                  Cancel Order
                                </button>
                              )}
                              {order.status === "Delivered" && (
                                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                                  Return Items
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Load More Button (if needed) */}
                      {recentOrders.length >= 5 && (
                        <div className="text-center pt-6">
                          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                            Load More Orders
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    My Wishlist
                  </h2>
                  <div className="text-center py-12">
                    <FaHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center mt-4 text-pink-600 hover:text-pink-700"
                    >
                      Continue Shopping →
                    </Link>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Saved Addresses
                    </h2>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                      Add New Address
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border rounded-lg p-4 relative"
                      >
                        {address.isDefault && (
                          <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                        <div className="mb-2">
                          <span className="font-medium text-gray-900">
                            {address.type}
                          </span>
                        </div>
                        <p className="text-gray-900">{address.name}</p>
                        <p className="text-gray-600 text-sm">
                          {address.address}
                          <br />
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <div className="flex space-x-2 mt-3">
                          <button className="text-pink-600 hover:text-pink-700 text-sm">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === "payments" && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Payment Methods
                    </h2>
                    <button onClick={() => setPmOpen(true)} className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                      Add Payment Method
                    </button>
                  </div>
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-12">
                      <FaCreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No saved payment methods</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {paymentMethods.map((m) => (
                        <div key={m.id} className="border rounded-lg p-4 flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {m.type === "card" ? `${m.brand} ${m.label}` : `UPI ${m.label}`}
                            </div>
                            <div className="text-sm text-gray-500">{m.type === "card" ? `Exp ${m.expiry}` : ""}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            {!m.isDefault && (
                              <button onClick={() => setDefaultPayment(m.id)} className="text-sm text-gray-700 hover:text-pink-600">Set default</button>
                            )}
                            <button onClick={() => removePayment(m.id)} className="text-sm text-red-600 hover:text-red-700">Remove</button>
                            {m.isDefault && (<span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <PaymentMethodForm open={pmOpen} onClose={() => setPmOpen(false)} onSave={addPaymentMethod} />
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Account Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Notifications
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Order updates
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Promotional emails
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="ml-2 text-gray-700">
                            SMS notifications
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="border-b pb-4">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Privacy
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Show profile to other users
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="ml-2 text-gray-700">
                            Show purchase history
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Security
                      </h3>
                      <button className="text-pink-600 hover:text-pink-700 mr-4">
                        Change Password
                      </button>
                      <button className="text-pink-600 hover:text-pink-700">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
