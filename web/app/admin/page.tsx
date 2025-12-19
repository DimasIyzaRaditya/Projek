"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Package, ShoppingCart, LogOut, Loader2, AlertCircle } from "lucide-react"
import { API_TRANSAKSI, API_USER, API_PRODUK } from "@/lib/api"
import { formatRupiah, formatWIB } from "@/lib/scripts"


interface User {
  id?: number
  name?: string
  username?: string
}

interface Produk {
  id?: number
  nama?: string
  harga?: number
}

interface Transaksi {
  id?: number
  user?: User
  produk?: Produk
  namaPembeli?: string
  emailPembeli?: string
  totalHarga?: number
  createdAt?: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [transaksi, setTransaksi] = useState<Transaksi[]>([])
  const [stats, setStats] = useState({
    totalUser: 0,
    totalProduk: 0,
    totalTransaksi: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.username.toLowerCase() !== "admin") {
      router.push("/seller")
      return
    }

    setUser(parsedUser)
    fetchData()
  }, [router])

  const fetchData = async () => {
    setLoading(true)
    setError("")
    try {
      const [resTransaksi, resUser, resProduk] = await Promise.all([
        fetch(API_TRANSAKSI),
        fetch(API_USER),
        fetch(API_PRODUK),
      ])

      if (!resTransaksi.ok || !resUser.ok || !resProduk.ok) {
        throw new Error("Gagal mengambil data")
      }

      const dataTransaksi = await resTransaksi.json()
      const dataUser = await resUser.json()
      const dataProduk = await resProduk.json()

      console.log("Transaksi data:", dataTransaksi.data)
      if (dataTransaksi.data && dataTransaksi.data.length > 0) {
        console.log("First transaksi:", dataTransaksi.data[0])
        console.log("emailPembeli sample:", dataTransaksi.data[0].emailPembeli)
      }
      setTransaksi(dataTransaksi.data || [])

      const totalRevenue = (dataTransaksi.data || []).reduce(
        (sum: number, t: Transaksi) => sum + (t.totalHarga || 0),
        0
      )

      setStats({
        totalUser: dataUser.data?.length || 0,
        totalProduk: dataProduk.data?.length || 0,
        totalTransaksi: dataTransaksi.data?.length || 0,
        totalRevenue: totalRevenue,
      })
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Gagal memuat data. Pastikan API berjalan dengan baik.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-neutral-50">Dashboard Admin</h1>
            <p className="mt-2 text-neutral-400">Selamat datang, {user.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="border border-neutral-700 bg-neutral-800 text-neutral-50 hover:bg-neutral-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex gap-3 rounded-md border border-red-800 bg-red-950/50 p-4">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <div className="mb-8 grid gap-6 md:grid-cols-4">
              <Card className="border-neutral-800 bg-neutral-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-50">
                    Total User
                  </CardTitle>
                  <Users className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-neutral-50">{stats.totalUser}</div>
                  <p className="text-xs text-neutral-400">Kelola semua user</p>
                </CardContent>
              </Card>

              <Card className="border-neutral-800 bg-neutral-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-50">
                    Total Produk
                  </CardTitle>
                  <Package className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-neutral-50">{stats.totalProduk}</div>
                  <p className="text-xs text-neutral-400">Kelola semua produk</p>
                </CardContent>
              </Card>

              <Card className="border-neutral-800 bg-neutral-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-50">
                    Total Transaksi
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-neutral-50">{stats.totalTransaksi}</div>
                  <p className="text-xs text-neutral-400">Kelola semua transaksi</p>
                </CardContent>
              </Card>

              <Card className="border-neutral-800 bg-neutral-900/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-neutral-50">
                    Total Revenue
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-neutral-50">{formatRupiah(stats.totalRevenue)}</div>
                  <p className="text-xs text-neutral-400">Total pendapatan</p>
                </CardContent>
              </Card>
            </div>

            {/* Transaksi Table */}
            <Card className="border-neutral-800 bg-neutral-900/50">
              <CardHeader>
                <CardTitle className="text-neutral-50">Data Transaksi Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800">
                        <th className="px-4 py-3 text-left font-semibold text-neutral-50">ID</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-50">Nama Pembeli</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-50">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-50">Username</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-50">Produk</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-50">Harga</th>
                        <th className="px-4 py-3 text-left font-semibold text-neutral-50">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaksi.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-6 text-center text-neutral-400">
                            Tidak ada transaksi
                          </td>
                        </tr>
                      ) : (
                        transaksi.slice(0, 10).map((transaksi) => (
                          <tr key={transaksi.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                            <td className="px-4 py-3 text-neutral-50">{transaksi.id}</td>
                            <td className="px-4 py-3 text-neutral-50">{transaksi.namaPembeli || transaksi.user?.name || "-"}</td>
                            <td className="px-4 py-3 text-neutral-50 text-xs">{transaksi.emailPembeli || "-"}</td>
                            <td className="px-4 py-3 text-neutral-50 text-xs">{transaksi.user?.username || "-"}</td>
                            <td className="px-4 py-3 text-neutral-50">{transaksi.produk?.nama || "-"}</td>
                            <td className="px-4 py-3 text-neutral-50">{formatRupiah(transaksi.totalHarga || 0)}</td>
                            <td className="px-4 py-3 text-neutral-400 text-xs">{formatWIB(transaksi.createdAt)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
