import React from 'react'

function Perks() {
  const perks = [
    { icon: '🚚', title: 'Free Shipping', desc: 'On orders over ₹3000' },
    { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
    { icon: '🔒', title: 'Secure Checkout', desc: 'SSL secured payments' },
  ]

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {perks.map((p) => (
            <div key={p.title} className="flex items-center gap-4 bg-white rounded-xl p-4 border">
              <div className="text-2xl">{p.icon}</div>
              <div>
                <p className="font-semibold text-gray-900">{p.title}</p>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Perks
