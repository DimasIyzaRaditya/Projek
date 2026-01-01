import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Star, ShoppingCart, ArrowLeft, BookOpen, Code2, Palette, Layout } from "lucide-react"
import Link from "next/link"
import { API_PRODUK_BY_ID } from "@/lib/api"
import BuyNowButton from "@/components/buy-now-button"

interface Produk {
  id: number
  nama: string
  harga: number
}

const getIconByTitle = (title: string) => {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.includes("ebook") || lowerTitle.includes("e-book") || lowerTitle.includes("buku")) {
    return <BookOpen className="h-24 w-24" />
  }
  if (lowerTitle.includes("source code") || lowerTitle.includes("script") || lowerTitle.includes("code")) {
    return <Code2 className="h-24 w-24" />
  }
  if (lowerTitle.includes("icon") || lowerTitle.includes("design") || lowerTitle.includes("ilustrasi") || lowerTitle.includes("font")) {
    return <Palette className="h-24 w-24" />
  }
  if (lowerTitle.includes("template") || lowerTitle.includes("ui") || lowerTitle.includes("ux") || lowerTitle.includes("dashboard")) {
    return <Layout className="h-24 w-24" />
  }
  
  return <Download className="h-24 w-24" />
}

// Fetch produk dari API
async function getProdukById(id: string): Promise<Produk | null> {
  try {
    const produkId = parseInt(id)
    if (isNaN(produkId)) {
      console.error('Invalid product ID:', id)
      return null
    }
    
    const res = await fetch(API_PRODUK_BY_ID(produkId), {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data.data || null
  } catch (error) {
    console.error('Error fetching produk:', error)
    return null
  }
}



// Generate deskripsi otomatis berdasarkan nama produk
const generateDescription = (nama: string) => {
  const lowerNama = nama.toLowerCase()
  
  if (lowerNama.includes('ebook') || lowerNama.includes('e-book') || lowerNama.includes('buku')) {
    return `${nama}\n\nE-Book digital berkualitas tinggi dengan konten lengkap dan mendalam.\n\nYang Anda dapatkan:\n- Format PDF berkualitas tinggi\n- Konten lengkap dan terstruktur\n- Mudah dibaca di berbagai perangkat\n- Lifetime access\n- Free updates\n\nCocok untuk:\n- Pembelajaran mandiri\n- Referensi profesional\n- Pengembangan skill`
  }
  
  if (lowerNama.includes('source code') || lowerNama.includes('script') || lowerNama.includes('code')) {
    return `${nama}\n\nSource code lengkap dan siap pakai untuk mempercepat development Anda.\n\nYang Anda dapatkan:\n- Source code lengkap\n- Dokumentasi penggunaan\n- Clean code & best practices\n- Easy to customize\n- Lifetime access\n- Free updates\n\nTeknologi:\n- Modern tech stack\n- Production ready\n- Well documented`
  }
  
  if (lowerNama.includes('template') || lowerNama.includes('ui') || lowerNama.includes('dashboard')) {
    return `${nama}\n\nTemplate UI/UX modern dan responsive untuk berbagai kebutuhan.\n\nYang Anda dapatkan:\n- Design modern & clean\n- Fully responsive\n- Komponen siap pakai\n- Easy to customize\n- Cross-browser compatible\n- Lifetime access\n- Free updates\n\nFitur:\n- Multiple pages\n- Reusable components\n- Dark mode support`
  }
  
  if (lowerNama.includes('icon') || lowerNama.includes('design') || lowerNama.includes('ilustrasi') || lowerNama.includes('font')) {
    return `${nama}\n\nKoleksi aset design berkualitas tinggi untuk kebutuhan kreatif Anda.\n\nYang Anda dapatkan:\n- File berkualitas tinggi\n- Multiple format\n- Easy to use\n- Scalable vector\n- Commercial license\n- Lifetime access\n- Free updates\n\nFormat:\n- SVG, PNG, atau format lainnya\n- Organized & categorized\n- Ready to use`
  }
  
  return `${nama}\n\nProduk digital berkualitas tinggi yang siap digunakan.\n\nYang Anda dapatkan:\n- Kualitas terbaik\n- Instant download\n- Easy to use\n- Lifetime access\n- Free updates\n- Customer support\n\nKeuntungan:\n- Hemat waktu\n- Efisien dan praktis\n- Professional quality`
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const apiProduct = await getProdukById(id)
  
  // Redirect ke home jika produk tidak ditemukan
  if (!apiProduct) {
    return (
      <div className="min-h-screen bg-neutral-950">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-neutral-50 mb-4">Produk Tidak Ditemukan</h1>
            <p className="text-neutral-400 mb-8">Produk yang Anda cari tidak tersedia.</p>
            <Link href="/">
              <Button>Kembali ke Produk</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }
  
  // Generate deskripsi dan data tambahan dari nama produk database
  const product = {
    ...apiProduct,
    deskripsi: generateDescription(apiProduct.nama),
    rating: 4.5 + (Math.random() * 0.4), // Random rating 4.5-4.9
    downloads: Math.floor(100 + Math.random() * 900), // Random 100-1000
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 hover:bg-neutral-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Produk
          </Button>
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Product Image & Info */}
          <div className="lg:col-span-2">
            {/* Product Image */}
            <Card className="mb-6 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video w-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                  <div className="text-neutral-600">
                    {getIconByTitle(product.nama)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Description */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-3">{product.nama}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium text-neutral-50">{product.rating.toFixed(1)}</span>
                        <span>({product.downloads} downloads)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-50 mb-3">
                      Deskripsi Produk
                    </h3>
                    <div className="text-neutral-300 whitespace-pre-line leading-relaxed">
                      {product.deskripsi}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Beli Produk Ini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price */}
                <div>
                  <div className="text-sm text-neutral-400 mb-1">Harga</div>
                  <div className="text-4xl font-bold text-neutral-50">
                    Rp {product.harga.toLocaleString("id-ID")}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-800">
                  <div>
                    <div className="text-sm text-neutral-400">Rating</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold text-neutral-50">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400">Downloads</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Download className="h-4 w-4 text-neutral-400" />
                      <span className="font-semibold text-neutral-50">
                        {product.downloads.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <BuyNowButton 
                    produkId={product.id}
                    produkNama={product.nama}
                    harga={product.harga}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
