import React, { useEffect, useState } from "react";
import { FaCreditCard, FaTrash, FaStar } from "react-icons/fa";
import PaymentMethodForm from "../Components/PaymentMethodForm.jsx";

export default function Payments() {
  const [methods, setMethods] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("payment_methods") || "[]");
      if (Array.isArray(saved)) setMethods(saved);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("payment_methods", JSON.stringify(methods));
  }, [methods]);

  const addMethod = (method) => {
    setMethods((prev) => {
      let next = [...prev];
      if (method.isDefault) {
        next = next.map((m) => ({ ...m, isDefault: false }));
      }
      next.unshift(method);
      return next;
    });
  };

  const setDefault = (id) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const remove = (id) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Payment Methods</h1>
            <button onClick={() => setOpen(true)} className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">Add Payment Method</button>
          </div>

          {methods.length === 0 ? (
            <div className="text-center py-12">
              <FaCreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No saved payment methods</p>
            </div>
          ) : (
            <div className="space-y-3">
              {methods.map((m) => (
                <div key={m.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {m.type === "card" ? `${m.brand} ${m.label}` : `UPI ${m.label}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {m.type === "card" ? `Exp ${m.expiry}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {!m.isDefault && (
                      <button onClick={() => setDefault(m.id)} className="text-sm text-gray-700 hover:text-pink-600 flex items-center">
                        <FaStar className="mr-1" /> Set default
                      </button>
                    )}
                    <button onClick={() => remove(m.id)} className="text-sm text-red-600 hover:text-red-700 flex items-center">
                      <FaTrash className="mr-1" /> Remove
                    </button>
                    {m.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Default</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PaymentMethodForm open={open} onClose={() => setOpen(false)} onSave={addMethod} />
    </div>
  );
}
