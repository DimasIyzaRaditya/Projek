"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { API_PRODUK_BY_ID, API_PRODUK } from "@/lib/api"

interface Produk {
  id: number
  nama: string
  harga: number
  deskripsi?: string
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<Produk>({
    id: 0,
    nama: "",
    harga: 0,
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
    fetchProduct()
  }, [router, id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await fetch(API_PRODUK_BY_ID(parseInt(id)))
      if (!res.ok) throw new Error("Produk tidak ditemukan")
      const data = await res.json()
      setFormData(data.data)
    } catch (err) {
      console.error("Error fetching product:", err)
      setError("Gagal memuat data produk")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "harga" ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    if (!formData.nama.trim() || !formData.harga) {
      setError("Nama produk dan harga harus diisi")
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(`${API_PRODUK}/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama.trim(),
          harga: formData.harga,
          deskripsi: formData.deskripsi?.trim() || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Gagal mengupdate produk")
        setSubmitting(false)
        return
      }

      alert("Produk berhasil diupdate!")
      router.push("/seller")
    } catch (err) {
      console.error("Error:", err)
      setError("Terjadi kesalahan saat mengupdate produk")
      setSubmitting(false)
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
            <CardTitle className="text-2xl text-neutral-50">Edit Produk</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              </div>
            ) : (
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
                    disabled={submitting}
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
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi (Opsional)</Label>
                  <Textarea
                    id="deskripsi"
                    name="deskripsi"
                    placeholder="Masukkan deskripsi produk"
                    value={formData.deskripsi || ""}
                    onChange={handleChange}
                    disabled={submitting}
                    rows={5}
                  />
                </div>

                <div className="flex gap-3">
                  <Link href="/seller" className="flex-1">
                    <Button
                      type="button"
                      disabled={submitting}
                      className="w-full border border-neutral-700 bg-neutral-800 text-neutral-50 hover:bg-neutral-700"
                    >
                      Batal
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-neutral-50 hover:bg-blue-700"
                  >
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
