"use client"

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { API_PRODUK } from "@/lib/api"

interface Produk {
  id: number
  nama: string
  harga: number
}

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [allProducts, setAllProducts] = useState<Produk[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    setIsLoggedIn(!!userData)
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_PRODUK)
      const result = await response.json()
      setAllProducts(result.data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    return allProducts.filter((product) =>
      product.nama.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8)
  }, [searchQuery, allProducts])

  const handleProductClick = (id: number) => {
    setSearchQuery("")
    setShowDropdown(false)
    router.push(`/detail/${id}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowDropdown(!!value.trim())
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/favicon.ico" alt="Ahmeng Trade" className="h-8 w-8" />
            <span className="text-xl font-bold text-neutral-50">Ahmeng Trade</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder="Cari produk digital..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(!!searchQuery.trim())}
                className="pl-10 bg-neutral-900 border-neutral-800"
              />
              
              {/* Search Dropdown */}
              {showDropdown && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full px-4 py-3 text-left hover:bg-neutral-800 transition-colors border-b border-neutral-800 last:border-b-0"
                    >
                      <p className="text-neutral-100 font-medium text-sm">{product.nama}</p>
                      <p className="text-neutral-400 text-xs">Rp {product.harga.toLocaleString('id-ID')}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              type="search"
              placeholder="Cari produk digital..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(!!searchQuery.trim())}
              className="pl-10 bg-neutral-900 border-neutral-800"
            />
            
            {/* Search Dropdown - Mobile */}
            {showDropdown && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full px-4 py-3 text-left hover:bg-neutral-800 transition-colors border-b border-neutral-800 last:border-b-0"
                  >
                    <p className="text-neutral-100 font-medium text-sm">{product.nama}</p>
                    <p className="text-neutral-400 text-xs">Rp {product.harga.toLocaleString('id-ID')}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
