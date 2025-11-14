import React, { useEffect, useMemo, useState } from "react";

export default function PaymentMethodForm({ open, onClose, onSave }) {
  const [type, setType] = useState("card");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setType("card");
      setName("");
      setNumber("");
      setExpiry("");
      setCvv("");
      setUpiId("");
      setIsDefault(false);
      setErrors({});
    }
  }, [open]);

  const brand = useMemo(() => {
    if (!number) return "Unknown";
    const n = number.replace(/\s|-/g, "");
    if (/^4/.test(n)) return "Visa";
    if (/^5[1-5]/.test(n)) return "Mastercard";
    if (/^3[47]/.test(n)) return "Amex";
    if (/^6(?:011|5)/.test(n)) return "Discover";
    return "Card";
  }, [number]);

  const maskCard = (n) => {
    const d = n.replace(/\D/g, "");
    const last4 = d.slice(-4);
    return `•••• •••• •••• ${last4}`.trim();
  };

  const validate = () => {
    const e = {};
    if (type === "card") {
      if (!name.trim()) e.name = "Required";
      const d = number.replace(/\D/g, "");
      if (d.length < 13 || d.length > 19) e.number = "Invalid number";
      if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) e.expiry = "MM/YY";
      if (!/^\d{3,4}$/.test(cvv)) e.cvv = "3-4 digits";
    } else {
      if (!upiId.trim()) e.upiId = "Required";
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) e.upiId = "Invalid UPI";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const id = `pm_${Date.now()}`;
    if (type === "card") {
      onSave &&
        onSave({ id, type: "card", brand, name: name.trim(), last4: number.replace(/\D/g, "").slice(-4), label: maskCard(number), expiry, isDefault });
    } else {
      onSave && onSave({ id, type: "upi", label: upiId.trim(), isDefault });
    }
    onClose && onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add Payment Method</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 text-sm">
            <button type="button" className={`flex-1 px-3 py-2 rounded-lg border ${type === "card" ? "border-pink-500 text-pink-600 bg-pink-50" : "border-gray-200"}`} onClick={() => setType("card")}>
              Card
            </button>
            <button type="button" className={`flex-1 px-3 py-2 rounded-lg border ${type === "upi" ? "border-pink-500 text-pink-600 bg-pink-50" : "border-gray-200"}`} onClick={() => setType("upi")}>
              UPI
            </button>
          </div>

          {type === "card" ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Name on card</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="John Doe" />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Card number</label>
                <input value={number} onChange={(e)=>setNumber(e.target.value)} inputMode="numeric" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="4111 1111 1111 1111" />
                {errors.number && <p className="text-xs text-red-600 mt-1">{errors.number}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Expiry (MM/YY)</label>
                  <input value={expiry} onChange={(e)=>setExpiry(e.target.value)} placeholder="12/28" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
                  {errors.expiry && <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">CVV</label>
                  <input value={cvv} onChange={(e)=>setCvv(e.target.value)} inputMode="numeric" maxLength={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="123" />
                  {errors.cvv && <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-700 mb-1">UPI ID</label>
              <input value={upiId} onChange={(e)=>setUpiId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="name@bank" />
              {errors.upiId && <p className="text-xs text-red-600 mt-1">{errors.upiId}</p>}
            </div>
          )}

          <label className="flex items-center text-sm">
            <input type="checkbox" checked={isDefault} onChange={(e)=>setIsDefault(e.target.checked)} className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
            <span className="ml-2 text-gray-700">Set as default</span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
