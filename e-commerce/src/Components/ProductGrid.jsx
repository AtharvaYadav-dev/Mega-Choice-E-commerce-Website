import React from 'react'
import ProductCard from './ProductCard'

function ProductGrid({ onAdd }) {
  const products = [
    { id: 1, title: 'Classic White Tee', price: 799, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop', badge: 'New' },
    { id: 2, title: 'Black Hoodie', price: 1599, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop' },
    { id: 3, title: 'Denim Jacket', price: 2499, image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1200&auto=format&fit=crop' },
    { id: 4, title: 'Summer Dress', price: 1899, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop' },
    { id: 5, title: 'Casual Shirt', price: 1199, image: 'https://images.unsplash.com/photo-1548883354-7622d03acaed?q=80&w=1200&auto=format&fit=crop' },
    { id: 6, title: 'Chinos', price: 1399, image: 'https://images.unsplash.com/photo-1582582429416-cf266f79e162?q=80&w=1200&auto=format&fit=crop' },
    { id: 7, title: 'Graphic Tee', price: 899, image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop' },
    { id: 8, title: 'Leather Jacket', price: 3499, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop' },
    { id: 9, title: 'Plaid Shirt', price: 1299, image: 'https://images.unsplash.com/photo-1520975922071-1d89f72a1a5e?q=80&w=1200&auto=format&fit=crop' },
    { id: 10, title: 'Joggers', price: 1199, image: 'https://images.unsplash.com/photo-1520975892202-99f2d85d5a53?q=80&w=1200&auto=format&fit=crop' },
    { id: 11, title: 'Oversized Sweater', price: 1799, image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop' },
    { id: 12, title: 'Floral Dress', price: 2099, image: 'https://images.unsplash.com/photo-1519744346362-2e73f44cb327?q=80&w=1200&auto=format&fit=crop' },
  ]

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} onAdd={onAdd} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
