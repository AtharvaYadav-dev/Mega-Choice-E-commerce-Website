import React from "react";
import { Link } from "react-router-dom";

export default function TrendingDeals() {
  const deals = [
    {
      title: "Sarees Under ₹499",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop",
      link: "/shop?gender=Women&category=Sarees&priceMax=499",
      badge: "Min 50% Off",
    },
    {
      title: "T-Shirts Starting ₹199",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop",
      link: "/shop?gender=Men&category=T-Shirts&priceMin=199",
      badge: "Trending",
    },
    {
      title: "Kurtas Under ₹399",
      image:
        "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&auto=format&fit=crop",
      link: "/shop?gender=Women&category=Kurtas&priceMax=399",
      badge: "Bestseller",
    },
    {
      title: "Kids Wear Under ₹299",
      image:
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&auto=format&fit=crop",
      link: "/shop?gender=Kids&priceMax=299",
      badge: "New",
    },
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending Deals</h2>
          <Link
            to="/shop"
            className="text-rose-600 hover:text-rose-700 font-medium text-sm"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((deal, idx) => (
            <Link
              key={idx}
              to={deal.link}
              className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="aspect-square">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4">
                <div className="text-white">
                  <div className="text-xs font-semibold bg-rose-600 inline-block px-2 py-1 rounded mb-2">
                    {deal.badge}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base">
                    {deal.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
