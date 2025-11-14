import React from 'react'

function About() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="uppercase tracking-widest text-xs text-blue-600 font-semibold">About Us</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900">We make quality fashion accessible</h1>
            <p className="mt-4 text-gray-600 text-lg">We’re a small team passionate about timeless designs, ethical sourcing, and exceptional value. Our collections are designed to mix comfort with style for everyday life.</p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl border p-4 text-center">
                <p className="text-3xl font-extrabold text-gray-900">50k+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="rounded-xl border p-4 text-center">
                <p className="text-3xl font-extrabold text-gray-900">1,200+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div className="rounded-xl border p-4 text-center">
                <p className="text-3xl font-extrabold text-gray-900">35+</p>
                <p className="text-sm text-gray-600">Cities Served</p>
              </div>
            </div>

            <div className="mt-10 space-y-4">
              {[
                { title: 'Quality First', desc: 'We use trusted fabrics and partners to ensure every piece lasts.' },
                { title: 'Sustainable Choices', desc: 'We’re continuously improving packaging and materials.' },
                { title: 'Fair Pricing', desc: 'Great design should be attainable. No heavy markups.' },
              ].map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <div className="text-green-600 text-xl">✔</div>
                  <div>
                    <p className="font-semibold text-gray-900">{v.title}</p>
                    <p className="text-sm text-gray-600">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="aspect-4/3 rounded-xl overflow-hidden shadow">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden shadow">
                <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop" alt="Studio" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden shadow">
                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop" alt="Craft" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
