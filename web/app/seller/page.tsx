"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, LogOut, DollarSign, Plus, Edit2, Trash2, Loader2, AlertCircle } from "lucide-react"
import { API_PRODUK, API_TRANSAKSI } from "@/lib/api"
import { formatRupiah } from "@/lib/scripts"


interface Produk {
  id?: number
  nama?: string
  harga?: number
  deskripsi?: string
  createdAt?: string
}

interface Transaksi {
  id: number
  userId: number
  produkId: number
  totalHarga: number
  namaPembeli?: string
  emailPembeli?: string
  createdAt: string
}

export default function SellerPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [produkList, setProdukList] = useState<Produk[]>([])
  const [transaksiList, setTransaksiList] = useState<Transaksi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

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
    fetchProduk()
    fetchTransaksi()
  }, [router])

  const fetchProduk = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(API_PRODUK)
      const json = await res.json()
      setProdukList(json.data || [])
    } catch (e) {
      console.error("Error fetching products:", e)
      setError("Gagal memuat produk")
      setProdukList([])
    }
    setLoading(false)
  }

  const fetchTransaksi = async () => {
    try {
      const res = await fetch(API_TRANSAKSI)
      const json = await res.json()
      setTransaksiList(json.data || [])
    } catch (e) {
      console.error("Error fetching transactions:", e)
      setTransaksiList([])
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleDelete = (id: number) => {
    console.log("handleDelete called with id:", id)
    setProductToDelete(id)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    if (productToDelete === null) return

    console.log("Attempting to delete product with id:", productToDelete)
    setDeleting(true)

    try {
      const res = await fetch(`${API_PRODUK}/${productToDelete}`, {
        method: "DELETE",
      })
      console.log("Delete response status:", res.status)

      if (res.ok) {
        console.log("Delete successful!")
        setDeleteModalVisible(false)
        setProductToDelete(null)
        alert("Produk berhasil dihapus")
        fetchProduk()
      } else {
        const errorData = await res.json()
        console.log("Delete error:", errorData)
        alert(errorData.error || "Gagal menghapus produk")
      }
    } catch (e) {
      console.log("Delete exception:", e)
      alert("Terjadi kesalahan: " + String(e))
    } finally {
      setDeleting(false)
    }
  }

  if (!user) return null

  const stats = {
    totalProduk: produkList.length,
    totalTransaksi: transaksiList.length,
    totalRevenue: transaksiList.reduce((sum, t) => sum + t.totalHarga, 0),
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-neutral-50">Dashboard Seller</h1>
            <p className="mt-2 text-neutral-400">Selamat datang, {user.name}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/seller/create">
              <Button className="bg-blue-600 text-neutral-50 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Produk
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              className="border border-neutral-700 bg-neutral-800 text-neutral-50 hover:bg-neutral-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex gap-3 rounded-md border border-red-800 bg-red-950/50 p-4">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-1">
          <Card className="border-neutral-800 bg-neutral-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-50">
                Produk Saya
              </CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neutral-50">{stats.totalProduk}</div>
              <p className="text-xs text-neutral-400">Total produk yang dijual</p>
            </CardContent>
          </Card>
        </div>

        {/* Produk List */}
        <Card className="border-neutral-800 bg-neutral-900/50">
          <CardHeader>
            <CardTitle className="text-neutral-50">Daftar Produk Saya</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              </div>
            ) : produkList.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-neutral-600 mb-4" />
                <p className="text-neutral-400">Anda belum memiliki produk</p>
                <Link href="/seller/create">
                  <Button className="mt-4 bg-blue-600 text-neutral-50 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Produk Pertama
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="px-4 py-3 text-left font-semibold text-neutral-50">ID</th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-50">Nama Produk</th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-50">Harga</th>
                      <th className="px-4 py-3 text-left font-semibold text-neutral-50">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produkList.map((Produk) => (
                      <tr key={Produk.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                        <td className="px-4 py-3 text-neutral-50">{Produk.id}</td>
                        <td className="px-4 py-3 text-neutral-50">{Produk.nama}</td>
                        <td className="px-4 py-3 text-neutral-50">{formatRupiah(Produk.harga)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Link href={`/seller/edit/${Produk.id}`}>
                              <Button size="sm" className="bg-blue-600 text-neutral-50 hover:bg-blue-700">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              onClick={() => handleDelete(Produk.id || 0)}
                              className="bg-red-600 text-neutral-50 hover:bg-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 p-4 z-50">
          <Card className="w-full max-w-sm border-neutral-800 bg-neutral-900">
            <CardHeader>
              <CardTitle className="text-neutral-50">Hapus Produk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-400">Apakah Anda yakin ingin menghapus produk ini?</p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setDeleteModalVisible(false)}
                  disabled={deleting}
                  className="flex-1 border border-neutral-700 bg-neutral-800 text-neutral-50 hover:bg-neutral-700"
                >
                  Batal
                </Button>
                <Button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-600 text-neutral-50 hover:bg-red-700"
                >
                  {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Hapus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
