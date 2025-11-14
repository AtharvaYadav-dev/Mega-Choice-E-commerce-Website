import React from "react";
import { useToast } from "../hooks/useToast.js";

function Offers() {
  const { addToast } = useToast();

  const copyCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        addToast(`Copied code: ${code}`, "success");
      })
      .catch(() => {
        addToast("Failed to copy code", "error");
      });
  };
  const offers = [
    {
      title: "Festive Sale",
      desc: "Up to 50% off on select styles",
      code: "FEST50",
      bg: "bg-gradient-to-r from-blue-600 to-indigo-600",
    },
    {
      title: "Buy 2 Get 1",
      desc: "Mix & match tees and shirts",
      code: "B2G1",
      bg: "bg-gradient-to-r from-rose-500 to-pink-500",
    },
    {
      title: "Student Discount",
      desc: "Extra 10% off with ID",
      code: "STUDENT10",
      bg: "bg-gradient-to-r from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-xl border overflow-hidden">
          <div className="bg-gray-900 text-white px-4 py-2 text-sm text-center">
            Limited time offers — grab your favorites before they sell out!
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {offers.map((o) => (
              <div key={o.code} className={`${o.bg} text-white p-6 sm:p-8`}>
                <h3 className="text-2xl font-extrabold">{o.title}</h3>
                <p className="mt-2 text-white/90">{o.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/15 rounded-md px-3 py-1.5 text-sm">
                  <span className="font-mono tracking-wide">
                    Use code: {o.code}
                  </span>
                  <span className="opacity-80">•</span>
                  <button
                    onClick={() => copyCode(o.code)}
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offers;
