import React, { useEffect, useState } from "react";

export default function StickyCTA({ onAddToCart, price, label = "Add to Cart" }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:static md:mt-6">
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${compact ? "pb-3" : ""}`}>
        <div className={`md:static md:shadow-none md:border md:rounded-lg ${compact ? "shadow-2xl" : ""}`}>
          <div className={`flex items-center gap-3 bg-white ${compact ? "p-3 border rounded-xl" : "p-4 md:p-0"}`}>
            <div className="hidden md:block text-gray-900 font-bold">₹{price?.toLocaleString("en-IN")}</div>
            <button
              onClick={onAddToCart}
              className="flex-1 md:flex-none md:min-w-[220px] inline-flex items-center justify-center px-4 py-3 rounded-md bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
