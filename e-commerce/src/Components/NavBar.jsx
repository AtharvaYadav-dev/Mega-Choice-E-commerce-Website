import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBell,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaFire,
  FaTags,
  FaShippingFast,
  FaGift,
  FaCrown,
  FaSignOutAlt,
  FaCog,
  FaHistory,
  FaMicrophone,
  FaCamera,
} from "react-icons/fa";
import CollectionModal from "./CollectionModal.jsx";
import MiniCartPopover from "./MiniCartPopover.jsx";
import { BRAND_NAME, BRAND_LOGO_SRC } from "../brand";

const NavBar = ({
  onOpenCart,
  onOpenWishlist,
  cartCount = 0,
  wishlistCount = 0,
  user: userProp,
  onAddToCart,
  cartItems = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser, logout } = useAuth();
  const user = authUser || userProp;
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [collectionModal, setCollectionModal] = useState({ open: false, mode: "new" });

  const searchRef = useRef(null);
  const navRef = useRef(null);
  const megaMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Expose dynamic navbar height to the document as CSS var ASAP
  useLayoutEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        const h = navRef.current.offsetHeight || 0;
        document.documentElement.style.setProperty("--nav-height", `${h}px`);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isOpen, isScrolled]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    if (search === "") {
      setSearchSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      // Mock search suggestions
      const suggestions = [
        "Trending dresses",
        "Summer collection",
        "Men's casual wear",
        "Designer bags",
        "Ethnic wear",
      ].filter((item) => item.toLowerCase().includes(search.toLowerCase()));
      setSearchSuggestions(suggestions);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
        setProfileDropdownOpen(false);
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearchFocused(false);
      setSearch("");
    }
  };

  const handleVoiceSearch = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setShowVoiceSearch(true);
      recognition.onend = () => setShowVoiceSearch(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearch(transcript);
        navigate(`/search?q=${encodeURIComponent(transcript)}`);
      };

      recognition.start();
    }
  };

  const categories = {
    women: {
      title: "Women",
      image:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=300&fit=crop",
      sections: [
        {
          title: "Clothing",
          items: [
            "Dresses",
            "Tops",
            "Bottoms",
            "Ethnic Wear",
            "Western Wear",
            "Lingerie",
          ],
        },
        {
          title: "Footwear",
          items: [
            "Heels",
            "Flats",
            "Sneakers",
            "Boots",
            "Sandals",
            "Traditional",
          ],
        },
        {
          title: "Accessories",
          items: [
            "Bags",
            "Jewelry",
            "Watches",
            "Sunglasses",
            "Scarves",
            "Belts",
          ],
        },
        {
          title: "Beauty",
          items: [
            "Makeup",
            "Skincare",
            "Haircare",
            "Fragrance",
            "Nail Care",
            "Beauty Tools",
          ],
        },
      ],
      trending: [
        "Summer Dresses",
        "Crop Tops",
        "High Waist Jeans",
        "Statement Jewelry",
      ],
      brands: ["Zara", "H&M", "Forever 21", "Mango", "Vero Moda", "Only"],
    },
    men: {
      title: "Men",
      image:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&h=300&fit=crop",
      sections: [
        {
          title: "Clothing",
          items: [
            "Shirts",
            "T-Shirts",
            "Jeans",
            "Trousers",
            "Suits",
            "Ethnic Wear",
          ],
        },
        {
          title: "Footwear",
          items: [
            "Sneakers",
            "Formal Shoes",
            "Boots",
            "Loafers",
            "Sports Shoes",
            "Sandals",
          ],
        },
        {
          title: "Accessories",
          items: ["Watches", "Bags", "Belts", "Sunglasses", "Wallets", "Ties"],
        },
        {
          title: "Grooming",
          items: [
            "Skincare",
            "Haircare",
            "Beard Care",
            "Fragrance",
            "Shaving",
            "Body Care",
          ],
        },
      ],
      trending: [
        "Casual Shirts",
        "Denim Jackets",
        "Sports Sneakers",
        "Smart Watches",
      ],
      brands: [
        "Nike",
        "Adidas",
        "Levi's",
        "Tommy Hilfiger",
        "Calvin Klein",
        "Puma",
      ],
    },
    kids: {
      title: "Kids",
      image:
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=300&fit=crop",
      sections: [
        {
          title: "Boys (2-14 Years)",
          items: [
            "T-Shirts",
            "Shirts",
            "Jeans",
            "Shorts",
            "Ethnic Wear",
            "Party Wear",
          ],
        },
        {
          title: "Girls (2-14 Years)",
          items: [
            "Dresses",
            "Tops",
            "Skirts",
            "Jeans",
            "Ethnic Wear",
            "Party Wear",
          ],
        },
        {
          title: "Baby (0-2 Years)",
          items: [
            "Onesies",
            "Rompers",
            "Sets",
            "Sleepwear",
            "Bibs",
            "Accessories",
          ],
        },
        {
          title: "Footwear & Accessories",
          items: ["Shoes", "Sandals", "Bags", "Caps", "Socks", "Toys"],
        },
      ],
      trending: [
        "Cartoon T-Shirts",
        "Colorful Dresses",
        "Comfortable Shoes",
        "School Bags",
      ],
      brands: [
        "Disney",
        "Barbie",
        "Hot Wheels",
        "Peppa Pig",
        "Marvel",
        "Frozen",
      ],
    },
  };

  const quickLinks = [
    { name: "New Arrivals", icon: <FaFire />, mode: "new" },
    { name: "Sale", icon: <FaTags />, mode: "sale" },
    { name: "Premium", icon: <FaCrown />, mode: "premium" },
    { name: "Gift Cards", icon: <FaGift />, mode: "gift" },
  ];

  const MegaMenu = ({ category, data }) => (
    <div
      ref={megaMenuRef}
      className="fixed inset-x-0 z-50 animate-fade-in-down"
      style={{ top: "var(--nav-height)" }}
      onMouseEnter={() => setActiveMenu(category)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto mt-2 bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-8 p-8">
          {/* Image Section */}
          <div className="col-span-3">
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{data.title} Collection</h3>
                <p className="text-sm opacity-90">Discover the latest trends</p>
                <Link
                  to={`/shop?gender=${encodeURIComponent(data.title)}`}
                  className="inline-block mt-2 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-0"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="col-span-6">
            <div className="grid grid-cols-2 gap-6">
              {data.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-200 pb-2">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          to={`/shop?gender=${encodeURIComponent(data.title)}&category=${encodeURIComponent(item)}`}
                          className="text-sm text-gray-600 hover:text-primary-600 hover:translate-x-1 transform transition-all duration-200 block"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Trending & Brands Section */}
          <div className="col-span-3 space-y-6">
            {/* Trending */}
            <div>
              <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                <FaFire className="inline mr-2 text-orange-500" />
                Trending
              </h4>
              <ul className="space-y-2">
                {data.trending.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/search?q=${item}`}
                      className="text-sm text-gray-600 hover:text-primary-600 flex items-center group"
                    >
                      <FaStar className="w-3 h-3 mr-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Brands */}
            <div>
              <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">
                Top Brands
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {data.brands.map((brand, idx) => (
                  <Link
                    key={idx}
                    to={`/shop?brand=${brand}`}
                    className="text-xs text-gray-600 hover:text-primary-600 p-2 border border-gray-200 rounded hover:border-primary-200 hover:bg-primary-50 transition-all duration-200 text-center"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white border-b border-gray-100"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                <span>Free shipping above ₹999</span>
              </div>
              <div className="hidden md:flex items-center">
                <FaPhone className="w-3 h-3 mr-1" />
                <span>24/7 Support: 1800-123-4567</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/track"
                className="hover:text-primary-200 transition-colors"
              >
                <FaShippingFast className="w-4 h-4 inline mr-1" />
                Track Order
              </Link>
              <Link
                to="/offers"
                className="hover:text-primary-200 transition-colors"
              >
                <FaTags className="w-4 h-4 inline mr-1" />
                Offers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-1 relative">
        {/* Absolute Logo pinned to left */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Link to="/" className="block" aria-label={BRAND_NAME}>
            <img
              src={BRAND_LOGO_SRC}
              alt={BRAND_NAME}
              className="h-12 sm:h-16 lg:h-24 w-auto max-h-28 object-contain drop-shadow-md"
            />
          </Link>
        </div>
        <div className="flex justify-between items-center h-16 lg:h-16 pl-20 sm:pl-28 lg:pl-40">

          {/* Desktop Navigation (hidden when search is focused) */}
          <div className={`hidden lg:flex items-center space-x-8 ${searchFocused ? "lg:hidden" : ""}`}>
            {Object.entries(categories).map(([key, data]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveMenu(key)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={`/shop?gender=${encodeURIComponent(data.title)}`}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    location.pathname.includes(key)
                      ? "text-primary-600 bg-primary-50 rounded-lg"
                      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg"
                  }`}
                >
                  {data.title}
                  <FaChevronDown
                    className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                      activeMenu === key ? "rotate-180" : ""
                    }`}
                  />
                </Link>
                {activeMenu === key && <MegaMenu category={key} data={data} />}
              </div>
            ))}

            {quickLinks.map((link, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCollectionModal({ open: true, mode: link.mode })}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <span className="mr-2 text-primary-500">{link.icon}</span>
                {link.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className={`hidden md:flex items-center ${searchFocused ? "flex-[2] max-w-3xl" : "flex-1 max-w-md"} mx-8 transition-all duration-200`}> 
            <div className="relative w-full group">
              <form onSubmit={handleSearch} className="relative">
                <div
                  className={`relative transition-all duration-500 ease-out ${
                    searchFocused ? "scale-105" : ""
                  }`}
                >
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search for products, brands..."
                    className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 focus:bg-white transition-all duration-500 ease-out group-hover:shadow-md group-hover:ring-1 group-hover:ring-primary-200 group-hover:bg-white group-hover:scale-[1.01]"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={handleVoiceSearch}
                      className={`p-2 text-gray-400 hover:text-primary-600 rounded-lg transition-colors ${
                        showVoiceSearch ? "text-red-500 animate-pulse" : ""
                      }`}
                      title="Voice search"
                    >
                      <FaMicrophone className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-primary-600 rounded-lg transition-colors"
                      title="Visual search"
                    >
                      <FaCamera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Search Suggestions */}
              {searchFocused && searchSuggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
                  {searchSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearch(suggestion);
                        navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                        setSearchFocused(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center"
                    >
                      <FaSearch className="w-3 h-3 mr-3 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions (hide some when searching) */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            {!searchFocused && (
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors group"
              title="Wishlist"
            >
              <FaHeart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </button>
            )}

            {/* Cart */}
            {!searchFocused && (
            <MiniCartPopover
              items={cartItems}
              onCheckout={onOpenCart}
              onTriggerClick={onOpenCart}
              trigger={
                <span title="Shopping Cart">
                  <FaShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </span>
              }
            />
            )}

            {/* Notifications */}
            {user && !searchFocused && (
              <button
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
                title="Notifications"
              >
                <FaBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
              </button>
            )}

            {/* User Menu */}
            <div className="relative">
              {user ? (
                <button
                  ref={profileButtonRef}
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <FaChevronDown
                    className={`w-3 h-3 text-gray-400 transition-transform ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 transform hover:scale-105"
                >
                  <FaUser className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}

              {/* Profile Dropdown */}
              {profileDropdownOpen && user && (
                <div 
                  className="fixed w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fade-in-down"
                  style={{
                    top: `${(profileButtonRef.current?.getBoundingClientRect().bottom || 0) + 8}px`,
                    right: '1rem',
                    zIndex: 9999
                  }}
                >
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <FaUser className="w-4 h-4 mr-3" />
                      My Profile
                    </Link>
                    <Link
                      to="/profile?tab=orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <FaHistory className="w-4 h-4 mr-3" />
                      Order History
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <FaCog className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 py-2">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        navigate("/", { replace: true });
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in-down">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Mobile Navigation Links */}
            {Object.entries(categories).map(([key, data]) => (
              <Link
                key={key}
                to={`/shop?gender=${encodeURIComponent(data.title)}`}
                className="block py-3 text-gray-700 hover:text-primary-600 font-medium border-b border-gray-100 last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {data.title}
              </Link>
            ))}

            {quickLinks.map((link, idx) => (
              <button
                key={idx}
                type="button"
                className="flex items-center w-full py-3 text-left text-gray-700 hover:text-primary-600 font-medium border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setCollectionModal({ open: true, mode: link.mode });
                  setIsOpen(false);
                }}
              >
                <span className="mr-3 text-primary-500">{link.icon}</span>
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Collection modal */}
      <CollectionModal
        open={collectionModal.open}
        mode={collectionModal.mode}
        onClose={() => setCollectionModal({ open: false, mode: "new" })}
        onAddToCart={onAddToCart}
      />
    </nav>
  );
};

export default NavBar;
