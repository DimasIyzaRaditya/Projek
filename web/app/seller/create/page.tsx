"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { API_PRODUK } from "@/lib/api"

export default function CreateProductPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
  })

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.nama.trim() || !formData.harga.trim()) {
      setError("Nama produk dan harga harus diisi")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(API_PRODUK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama.trim(),
          harga: parseInt(formData.harga),
          deskripsi: formData.deskripsi.trim() || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Gagal menambahkan produk")
        setLoading(false)
        return
      }

      alert("Produk berhasil ditambahkan!")
      router.push("/seller")
    } catch (err) {
      console.error("Error:", err)
      setError("Terjadi kesalahan saat menambahkan produk")
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Link href="/seller">
          <Button variant="ghost" size="sm" className="mb-6 hover:bg-neutral-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </Link>

        <Card className="max-w-2xl border-neutral-800 bg-neutral-900/50">
          <CardHeader>
            <CardTitle className="text-2xl text-neutral-50">Tambah Produk Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md border border-red-800 bg-red-950/50 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="nama">Nama Produk *</Label>
                <Input
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder="Masukkan nama produk"
                  value={formData.nama}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="harga">Harga (Rp) *</Label>
                <Input
                  id="harga"
                  name="harga"
                  type="number"
                  placeholder="Masukkan harga produk"
                  value={formData.harga}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
                <Textarea
                  id="deskripsi"
                  name="deskripsi"
                  placeholder="Masukkan deskripsi produk"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  disabled={loading}
                  rows={5}
                />
              </div>

              <div className="flex gap-3">
                <Link href="/seller" className="flex-1">
                  <Button
                    type="button"
                    disabled={loading}
                    className="w-full border border-neutral-700 bg-neutral-800 text-neutral-50 hover:bg-neutral-700"
                  >
                    Batal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-neutral-50 hover:bg-blue-700"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Simpan Produk
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
