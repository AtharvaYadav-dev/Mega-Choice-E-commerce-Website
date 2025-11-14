import React from "react";
import { Link } from "react-router-dom";

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Women Ethnic",
      icon: "👗",
      link: "/shop?gender=Women&category=Kurtas",
      bg: "bg-pink-50",
      color: "text-pink-600",
    },
    {
      name: "Women Western",
      icon: "👚",
      link: "/shop?gender=Women&category=Tops",
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      name: "Men",
      icon: "👔",
      link: "/shop?gender=Men",
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      name: "Kids",
      icon: "🧒",
      link: "/shop?gender=Kids",
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      name: "Home & Kitchen",
      icon: "🏠",
      link: "/shop?category=Home",
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      name: "Beauty",
      icon: "💄",
      link: "/shop?category=Beauty",
      bg: "bg-rose-50",
      color: "text-rose-600",
    },
    {
      name: "Jewellery",
      icon: "💍",
      link: "/shop?category=Jewellery",
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
    {
      name: "Bags",
      icon: "👜",
      link: "/shop?category=Bags",
      bg: "bg-indigo-50",
      color: "text-indigo-600",
    },
  ];

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className={`${cat.bg} rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-md transition hover:scale-105`}
            >
              <div className={`text-4xl mb-2 transition`}>{cat.icon}</div>
              <div
                className={`text-xs sm:text-sm font-medium ${cat.color} text-center`}
              >
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
