import React from "react";

export default function TrackOrderModal({ open, onClose, order }) {
  if (!open || !order) return null;

  const steps = [
    { key: "PLACED", label: "Order Placed", time: order.date },
    { key: "PROCESSING", label: "Processing", time: "2024-01-16 11:20" },
    { key: "SHIPPED", label: "Shipped", time: "2024-01-17 16:05" },
    { key: "IN_TRANSIT", label: "In Transit", time: "2024-01-18 09:40" },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", time: null },
    { key: "DELIVERED", label: "Delivered", time: null },
  ];

  const currentIndex = order.status === "Shipped" ? 2 : 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Track Order #{order.id}</h3>
            {order.trackingId && (
              <div className="text-sm text-gray-600 mt-1">Tracking ID: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{order.trackingId}</span></div>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
          <div className="p-4 rounded-lg border">
            <div className="text-gray-500">Courier</div>
            <div className="font-medium text-gray-900">Delhivery</div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="text-gray-500">Current Status</div>
            <div className="font-medium text-gray-900">{order.status}</div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="text-gray-500">Est. Delivery</div>
            <div className="font-medium text-gray-900">{order.estimatedDelivery}</div>
          </div>
        </div>

        <div className="relative pl-4">
          {steps.map((s, i) => {
            const done = i <= currentIndex;
            return (
              <div key={s.key} className="flex items-start relative pb-6">
                {i !== steps.length - 1 && (
                  <div className={`absolute left-[7px] top-3 h-full w-0.5 ${done ? "bg-pink-500" : "bg-gray-200"}`} />
                )}
                <div className={`w-4 h-4 rounded-full mr-3 mt-1 ${done ? "bg-pink-500" : "bg-gray-300"}`} />
                <div>
                  <div className={`text-sm ${done ? "text-gray-900" : "text-gray-500"}`}>{s.label}</div>
                  {s.time && <div className="text-xs text-gray-500">{new Date(s.time).toLocaleString()}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <a href={`/order/${order.id}`} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Order details</a>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600">Close</button>
        </div>
      </div>
    </div>
  );
}
