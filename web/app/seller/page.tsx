"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, LogOut, DollarSign } from "lucide-react"

export default function SellerPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.username.toLowerCase() === "admin") {
      router.push("/admin")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-50">Dashboard Seller</h1>
            <p className="text-neutral-400">Selamat datang, {user.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-neutral-700 bg-neutral-800 text-neutral-50 hover:bg-neutral-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-neutral-800 bg-neutral-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-50">
                Produk Saya
              </CardTitle>
              <Package className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-50">-</div>
              <p className="text-xs text-neutral-400">Total produk yang dijual</p>
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-50">
                Transaksi
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-50">-</div>
              <p className="text-xs text-neutral-400">Total transaksi</p>
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-50">
                Pendapatan
              </CardTitle>
              <DollarSign className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-50">Rp -</div>
              <p className="text-xs text-neutral-400">Total pendapatan</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
