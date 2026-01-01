"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createTransaksi } from "@/lib/scripts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BuyNowButtonProps {
  produkId: number
  produkNama: string
  harga: number
}

export default function BuyNowButton({ produkId, produkNama, harga }: BuyNowButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [transaksiId, setTransaksiId] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    namaPembeli: "",
    emailPembeli: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Validasi input
      if (!formData.namaPembeli.trim()) {
        setError("Nama pembeli harus diisi")
        setIsLoading(false)
        return
      }

      if (!formData.emailPembeli.trim()) {
        setError("Email pembeli harus diisi")
        setIsLoading(false)
        return
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.emailPembeli)) {
        setError("Format email tidak valid")
        setIsLoading(false)
        return
      }

      // Create transaksi (without userId - guest purchase)
      const result = await createTransaksi({
        produkId: produkId,
        totalHarga: harga,
        namaPembeli: formData.namaPembeli.trim(),
        emailPembeli: formData.emailPembeli.trim(),
      })

      // Success - show success dialog
      setTransaksiId(result.data.id)
      setIsOpen(false)
      setIsSuccessOpen(true)
      
      // Reset form
      setFormData({
        namaPembeli: "",
        emailPembeli: "",
      })
      
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat membeli produk")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccessClose = () => {
    setIsSuccessOpen(false)
    router.push("/")
  }

  return (
    <>
      {/* Purchase Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full bg-neutral-50 text-neutral-900 hover:bg-white shadow-md font-medium" 
          size="lg"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Beli Sekarang
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembelian</DialogTitle>
          <DialogDescription>
            Lengkapi data pembeli untuk melanjutkan pembelian {produkNama}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="namaPembeli">Nama Pembeli *</Label>
            <Input
              id="namaPembeli"
              type="text"
              placeholder="Masukkan nama pembeli"
              value={formData.namaPembeli}
              onChange={(e) => setFormData({ ...formData, namaPembeli: e.target.value })}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emailPembeli">Email Pembeli *</Label>
            <Input
              id="emailPembeli"
              type="email"
              placeholder="pembeli@example.com"
              value={formData.emailPembeli}
              onChange={(e) => setFormData({ ...formData, emailPembeli: e.target.value })}
              disabled={isLoading}
              required
            />
          </div>

          <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">Total Pembayaran:</span>
              <span className="text-2xl font-bold text-neutral-50">
                Rp {harga.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-900 text-red-400 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-neutral-50 text-neutral-900 hover:bg-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Konfirmasi Pembelian"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    {/* Success Dialog */}
    <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-500/10 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Pembelian Berhasil!</DialogTitle>
          <DialogDescription className="text-center">
            Terima kasih telah membeli <span className="font-semibold text-neutral-50">{produkNama}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">ID Transaksi</span>
              <span className="font-mono font-semibold text-neutral-50">#{transaksiId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Total Pembayaran</span>
              <span className="font-bold text-neutral-50 text-lg">
                Rp {harga.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="bg-blue-950/30 border border-blue-900/50 p-4 rounded-lg">
            <p className="text-sm text-blue-300">
              📧 Link download akan dikirim ke email <span className="font-semibold">{formData.emailPembeli}</span> dalam beberapa menit.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSuccessClose}
          className="w-full bg-neutral-50 text-neutral-900 hover:bg-white font-medium"
          size="lg"
        >
          Kembali ke Beranda
        </Button>
      </DialogContent>
    </Dialog>
    </>
  )
}
