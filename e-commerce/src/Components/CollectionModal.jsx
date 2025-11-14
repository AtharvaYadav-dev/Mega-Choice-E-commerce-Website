import React from "react";
import productsData from "../data/products";

const premiumBrands = new Set([
  "Nike",
  "Adidas",
  "Puma",
  "Zara",
  "H&M",
  "Levi's",
  "Tommy Hilfiger",
  "Calvin Klein",
]);

function useCollection(mode) {
  let arr = [...productsData];
  if (mode === "sale") {
    arr = arr.filter((p) => Number(p.discount || 0) >= 30);
  } else if (mode === "premium") {
    arr = arr.filter((p) => premiumBrands.has(p.brand) || Number(p.price) >= 3000);
  } else if (mode === "new") {
    // keep all, sort later
  }
  if (mode === "new") arr.sort((a, b) => (b.createdAt || b.id) - (a.createdAt || a.id));
  return arr.slice(0, 8);
}

const CollectionModal = ({ open, mode = "new", onClose, onAddToCart }) => {
  const items = useCollection(mode);

  const containerRef = React.useRef(null);
  const firstFocusRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "Tab") {
        const focusable = containerRef.current?.querySelectorAll(
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
    };
    document.addEventListener("keydown", onKey);
    setTimeout(() => firstFocusRef.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const title = mode === "sale" ? "Sale" : mode === "premium" ? "Premium" : mode === "gift" ? "Gift Cards" : "New Arrivals";

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-x-0 top-[calc(var(--nav-height)+8px)] mx-auto w-full max-w-6xl px-4">
        <div ref={containerRef} className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-transform duration-200 ease-out flex flex-col"
             style={{ maxHeight: "calc(100vh - (var(--nav-height) + 24px))" }}>
          <div className={`px-5 sm:px-6 py-4 flex items-center justify-between border-b ${mode === "sale" ? "bg-gradient-to-r from-orange-500/10 to-rose-500/10" : mode === "premium" ? "bg-gradient-to-r from-gray-900/10 to-gray-600/10" : mode === "gift" ? "bg-gradient-to-r from-pink-500/10 to-rose-500/10" : "bg-gradient-to-r from-primary-600/10 to-primary-500/10"}`}>
            <div className="flex items-center gap-3">
              <span className={`${mode === "sale" ? "text-rose-600" : mode === "premium" ? "text-gray-900" : mode === "gift" ? "text-pink-600" : "text-primary-600"}`}>★</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">Quick preview. Click View all to explore more.</p>
              </div>
            </div>
            <button ref={firstFocusRef} onClick={onClose} className="w-9 h-9 inline-flex items-center justify-center rounded-lg border hover:bg-gray-100" aria-label="Close">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
          {mode === "gift" ? (
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[500,1000,2000,3000,5000,10000].map((amt) => (
                  <div key={amt} className="border rounded-xl p-5 bg-white hover:shadow-md transition-shadow">
                    <div className="text-sm text-gray-500">Digital Gift Card</div>
                    <div className="mt-1 text-2xl font-extrabold text-gray-900">₹{amt.toLocaleString("en-IN")}</div>
                    <p className="mt-1 text-sm text-gray-600">Send instantly via email. Valid for 1 year.</p>
                  </div>
                ))}
              </div>
              <div className="px-1 pt-4 text-right">
                <a href="/gift-cards" className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700">View all</a>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((p) => (
                  <div key={p.id} className="group rounded-xl border hover:shadow-lg transition overflow-hidden bg-white flex flex-col">
                    <a href={`/shop?q=${encodeURIComponent(p.title)}`} className="block">
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                        <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    </a>
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="text-[11px] text-gray-600 uppercase tracking-wide line-clamp-1">{p.brand || p.category}</div>
                      <a href={`/shop?q=${encodeURIComponent(p.title)}`} className="mt-0.5 text-sm font-semibold text-gray-900 line-clamp-2 hover:text-primary-600">{p.title}</a>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="text-sm font-bold text-gray-900">₹{p.price.toLocaleString("en-IN")}</div>
                        {p.discount ? (
                          <span className="text-xs text-green-600 font-medium">({p.discount}% off)</span>
                        ) : null}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onAddToCart && onAddToCart({ id: p.id, title: p.title, price: p.price, image: p.image })}
                          className="px-2 py-1.5 text-xs rounded-md bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium"
                        >
                          Add to Cart
                        </button>
                        <a
                          href={`/shop?q=${encodeURIComponent(p.title)}`}
                          className="px-2 py-1.5 text-xs rounded-md border hover:bg-gray-50 text-gray-700 text-center"
                        >
                          Quick View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-1 pt-4 text-right">
                <a href={mode === "sale" ? "/sale" : mode === "premium" ? "/premium" : "/new"} className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700">View all</a>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
