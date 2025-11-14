import React from "react";
import { Link } from "react-router-dom";

function CategoryTiles() {
  const categories = [
    {
      key: "men",
      title: "Men",
      img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1200&auto=format&fit=crop",
    },
    {
      key: "women",
      title: "Women",
      img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
    },
    {
      key: "kids",
      title: "Kids",
      img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              key={c.key}
              to={`/shop?gender=${c.title}`}
              className="relative rounded-xl overflow-hidden shadow hover:shadow-md transition hover:scale-105"
            >
              <img
                src={c.img}
                alt={c.title}
                className="h-48 w-full object-cover hover:scale-110 transition"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-flex px-3 py-1 rounded-md bg-white/90 text-gray-900 font-medium">
                  {c.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryTiles;
