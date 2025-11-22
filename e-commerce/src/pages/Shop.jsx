import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useLocation, useSearchParams } from "react-router-dom";
import QuickViewModal from "../Components/QuickViewModal";
import { useToast } from "../hooks/useToast.js";
import { api } from "../lib/api.js";

function Shop({
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
  onOpenWishlist,
}) {
  const location = useLocation();
  const pathname = location.pathname || "/shop";
  const mode = pathname.startsWith("/new")
    ? "new"
    : pathname.startsWith("/sale")
      ? "sale"
      : pathname.startsWith("/premium")
        ? "premium"
        : pathname.startsWith("/gift-cards")
          ? "gift"
          : pathname.startsWith("/bestsellers")
            ? "bestsellers"
            : null;

  const [params, setParams] = useSearchParams();
  const activeBrand = params.get("brand");
  const query = params.get("q")?.trim() || "";
  const { addToast } = useToast();

  // UI state
  const [sort, setSort] = useState("pop");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [minDiscount, setMinDiscount] = useState("all");
  const [sizes, setSizes] = useState([]);
  const [gender, setGender] = useState("all");
  const [category, setCategory] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSize = (s) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const premiumBrands = useMemo(
    () => new Set(["Nike", "Adidas", "Puma", "Zara", "H&M", "Levi's", "Tommy Hilfiger", "Calvin Klein"]),
    []
  );
  const uniqueBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))),
    [products]
  );
  const uniqueCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
    [products]
  );

  const inPriceRange = useCallback(
    (price) => {
      const min = priceMin === "" ? -Infinity : Number(priceMin);
      const max = priceMax === "" ? Infinity : Number(priceMax);
      return price >= min && price <= max;
    },
    [priceMin, priceMax]
  );
  const meetsDiscount = useCallback(
    (disc) => {
      if (minDiscount === "all") return true;
      return disc >= Number(minDiscount);
    },
    [minDiscount]
  );
  const meetsSizes = useCallback(
    (itemSizes) => {
      if (sizes.length === 0) return true;
      return sizes.some((s) => itemSizes.includes(s));
    },
    [sizes]
  );
  const meetsGender = useCallback(
    (g) => {
      if (gender === "all") return true;
      return g === gender;
    },
    [gender]
  );
  const meetsCategory = useCallback(
    (c) => {
      if (category === "all") return true;
      return c === category;
    },
    [category]
  );

  const filtered = useMemo(() => {
    let arr = [...products];
    if (mode === "sale") {
      arr = arr.filter((p) => Number(p.discount || 0) >= 30);
    } else if (mode === "premium") {
      arr = arr.filter((p) => premiumBrands.has(p.brand) || Number(p.price) >= 3000);
    } else if (mode === "bestsellers") {
      arr = arr.filter(
        (p) => p.isBestseller || (Number(p.reviews || 0) >= 200) || (Number(p.rating || 0) >= 4.3)
      );
    }
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }
    if (activeBrand) {
      arr = arr.filter((p) => p.brand.toLowerCase() === activeBrand.toLowerCase());
    }
    arr = arr.filter(
      (p) =>
        inPriceRange(p.price) &&
        meetsDiscount(p.discount) &&
        meetsSizes(p.sizes) &&
        meetsGender(p.gender) &&
        meetsCategory(p.category)
    );
    if (mode === "new") {
      arr.sort((a, b) => (b.createdAt || b.id) - (a.createdAt || a.id));
    } else if (sort === "plh") {
      arr.sort((a, b) => a.price - b.price);
    } else if (sort === "phl") {
      arr.sort((a, b) => b.price - a.price);
    } else if (sort === "disc") {
      arr.sort((a, b) => b.discount - a.discount);
    }
    return arr;
  }, [
    products,
    mode,
    query,
    activeBrand,
    priceMin,
    priceMax,
    minDiscount,
    sizes,
    gender,
    category,
    sort,
    inPriceRange,
    meetsDiscount,
    meetsSizes,
    meetsGender,
    meetsCategory,
    premiumBrands,
  ]);

  const clearBrand = () => {
    params.delete("brand");
    setParams(params, { replace: true });
  };
  if (ps) setSort(ps);
  const pmin = params.get("priceMin");
  if (pmin !== null) setPriceMin(pmin);
  const pmax = params.get("priceMax");
  if (pmax !== null) setPriceMax(pmax);
  const disc = params.get("minDiscount");
  if (disc) setMinDiscount(disc);
  const sz = params.get("sizes");
  if (sz) setSizes(sz.split(",").filter(Boolean));
  const gen = params.get("gender");
  if (gen) setGender(gen);
  const cat = params.get("category");
  if (cat) setCategory(cat);
  const hasAnyUrl =
    ps ||
    pmin !== null ||
    pmax !== null ||
    disc ||
    sz ||
    gen ||
    cat ||
    params.get("brand") ||
    params.get("q");
  if (!hasAnyUrl) {
    try {
      const saved = JSON.parse(localStorage.getItem("shop_filters") || "{}");
      if (saved.sort) setSort(saved.sort);
      if (saved.priceMin !== undefined) setPriceMin(saved.priceMin);
      if (saved.priceMax !== undefined) setPriceMax(saved.priceMax);
      if (saved.minDiscount) setMinDiscount(saved.minDiscount);
      if (Array.isArray(saved.sizes)) setSizes(saved.sizes);
      if (saved.gender) setGender(saved.gender);
      if (saved.category) setCategory(saved.category);
      if (saved.brand) setParams({ brand: saved.brand }, { replace: true });
      if (saved.q)
        setParams((prev) => {
          const next = new URLSearchParams(prev);
          next.set("q", saved.q);
          return next;
        }, { replace: true });
    } catch (e) {
      console.warn("Failed to load saved filters:", e);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// Show loading skeletons on filter/sort/page changes
useEffect(() => {
  setLoading(true);
  const t = setTimeout(() => setLoading(false), 200);
  return () => clearTimeout(t);
}, [activeBrand, sort, priceMin, priceMax, minDiscount, sizes, gender, category, page]);

// Reset to page 1 when filters change
useEffect(() => {
  setCurrentPage(1);
}, [activeBrand, sort, priceMin, priceMax, minDiscount, sizes, gender, category]);

// Persist non‑numeric filters to URL immediately
useEffect(() => {
  const next = {};
  if (activeBrand) next.brand = activeBrand;
  if (sort && sort !== "pop") next.sort = sort;
  if (minDiscount !== "all") next.minDiscount = minDiscount;
  if (sizes.length) next.sizes = sizes.join(",");
  if (gender !== "all") next.gender = gender;
  if (category !== "all") next.category = category;
  if (query) next.q = query;
  const curPmin = params.get("priceMin");
  const curPmax = params.get("priceMax");
  if (curPmin !== null && curPmin !== "") next.priceMin = curPmin;
  if (curPmax !== null && curPmax !== "") next.priceMax = curPmax;
  setParams(next, { replace: true });
}, [activeBrand, sort, minDiscount, sizes, gender, category, query, params, setParams]);

// Debounce numeric price fields into URL
useEffect(() => {
  const t = setTimeout(() => {
    const next = new URLSearchParams(params);
    if (priceMin === "" || isNaN(Number(priceMin))) next.delete("priceMin");
    else next.set("priceMin", String(priceMin));
    if (priceMax === "" || isNaN(Number(priceMax))) next.delete("priceMax");
    else next.set("priceMax", String(priceMax));
    setParams(next, { replace: true });
  }, 400);
  return () => clearTimeout(t);
}, [priceMin, priceMax, params, setParams]);

// Persist filters to localStorage
useEffect(() => {
  const payload = {
    sort,
    priceMin,
    priceMax,
    minDiscount,
    sizes,
    gender,
    category,
    brand: activeBrand || "",
    q: query,
  };
  localStorage.setItem("shop_filters", JSON.stringify(payload));
}, [sort, priceMin, priceMax, minDiscount, sizes, gender, category, activeBrand, query]);

// Sync URL params to localStorage continuously
useEffect(() => {
  const payload = {
    sort: params.get("sort") || "pop",
    priceMin: params.get("priceMin") ?? "",
    priceMax: params.get("priceMax") ?? "",
    minDiscount: params.get("minDiscount") || "all",
    sizes: (params.get("sizes") || "").split(",").filter(Boolean),
    gender: params.get("gender") || "all",
    category: params.get("category") || "all",
    brand: params.get("brand") || "",
    q: (params.get("q") || "").trim(),
  };
  localStorage.setItem("shop_filters", JSON.stringify(payload));
}, [params]);

return (
  <section className="bg-white">
    {mode && (
      <div
        className={`bg-gradient-to-r ${mode === "sale"
          ? "from-orange-500 to-rose-500"
          : mode === "premium"
            ? "from-gray-900 to-gray-700"
            : mode === "gift"
              ? "from-pink-500 to-rose-500"
              : "from-primary-600 to-primary-500"
          } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {mode === "new" && "New Arrivals"}
            {mode === "sale" && "Sale"}
            {mode === "premium" && "Premium"}
            {mode === "gift" && "Gift Cards"}
          </h1>
          <p className="mt-2 text-white/90">
            {mode === "new" && "Fresh styles just dropped. Be the first to own them."}
            {mode === "sale" && "Hot deals and big savings across top categories."}
            {mode === "premium" && "Curated picks from premium brands and elevated essentials."}
            {mode === "gift" && "Send instant joy. Digital gift cards delivered to inbox."}
          </p>
        </div>
        {apiError && (
          <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-sm text-red-700">
            {apiError}
          </div>
        )}
      </div>
    )}

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode
            ? mode === "new"
              ? "New Arrivals"
              : mode === "sale"
                ? "Sale"
                : mode === "premium"
                  ? "Premium"
                  : "Gift Cards"
            : "Shop"}
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="pop">Popularity</option>
            <option value="plh">Price: Low to High</option>
            <option value="phl">Price: High to Low</option>
            <option value="disc">Discount</option>
          </select>
          <button
            className="hidden sm:inline-flex ml-2 px-3 py-1.5 rounded-md border hover:bg-gray-50"
            onClick={onOpenWishlist}
          >
            Wishlist
          </button>
          <button
            className="lg:hidden ml-3 px-3 py-1.5 rounded-md border hover:bg-gray-50"
            onClick={() => setMobileFiltersOpen(true)}
          >
            Filters
          </button>
        </div>
      </div>

      {mode !== "gift" && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          {["all", "Men", "Women", "Kids", "Unisex"].map((g) => (
            <button
              key={g}
              onClick={() => setGender(gender === g ? "all" : g)}
              className={`px-3 py-1.5 rounded-full border ${gender === g ? "bg-rose-600 text-white border-rose-600" : "hover:bg-gray-50"}`}
            >
              {g === "all" ? "All" : g}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm text-gray-700">Brand:</span>
        {uniqueBrands.map((b) => (
          <button
            key={b}
            onClick={() => {
              const next = new URLSearchParams(params);
              if (activeBrand === b) next.delete("brand");
              else next.set("brand", b);
              setParams(next, { replace: true });
            }}
            className={`px-3 py-1.5 rounded-full border text-sm ${activeBrand === b ? "bg-rose-600 text-white border-rose-600" : "hover:bg-gray-50"}`}
          >
            {b}
          </button>
        ))}
        {activeBrand && (
          <button onClick={clearBrand} className="text-sm text-gray-700 underline underline-offset-2">
            Clear
          </button>
        )}
      </div>

      <div className="mb-6 flex items-center gap-2 flex-wrap">
        {gender !== "all" && <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Gender: {gender}</span>}
        {category !== "all" && <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Category: {category}</span>}
        {priceMin !== "" && <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Min ₹{priceMin}</span>}
        {priceMax !== "" && <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Max ₹{priceMax}</span>}
        {minDiscount !== "all" && <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Discount ≥ {minDiscount}%</span>}
        {sizes.map((s) => (
          <span key={s} className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Size {s}</span>
        ))}
        {activeBrand && <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Brand: {activeBrand}</span>}
        {(gender !== "all" || category !== "all" || priceMin !== "" || priceMax !== "" || minDiscount !== "all" || sizes.length || activeBrand) && (
          <button
            onClick={() => {
              setGender("all");
              setCategory("all");
              setPriceMin("");
              setPriceMax("");
              setMinDiscount("all");
              setSizes([]);
              clearBrand();
              addToast("Cleared all filters", "info");
            }}
            className="ml-2 text-sm text-gray-700 underline"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {mode !== "gift" && (
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Gender</p>
              <div className="space-y-2 text-sm text-gray-700">
                {["all", "Men", "Women", "Kids", "Unisex"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value={opt}
                      checked={gender === opt}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span>{opt === "all" ? "All" : opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All</option>
                {uniqueCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Price (₹)</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm"
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceMin === "" ? 0 : Math.min(Number(priceMin), 5000)}
                  onChange={(e) => setPriceMin(String(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={
                    priceMax === ""
                      ? 5000
                      : Math.min(
                        Math.max(Number(priceMax), priceMin === "" ? 0 : Number(priceMin)),
                        5000
                      )
                  }
                  onChange={(e) => setPriceMax(String(e.target.value))}
                  className="w-full"
                />
              </div>
              <p className="mt-1 text-xs text-gray-600">
                Range: ₹{priceMin === "" ? 0 : priceMin} - ₹{priceMax === "" ? "5000+" : priceMax}
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Min Discount</p>
              <select
                value={minDiscount}
                onChange={(e) => setMinDiscount(e.target.value)}
                className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">Any</option>
                <option value="10">10% or more</option>
                <option value="20">20% or more</option>
                <option value="30">30% or more</option>
                <option value="40">40% or more</option>
                <option value="50">50% or more</option>
              </select>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Sizes</p>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSize(s)}
                    className={`px-3 py-1.5 rounded-md border text-sm ${sizes.includes(s) ? "bg-gray-900 text-white border-gray-900" : "hover:bg-gray-50"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        <main className={mode !== "gift" ? "lg:col-span-3" : "lg:col-span-4"}>
          <div className="text-sm text-gray-600 mb-3">{filtered.length} products</div>
          {mode === "gift" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[500, 1000, 2000, 3000, 5000, 10000].map((amt) => (
                  <div key={amt} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm text-gray-500">Digital Gift Card</div>
                    <div className="mt-2 text-3xl font-extrabold text-gray-900">₹{amt.toLocaleString("en-IN")}</div>
                    <p className="mt-2 text-gray-600 text-sm">Send instantly via email. Valid for 1 year.</p>
                    <button className="mt-4 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700">
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="font-semibold text-gray-900">How it works</p>
                  <p className="mt-1">Choose amount, add recipient email, and pay. Delivered instantly.</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="font-semibold text-gray-900">Where to use</p>
                  <p className="mt-1">Redeemable on all products sitewide including sale items.</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="font-semibold text-gray-900">Validity</p>
                  <p className="mt-1">Valid for 12 months from purchase. Partial redemption supported.</p>
                </div>
              </div>
            </>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: Math.min(pageSize, filtered.length || pageSize) }).map((_, i) => (
                <div key={i} className="rounded-xl border p-4 animate-pulse">
                  <div className="bg-gray-200 aspect-4/5 rounded" />
                  <div className="mt-3 h-4 bg-gray-200 rounded w-2/3" />
                  <div className="mt-2 h-4 bg-gray-200 rounded w-1/3" />
                  <div className="mt-3 h-9 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {itemsToShow.map((p) => (
                  <ProductCard
                    key={p.id}
                    onAdd={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    onQuickView={(item) => setQuickViewItem(item)}
                    wished={!!wishlist.find((w) => w.id === p.id)}
                    {...p}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  <button
                    className="px-3 py-1.5 rounded border hover:bg-gray-50 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1.5 rounded border ${page === i + 1 ? "bg-rose-600 text-white border-rose-600" : "hover:bg-gray-50"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1.5 rounded border hover:bg-gray-50 disabled:opacity-50"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>

    {quickViewItem && (
      <QuickViewModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
      />
    )}
  </section>
);
}

export default Shop;