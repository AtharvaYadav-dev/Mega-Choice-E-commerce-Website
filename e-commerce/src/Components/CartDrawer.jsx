import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
function CartDrawer({
  open,
  onClose,
  items = [],
  onRemoveOne,
  onIncreaseOne,
  onRemoveAll,
}) {
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const freeShip = 3000;
  const remaining = Math.max(0, freeShip - subtotal);
  const progress = Math.min(100, Math.round((subtotal / freeShip) * 100));

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl border-l border-gray-100 transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"} flex flex-col rounded-none lg:rounded-l-2xl will-change-transform`}
      >
        <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b shrink-0 bg-white/80 backdrop-blur">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900">
            <span className="text-primary-600">
              <FaShoppingCart />
            </span>
            <span>Your Cart</span>
          </h3>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z" clipRule="evenodd"/></svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center border border-dashed rounded-xl p-10 text-gray-600 bg-gray-50/60">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-white shadow flex items-center justify-center">
                <FaShoppingCart className="text-gray-400" />
              </div>
              <p className="mb-4 text-gray-700 font-medium">Your cart is empty</p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-colors"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          ₹{item.price} each
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg overflow-hidden border border-gray-200">
                        <button
                          className="px-2.5 py-1.5 hover:bg-gray-50 text-gray-700"
                          onClick={() => onRemoveOne && onRemoveOne(item.id)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 py-1.5 text-sm min-w-[2ch] text-center">{item.qty}</span>
                        <button
                          className="px-2.5 py-1.5 hover:bg-gray-50 text-gray-700"
                          onClick={() =>
                            onIncreaseOne && onIncreaseOne(item.id)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                        onClick={() => onRemoveAll && onRemoveAll(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t shrink-0">
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>
                {progress < 100
                  ? `₹${remaining} away from free shipping`
                  : "You unlocked free shipping!"}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                navigate("/cart");
                onClose();
              }}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 disabled:opacity-60 font-semibold shadow-sm transition-colors"
              disabled={items.length === 0}
            >
              View Full Cart
            </button>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60 transition-colors font-medium shadow-sm"
                disabled={items.length === 0}
              >
                Quick Checkout
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;
