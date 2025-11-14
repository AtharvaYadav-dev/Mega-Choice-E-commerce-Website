import React, { useState, useMemo } from 'react'

function QuickViewModal({ open, item, onClose, onAddToCart }) {
  const [size, setSize] = useState(null)
  const sizes = useMemo(() => item?.sizes || ['S','M','L','XL'], [item])
  if (!open || !item) return null

  const canAdd = !!item.price && (!sizes.length || !!size)

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex">
            <div className="hidden sm:block sm:w-1/2 bg-gray-100 aspect-square">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              )}
            </div>
            <div className="w-full sm:w-1/2 p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 mr-4">{item.title}</h3>
                <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">✕</button>
              </div>
              <div className="mt-1 text-gray-800 font-semibold">{item.price ? `₹${item.price}` : 'Price TBD'}</div>
              {item.brand && <div className="text-sm text-gray-600">{item.brand}</div>}

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Select size</p>
                <div className="flex flex-wrap gap-2">
                  {['S','M','L','XL'].map((s) => {
                    const available = sizes.includes(s)
                    const active = size === s
                    return (
                      <button
                        key={s}
                        disabled={!available}
                        onClick={() => setSize(s)}
                        className={`px-3 py-1.5 rounded-md border text-sm ${
                          !available ? 'opacity-50 cursor-not-allowed' : active ? 'bg-rose-600 text-white border-rose-600' : 'hover:bg-gray-50'
                        }`}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
                  disabled={!canAdd}
                  onClick={() => { if (canAdd) { onAddToCart && onAddToCart({ ...item, selectedSize: size }); onClose(); } }}
                >
                  Add to cart
                </button>
                <button className="px-4 py-2 rounded-md border hover:bg-gray-50" onClick={onClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
