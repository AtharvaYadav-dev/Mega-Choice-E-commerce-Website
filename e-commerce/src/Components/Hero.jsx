import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaShoppingBag,
  FaTruck,
  FaHeart,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      bg: "linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(190, 24, 93, 0.9) 100%)",
      title: "SUMMER SALE",
      subtitle: "Up to 70% OFF",
      description: "Discover the latest trends in fashion",
      cta: "Shop Collection",
      link: "/shop",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
      badge: "LIMITED TIME",
      stats: { customers: "10K+", rating: "4.9", products: "500+" },
      features: ["Free Shipping", "Easy Returns", "24/7 Support"],
    },
    {
      id: 2,
      bg: "linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(234, 88, 12, 0.9) 100%)",
      title: "ETHNIC COLLECTION",
      subtitle: "Traditional Meets Modern",
      description: "Celebrate every occasion with style",
      cta: "Explore Now",
      link: "/shop?category=ethnic",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
      badge: "FESTIVE SPECIAL",
      stats: { customers: "8K+", rating: "4.8", products: "200+" },
      features: ["Premium Quality", "Authentic Designs", "Custom Sizes"],
    },
    {
      id: 3,
      bg: "linear-gradient(135deg, rgba(14, 165, 233, 0.9) 0%, rgba(3, 105, 161, 0.9) 100%)",
      title: "MEN'S FASHION",
      subtitle: "Redefine Your Style",
      description: "From casual to formal, we've got you covered",
      cta: "Shop Men's",
      link: "/shop?gender=Men",
      image:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
      badge: "NEW ARRIVALS",
      stats: { customers: "12K+", rating: "4.7", products: "300+" },
      features: ["Trending Styles", "Premium Fabrics", "Perfect Fit"],
    },
    {
      id: 4,
      bg: "linear-gradient(135deg, rgba(139, 69, 19, 0.9) 0%, rgba(101, 48, 13, 0.9) 100%)",
      title: "WINTER COLLECTION",
      subtitle: "Stay Warm, Look Cool",
      description: "Premium jackets and winter wear",
      cta: "Winter Sale",
      link: "/shop?category=winter",
      image:
        "https://images.unsplash.com/photo-1544966503-7e2d0c8d2e2a?w=1200&auto=format&fit=crop&ixlib=rb-4.0.3",
      badge: "BESTSELLER",
      stats: { customers: "15K+", rating: "4.9", products: "150+" },
      features: ["Weather Resistant", "Stylish Designs", "Comfort First"],
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 6000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, slides.length]);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8q  ">
        {/* Main Hero Slider */}
        <div
          ref={heroRef}
          className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === current
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
                }`}
              style={{
                background: slide.bg,
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
                transform:
                  idx === current
                    ? `translate3d(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px, 0) scale(1.02)`
                    : "translate3d(0, 0, 0) scale(1.05)",
              }}
            >
              {/* Animated Background Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Elements (behind content) */}
              <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + i}s`,
                    }}
                  />
                ))}
              </div>

              {/* Content (above particles) */}
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full lg:w-3/5 px-6 sm:px-8 lg:px-16 text-white pt-24 sm:pt-24 lg:pt-0">
                  {/* Badge */}
                  <div className="inline-block mb-3 sm:mb-6 animate-fade-in-down">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30 shadow-lg">
                      <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
                      {slide.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-2 sm:mb-6 text-shadow-lg leading-tight animate-fade-in-up">
                    <span
                      className="inline-block animate-bounce-gentle"
                      style={{ animationDelay: "0.1s" }}
                    >
                      {slide.title}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <h2
                    className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-shadow animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-8 opacity-90 text-shadow max-w-md animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    {slide.description}
                  </p>

                  {/* Features */}
                  <div
                    className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8 animate-fade-in-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    {slide.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full"
                      >
                        <FaStar className="w-3 h-3 mr-1.5 sm:mr-2 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <Link
                      to={slide.link}
                      className="group relative z-20 inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                      <FaShoppingBag className="mr-2 sm:mr-3 group-hover:animate-bounce" />
                      {slide.cta}
                      <FaArrowRight className="ml-2 sm:ml-3 transform group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button className="inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full font-semibold text-sm sm:text-base hover:bg-white/30 transition-all duration-300">
                      <FaHeart className="mr-2" />
                      Add to Wishlist
                    </button>
                  </div>

                  {/* Stats */}
                  <div
                    className="flex gap-6 mt-8 animate-fade-in-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {slide.stats.customers}
                      </div>
                      <div className="text-sm opacity-80">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-2xl font-bold">
                        {slide.stats.rating}
                        <FaStar className="ml-1 text-yellow-400 w-5 h-5" />
                      </div>
                      <div className="text-sm opacity-80">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {slide.stats.products}
                      </div>
                      <div className="text-sm opacity-80">Products</div>
                    </div>
                  </div>
                </div>

                {/* Side Product Preview */}
                <div className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-float">
                    <div className="w-32 h-40 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
                      <FaShoppingBag className="text-4xl text-white/60" />
                    </div>
                    <div className="text-white text-center">
                      <div className="font-semibold mb-1">Featured Product</div>
                      <div className="text-sm opacity-80">
                        Starting from ₹999
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <div
            className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}
          >
            <button
              onClick={prevSlide}
              className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            <button
              onClick={nextSlide}
              className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>

          {/* Play/Pause Button (smaller on mobile) */}
          <button
            onClick={togglePlayPause}
            className={`absolute top-4 sm:top-6 right-4 sm:right-6 w-9 h-9 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 shadow-lg ${isHovering ? "opacity-100" : "opacity-70"}`}
            aria-label={isPlaying ? 'Pause slides' : 'Play slides'}
          >
            {isPlaying ? (
              <FaPause className="text-xs sm:text-sm" />
            ) : (
              <FaPlay className="text-xs sm:text-sm ml-0.5" />
            )}
          </button>

          {/* Progress Indicators (smaller and lower on mobile) */}
          <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex gap-2 sm:gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 border border-white/50 shadow-md ${idx === current
                    ? "w-8 sm:w-12 bg-white"
                    : "w-2.5 sm:w-3 bg-white/40 hover:bg-white/60"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Slide Number (smaller on mobile) */}
          <div className="absolute z-10 top-4 sm:top-6 left-4 sm:left-6 text-white/80 font-mono text-xs sm:text-sm bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <FaTruck className="text-3xl text-primary-500" />,
              title: "Free Shipping",
              description: "Free delivery on orders above ₹999",
              gradient: "from-blue-400 to-blue-600",
            },
            {
              icon: <FaShieldAlt className="text-3xl text-primary-500" />,
              title: "Easy Returns",
              description: "30-day return & exchange policy",
              gradient: "from-green-400 to-green-600",
            },
            {
              icon: <FaHeart className="text-3xl text-primary-500" />,
              title: "24/7 Support",
              description: "Round the clock customer support",
              gradient: "from-yellow-200 to-blue-400",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="card-interactive group p-8 text-center animate-fade-in-up"
              style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-bounce-gentle`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay Updated with Latest Trends
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new
              collections, sales, and exclusive offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="px-8 py-4 bg-white text-primary-600 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>

            <p className="text-sm opacity-75 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
