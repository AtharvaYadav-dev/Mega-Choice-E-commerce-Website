import React from 'react'
import Hero from '../Components/Hero'
import CategoryShowcase from '../Components/CategoryShowcase'
import TrendingDeals from '../Components/TrendingDeals'
import Offers from '../Components/Offers'
import CategoryTiles from '../Components/CategoryTiles'
import Perks from '../Components/Perks'
import ProductGrid from '../Components/ProductGrid'
import DownloadAppBanner from '../Components/DownloadAppBanner'

function Home({ onAddToCart }) {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <TrendingDeals />
      <Offers />
      <CategoryTiles />
      <ProductGrid onAdd={onAddToCart} />
      <DownloadAppBanner />
      <Perks />
    </>
  )
}

export default Home
