import React, { useEffect, useRef, useState } from "react";

export default function ProductGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActive((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setActive((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
      <div className="order-2 md:order-1 md:col-span-2 md:h-[calc(100vh-120px)] md:sticky md:top-[calc(var(--nav-height)+16px)] overflow-y-auto hidden md:block">
        <div className="flex md:flex-col gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`border rounded-md overflow-hidden ${i===active ? "border-primary-500" : "border-gray-200 hover:border-gray-300"}`}
            >
              <img src={src} loading="lazy" alt={`thumb-${i}`} className="w-20 h-20 object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="order-1 md:order-2 md:col-span-7">
        <div
          ref={wrapperRef}
          className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square md:aspect-[4/5] group"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
          onTouchStart={() => setZoomed(true)}
          onTouchEnd={() => setZoomed(false)}
        >
          <img
            src={images[active]}
            alt="product"
            loading="eager"
            className={`w-full h-full object-cover transition-transform duration-300 ${zoomed ? "scale-110 cursor-zoom-in" : "scale-100"}`}
          />
          <button
            onClick={() => setActive((i) => Math.max(0, i - 1))}
            disabled={active===0}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-2 py-1 rounded-md text-sm disabled:opacity-40"
          >Prev</button>
          <button
            onClick={() => setActive((i) => Math.min(images.length-1, i + 1))}
            disabled={active===images.length-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-2 py-1 rounded-md text-sm disabled:opacity-40"
          >Next</button>
        </div>
        <div className="mt-2 flex gap-2 md:hidden overflow-x-auto no-scrollbar">
          {images.map((src, i) => (
            <button
              key={src + "m" + i}
              onClick={() => setActive(i)}
              className={`border rounded-md overflow-hidden ${i===active ? "border-primary-500" : "border-gray-200"}`}
            >
              <img src={src} loading="lazy" alt={`m-thumb-${i}`} className="w-16 h-16 object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
