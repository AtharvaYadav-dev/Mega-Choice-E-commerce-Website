import React, { useEffect, useRef, useState } from "react";

export default function MiniCartPopover({ items = [], onCheckout, trigger, onTriggerClick }) {
  const [open, setOpen] = useState(false);
  const t = useRef();
  const dialogRef = useRef(null);

  const scheduleClose = () => {
    clearTimeout(t.current);
    t.current = setTimeout(() => setOpen(false), 180);
  };

  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearTimeout(t.current);
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors group"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          if (typeof onTriggerClick === "function") {
            onTriggerClick();
          } else {
            setOpen((v) => !v);
          }
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {trigger}
        <span className="sr-only">Open cart</span>
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label="Mini cart"
          tabIndex={-1}
          className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl p-3 z-50 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              setOpen(false);
            }
            if (e.key === "Tab") {
              // basic focus trap
              const focusable = dialogRef.current?.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
              );
              if (!focusable || focusable.length === 0) return;
              const first = focusable[0];
              const last = focusable[focusable.length - 1];
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }}
        >
          {items.length === 0 ? (
            <div className="text-sm text-gray-600">Your cart is empty.</div>
          ) : (
            <>
              <div className="max-h-64 overflow-auto divide-y">
                {items.slice(0, 3).map((i) => (
                  <div key={i.id} className="flex items-center gap-3 py-2">
                    <img src={i.image} alt={i.title} loading="lazy" className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <div className="text-sm line-clamp-1">{i.title}</div>
                      <div className="text-xs text-gray-500">Qty {i.qty || 1}</div>
                    </div>
                    <div className="text-sm font-semibold">₹{((i.price || 0) * (i.qty || 1)).toLocaleString("en-IN")}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="text-base font-bold">₹{subtotal.toLocaleString("en-IN")}</div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href="/cart" className="px-3 py-2 text-sm rounded-md border hover:bg-gray-50 text-center">View Cart</a>
                <button onClick={onCheckout} className="px-3 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-black">Checkout</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
