import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaHeart,
  FaArrowUp,
  FaApple,
  FaGooglePlay,
  FaStar,
  FaAward,
  FaUsers,
  FaGlobe,
  FaPaperPlane,
  FaGift,
} from "react-icons/fa";
import { BRAND_NAME, BRAND_LOGO_SRC } from "../brand";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = {
    shop: {
      title: "Shop",
      links: [
        { name: "Women", href: "/shop?gender=Women" },
        { name: "Men", href: "/shop?gender=Men" },
        { name: "Kids", href: "/shop?gender=Kids" },
        { name: "New Arrivals", href: "/new" },
        { name: "Sale", href: "/sale" },
        { name: "Best Sellers", href: "/bestsellers" },
        { name: "Gift Cards", href: "/gift-cards" },
      ],
    },
    help: {
      title: "Customer Care",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns & Exchanges", href: "/returns" },
        { name: "Track Your Order", href: "/track" },
        { name: "FAQ", href: "/faq" },
        { name: "Live Chat", href: "/chat" },
      ],
    },
    company: {
      title: `About ${BRAND_NAME}`,
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Investor Relations", href: "/investors" },
        { name: "Affiliate Program", href: "/affiliate" },
        { name: "Store Locator", href: "/stores" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Security", href: "/security" },
        { name: "Accessibility", href: "/accessibility" },
        { name: "CA Privacy Rights", href: "/ca-privacy" },
      ],
    },
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/login/",
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      href: "https://twitter.com/login",
      color: "hover:text-sky-400",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/accounts/login/",
      color: "hover:text-pink-500",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      href: "https://www.youtube.com/",
      color: "hover:text-red-500",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/login",
      color: "hover:text-blue-600",
    },
    {
      name: "Pinterest",
      icon: <FaPinterestP />,
      href: "https://www.pinterest.com/login/",
      color: "hover:text-red-600",
    },
  ];

  const paymentMethods = [
    "Visa",
    "Mastercard",
    "American Express",
    "PayPal",
    "Apple Pay",
    "Google Pay",
    "UPI",
    "Net Banking",
  ];

  const trustBadges = [
    {
      icon: <FaShieldAlt />,
      text: "Secure Payment",
      desc: "256-bit SSL encryption",
    },
    { icon: <FaTruck />, text: "Free Shipping", desc: "On orders over ₹999" },
    { icon: <FaAward />, text: "Quality Assured", desc: "Premium materials" },
    { icon: <FaUsers />, text: "10M+ Customers", desc: "Trusted worldwide" },
  ];

  const stats = [
    { number: "10M+", label: "Happy Customers" },
    { number: "500+", label: "Global Brands" },
    { number: "50+", label: "Countries Served" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Stay in the Loop
              </h3>
              <p className="text-xl text-primary-100 mb-6">
                Get exclusive offers, style tips, and be the first to know about
                new collections
              </p>
              <div className="flex items-center space-x-4 text-sm text-primary-200">
                <div className="flex items-center">
                  <FaStar className="w-4 h-4 mr-1 text-yellow-400" />
                  <span>Exclusive deals</span>
                </div>
                <div className="flex items-center">
                  <FaGift className="w-4 h-4 mr-1" />
                  <span>Early access</span>
                </div>
                <div className="flex items-center">
                  <FaHeart className="w-4 h-4 mr-1" />
                  <span>Style inspiration</span>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleNewsletterSubmit} className="max-w-md">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-t-xl sm:rounded-t-none sm:rounded-l-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95"
                      required
                    />
                    <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white text-primary-600 rounded-b-xl sm:rounded-b-none sm:rounded-r-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center"
                  >
                    <FaPaperPlane className="w-4 h-4 mr-2" />
                    Subscribe
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-white mt-3 flex items-center animate-fade-in-up">
                    <FaHeart className="w-4 h-4 mr-2 text-red-400" />
                    Thank you for subscribing!
                  </p>
                )}
                <p className="text-primary-200 text-sm mt-3">
                  Join 2M+ subscribers. No spam, unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {badge.text}
                  </h4>
                  <p className="text-xs text-gray-400">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Desktop/Tablet grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center group">
              <img src={BRAND_LOGO_SRC} alt={BRAND_NAME} className="w-16 h-16 object-contain mr-3 rounded" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                {BRAND_NAME}
              </span>
            </Link>

            <p className="text-gray-400 leading-relaxed">
              Redefining fashion with sustainable, stylish, and affordable
              clothing for every individual. Join millions who trust us for
              their fashion needs.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">
                  123 Fashion Street, Style District, Mumbai 400001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">support@megachoice.com</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links (md+) */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile accordions (<md) */}
        <div className="md:hidden space-y-4">
          {Object.entries(footerSections).map(([key, section]) => (
            <details key={key} className="group border border-gray-800 rounded-lg bg-gray-850/20">
              <summary className="list-none cursor-pointer select-none flex items-center justify-between px-4 py-3 text-sm font-semibold text-white">
                <span>{section.title}</span>
                <span className="transition-transform group-open:rotate-180">▾</span>
              </summary>
              <div className="px-4 pb-3">
                <ul className="space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.href}
                        className="block py-1 text-sm text-gray-400 hover:text-primary-400"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

        {/* App Download Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
            <div>
              <h4 className="font-semibold text-white mb-4">
                Download Our App
              </h4>
              <p className="text-gray-400 text-sm mb-6 max-w-md">
                Shop on the go with exclusive app-only offers and seamless
                mobile experience
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors group"
                >
                  <FaApple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors group"
                >
                  <FaGooglePlay className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} hover:scale-110 transition-all duration-200`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-gray-400 text-xs mt-3">
                Follow us for daily style inspiration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p>© 2024 {BRAND_NAME}. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <FaGlobe className="w-4 h-4" />
                <select className="bg-transparent border-none text-gray-400 focus:outline-none">
                  <option>English</option>
                  <option>हिंदी</option>
                  <option>తెలుగు</option>
                </select>
                <select className="bg-transparent border-none text-gray-400 focus:outline-none">
                  <option>INR ₹</option>
                  <option>USD $</option>
                  <option>EUR €</option>
                </select>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">We Accept:</span>
              <div className="flex items-center space-x-2">
                <FaCreditCard className="w-8 h-5 text-gray-400" />
                {paymentMethods.slice(0, 4).map((method, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center text-gray-400"
                    title={method}
                  >
                    {method.slice(0, 2)}
                  </div>
                ))}
                <span className="text-xs text-gray-500">+4 more</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-40 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-4 h-4 group-hover:animate-bounce" />
        </button>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
