import React from "react";
import { useToast } from "../hooks/useToast.js";

function Wishlist({ items = [], onRemove, onAddToCart }) {
  const { addToast } = useToast();
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Wishlist</h1>
          {items.length > 0 && (
            <button
              className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
              disabled={!items.some((i) => i.price)}
              onClick={() => {
                items.forEach((i) => {
                  if (i.price) onAddToCart && onAddToCart(i);
                });
                addToast("Added all to cart", "success");
              }}
            >
              Add all to cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center border border-dashed rounded-lg p-10 text-gray-600">
            <div className="text-4xl mb-3">♥</div>
            <p className="mb-3">No items in wishlist yet.</p>
            <a
              href="/shop"
              className="inline-flex items-center px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700"
            >
              Go to Shop
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <div
                key={it.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <div className="aspect-4/5 bg-gray-100">
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-gray-900">
                    {it.title}
                  </div>
                  <div className="text-sm text-gray-700">
                    {it.price ? `₹${it.price}` : "Price TBD"}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
                      disabled={!it.price}
                      onClick={() => {
                        onAddToCart && onAddToCart(it);
                        addToast("Added to cart", "success");
                      }}
                    >
                      Add to cart
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-md border hover:bg-gray-50"
                      onClick={() => {
                        onRemove && onRemove(it.id);
                        addToast("Removed from wishlist", "info");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishlist;
