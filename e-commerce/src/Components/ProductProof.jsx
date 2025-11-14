import React, { useEffect, useState } from "react";

export default function ProductProof({ productId, baseStock = 9 }) {
  const [stockLeft, setStockLeft] = useState(baseStock);
  const [recent, setRecent] = useState(null);

  useEffect(() => {
    const i = setInterval(() => {
      setStockLeft((s) => Math.max(1, s - (Math.random() > 0.7 ? 1 : 0)));
      if (Math.random() > 0.6) setRecent({ name: "A***h", minutesAgo: Math.ceil(Math.random() * 12) });
    }, 7000);
    return () => clearInterval(i);
  }, [productId]);

  return (
    <div className="space-y-2 text-sm">
      <div className={`inline-flex items-center px-2 py-1 rounded-md ${stockLeft <= 3 ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700"}`}>
        {stockLeft <= 3 ? "Hurry! Only " : "Limited stock: "}
        <strong className="mx-1">{stockLeft}</strong> left
      </div>
      {recent && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 px-2 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {recent.name} purchased {recent.minutesAgo} min ago
        </div>
      )}
    </div>
  );
}
