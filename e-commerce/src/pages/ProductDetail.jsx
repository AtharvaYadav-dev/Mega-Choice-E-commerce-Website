import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductGallery from "../Components/ProductGallery";
import StickyCTA from "../Components/StickyCTA";
import ProductProof from "../Components/ProductProof";
import { api } from "../lib/api.js";

export default function ProductDetail({ onAddToCart, onToggleWishlist, wishlist = [] }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [all, setAll] = useState([]);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const p = await api.get(`/api/products/${id}`);
        if (!alive) return;
        const mapped = {
          id: p._id,
          title: p.name,
          price: Number(p.price) || 0,
          description: p.description || "",
          images: Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []),
          image: Array.isArray(p.images) && p.images.length ? p.images[0] : undefined,
          brand: p.brand || "",
          category: p.category || "",
          stock: typeof p.stock === "number" ? p.stock : 0,
          rating: typeof p.rating === "number" ? p.rating : 0,
        };
        setProduct(mapped);
        try {
          const list = await api.get("/api/products");
          if (alive) {
            setAll((Array.isArray(list) ? list : []).map((x) => ({
              id: x._id,
              title: x.name,
              price: Number(x.price) || 0,
              image: Array.isArray(x.images) && x.images.length ? x.images[0] : undefined,
              images: Array.isArray(x.images) ? x.images : (x.images ? [x.images] : []),
              brand: x.brand || "",
              category: x.category || "",
              rating: typeof x.rating === "number" ? x.rating : 0,
            })));
          }
        } catch {}
      } catch (err) {
        if (!alive) return;
        setError(err?.message || "Failed to load product");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="mt-4 h-4 w-72 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-gray-600">{error || "The product you are looking for does not exist."}</p>
        <Link to="/shop" className="inline-block mt-4 px-4 py-2 rounded-md border hover:bg-gray-50">Back to Shop</Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const wished = !!wishlist.find((w) => w.id === product.id);

  const add = () => onAddToCart && onAddToCart({ id: product.id, title: product.title, price: product.price, image: images[0] });

  // Simple FBT (same category, top rated, exclude current)
  const fbt = all
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-8">
          <ProductGallery images={images} />
        </div>
        <aside className="md:col-span-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          {product.brand && <div className="mt-1 text-sm text-gray-600">by {product.brand}</div>}
          <div className="mt-3 flex items-baseline gap-2">
            <div className="text-2xl font-extrabold text-gray-900">₹{product.price?.toLocaleString("en-IN")}</div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</div>
            )}
            {product.discount ? (
              <span className="text-sm text-green-600 font-semibold">({product.discount}% off)</span>
            ) : null}
          </div>

          <div className="mt-4">
            <ProductProof productId={product.id} baseStock={product.stock || 9} />
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button onClick={add} className="px-4 py-3 rounded-md bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium">Add to Cart</button>
            <button onClick={() => onToggleWishlist && onToggleWishlist({ id: product.id, title: product.title, price: product.price, image: images[0] })} className={`px-4 py-3 rounded-md border font-medium ${wished ? "bg-red-50 text-red-600 border-red-200" : "hover:bg-gray-50"}`}>{wished ? "Wishlisted" : "Add to Wishlist"}</button>
          </div>

          <div className="mt-6 text-sm text-gray-700 leading-relaxed">
            {product.description || "This product is crafted with high-quality materials and designed for everyday comfort."}
          </div>
        </aside>
      </div>

      {/* FBT */}
      {fbt.length > 0 && (
        <section aria-labelledby="fbt-heading" className="mt-10 md:mt-12">
          <h2 id="fbt-heading" className="text-lg font-semibold text-gray-900">Frequently Bought Together</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {fbt.map((r) => (
              <article key={r.id} className="border rounded-xl p-3 bg-white">
                <Link to={`/product/${r.id}`} className="block">
                  <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                    <img src={r.image} loading="lazy" alt={r.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-600">{r.brand || r.category}</div>
                    <div className="text-sm font-semibold text-gray-900 line-clamp-2">{r.title}</div>
                    <div className="mt-1 text-sm font-bold">₹{r.price?.toLocaleString("en-IN")}</div>
                  </div>
                </Link>
                <button onClick={() => onAddToCart && onAddToCart({ id: r.id, title: r.title, price: r.price, image: r.image })} className="mt-3 w-full px-3 py-2 text-sm rounded-md bg-amber-400 hover:bg-amber-500 text-gray-900">Add to Cart</button>
              </article>
            ))}
          </div>
        </section>
      )}

      <StickyCTA onAddToCart={add} price={product.price} />
    </div>
  );
}
