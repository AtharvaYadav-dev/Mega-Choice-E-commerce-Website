import React from 'react'

function WishlistDrawer({ open, onClose, items = [], onRemove, onAddToCart }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl border-l border-gray-100 transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col rounded-none lg:rounded-l-2xl will-change-transform`}
      >
        <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between border-b shrink-0 bg-white/80 backdrop-blur">
          <h3 className="text-lg font-semibold text-gray-900">Wishlist ({items.length})</h3>
          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06z" clipRule="evenodd"/></svg>
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center border border-dashed rounded-xl p-10 text-gray-600 bg-gray-50/60">
              <p className="mb-4 text-gray-700 font-medium">Your wishlist is empty</p>
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-colors">Continue shopping</button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {it.image ? (
                      <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{it.title}</p>
                        <p className="text-xs text-gray-600">{it.price ? `₹${it.price}` : 'Price TBD'}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <button
                        className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60 transition-colors font-medium shadow-sm"
                        disabled={!it.price}
                        onClick={() => onAddToCart && onAddToCart(it)}
                      >
                        Add to cart
                      </button>
                      <button
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                        onClick={() => onRemove && onRemove(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  )
}

export default WishlistDrawer
