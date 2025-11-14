import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { api } from '../lib/api.js'

function highlight(text, q) {
  if (!q || !text) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + q.length)
  const after = text.slice(idx + q.length)
  return (
    <>
      {before}
      <mark className="bg-yellow-200 text-gray-900 rounded px-0.5">{match}</mark>
      {after}
    </>
  )
}

export default function Search() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await api.get('/api/products')
        if (!alive) return
        const mapped = (Array.isArray(data) ? data : []).map(p => ({
          id: p._id,
          title: p.name,
          price: Number(p.price) || 0,
          image: Array.isArray(p.images) && p.images.length ? p.images[0] : undefined,
          brand: p.brand || '',
          category: p.category || ''
        }))
        setAll(mapped)
      } catch (err) {
        if (!alive) return
        setError(err?.message || 'Failed to load products')
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => { alive = false }
  }, [])

  const results = useMemo(() => {
    if (!q) return []
    const low = q.toLowerCase()
    return all.filter(p =>
      (p.title && p.title.toLowerCase().includes(low)) ||
      (p.brand && p.brand.toLowerCase().includes(low)) ||
      (p.category && p.category.toLowerCase().includes(low))
    )
  }, [q, all])

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Search</h1>
          <Link to={`/shop?q=${encodeURIComponent(q)}`} className="px-3 py-1.5 rounded-md border hover:bg-gray-50">Open in Shop</Link>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-sm text-red-700">{error}</div>
        )}

        {!q ? (
          <p className="text-gray-600">Type in the search bar to see results.</p>
        ) : loading ? (
          <div className="text-gray-600">Loading…</div>
        ) : results.length === 0 ? (
          <p className="text-gray-600">No results for "{q}".</p>
        ) : (
          <>
            <div className="text-sm text-gray-600 mb-3">{results.length} results for "{q}"</div>
            <ul className="divide-y border rounded-lg">
              {results.map(p => (
                <li key={p.id} className="p-4 flex items-center gap-4">
                  <div className="h-14 w-14 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    {p.image ? <img src={p.image} alt={p.title} className="h-full w-full object-cover" /> : <span className="text-xs text-gray-400">No image</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{highlight(p.title, q)}</div>
                    <div className="text-xs text-gray-600 truncate">
                      Brand: {highlight(p.brand || '—', q)} · Category: {highlight(p.category || '—', q)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-800 font-semibold">{p.price ? `₹${p.price}` : 'TBD'}</div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
