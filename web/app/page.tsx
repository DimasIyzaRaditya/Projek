import Navbar from "@/components/navbar"
import ProductCard from "@/components/product-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Star, Download, Award } from "lucide-react"
import { API_PRODUK } from "@/lib/api"

interface Produk {
  id: number
  nama: string
  harga: number
}

async function getProduk(): Promise<Produk[]> {
  try {
    const res = await fetch(API_PRODUK, {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error fetching produk:', error)
    return []
  }
}

export default async function HomePage() {
  const products = await getProduk()
  
  // Fallback jika tidak ada data dari database
  const dummyProducts = [
    {
      id: "1",
      title: "Template UI/UX Modern",
      description: "Template dashboard admin modern dengan komponen lengkap",
      price: 250000,
      rating: 4.8,
      downloads: 1234,
      category: "UI/UX",
      imageUrl: ""
    },
    {
      id: "2",
      title: "E-Book Programming",
      description: "Panduan lengkap belajar web development dari nol",
      price: 150000,
      rating: 4.9,
      downloads: 2341,
      category: "E-Book",
      imageUrl: ""
    },
    {
      id: "3",
      title: "Icon Pack Premium",
      description: "Koleksi 1000+ icon SVG untuk berbagai kebutuhan",
      price: 100000,
      rating: 4.7,
      downloads: 3456,
      category: "Design",
      imageUrl: ""
    },
    {
      id: "4",
      title: "Source Code Toko Online",
      description: "Full source code marketplace dengan fitur lengkap",
      price: 500000,
      rating: 4.9,
      downloads: 876,
      category: "Source Code",
      imageUrl: ""
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-neutral-50 md:text-6xl">
              Marketplace File Digital
              <span className="block text-neutral-400">Untuk Para Enthusiast</span>
            </h1>
            <p className="mb-8 text-lg text-neutral-400 md:text-xl">
              Koleksi pribadi template, ebook, source code, dan aset digital untuk mereka yang berbagi minat yang sama
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-50">Produk Digital</h2>
            <p className="mt-2 text-neutral-400">Temukan berbagai produk digital berkualitas untuk kebutuhan Anda</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id.toString()}
                  title={product.nama}
                  description="Produk digital berkualitas"
                  price={product.harga}
                  rating={4.5}
                  downloads={0}
                  imageUrl=""
                />
              ))
            ) : (
              dummyProducts.map((product) => (
                <ProductCard key={product.id} id={product.id} title={product.title} description={product.description} price={product.price} rating={product.rating} downloads={product.downloads} imageUrl={product.imageUrl} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
