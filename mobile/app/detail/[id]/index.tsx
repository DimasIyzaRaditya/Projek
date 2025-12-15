import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

interface Produk {
  id: number
  nama: string
  harga: number
  deskripsi?: string
  rating?: number
  downloads?: number
}

const getIconByTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase()
  
  if (lowerTitle.includes("ebook") || lowerTitle.includes("e-book") || lowerTitle.includes("buku")) {
    return "book-open"
  }
  if (lowerTitle.includes("source code") || lowerTitle.includes("script") || lowerTitle.includes("code")) {
    return "code-braces"
  }
  if (lowerTitle.includes("icon") || lowerTitle.includes("design") || lowerTitle.includes("ilustrasi") || lowerTitle.includes("font")) {
    return "palette"
  }
  if (lowerTitle.includes("template") || lowerTitle.includes("ui") || lowerTitle.includes("ux") || lowerTitle.includes("dashboard")) {
    return "layout-grid"
  }
  
  return "download"
}

const generateDescription = (nama: string) => {
  const lowerNama = nama.toLowerCase()
  
  if (lowerNama.includes('ebook') || lowerNama.includes('e-book') || lowerNama.includes('buku')) {
    return `${nama}\n\nE-Book digital berkualitas tinggi dengan konten lengkap dan mendalam.\n\nYang Anda dapatkan:\n• Format PDF berkualitas tinggi\n• Konten lengkap dan terstruktur\n• Mudah dibaca di berbagai perangkat\n• Lifetime access\n• Free updates`
  }
  
  if (lowerNama.includes('source code') || lowerNama.includes('script') || lowerNama.includes('code')) {
    return `${nama}\n\nSource code lengkap dan siap pakai.\n\nYang Anda dapatkan:\n• Source code lengkap\n• Dokumentasi penggunaan\n• Clean code & best practices\n• Easy to customize\n• Lifetime access\n• Free updates`
  }
  
  if (lowerNama.includes('template') || lowerNama.includes('ui') || lowerNama.includes('dashboard')) {
    return `${nama}\n\nTemplate UI/UX modern dan responsive.\n\nYang Anda dapatkan:\n• Design modern & clean\n• Fully responsive\n• Komponen siap pakai\n• Easy to customize\n• Lifetime access\n• Free updates`
  }
  
  if (lowerNama.includes('icon') || lowerNama.includes('design') || lowerNama.includes('ilustrasi') || lowerNama.includes('font')) {
    return `${nama}\n\nKoleksi aset design berkualitas tinggi.\n\nYang Anda dapatkan:\n• File berkualitas tinggi\n• Multiple format\n• Easy to use\n• Scalable vector\n• Lifetime access\n• Free updates`
  }
  
  return `${nama}\n\nProduk digital berkualitas tinggi yang siap digunakan.\n\nYang Anda dapatkan:\n• Kualitas terbaik\n• Instant download\n• Lifetime access\n• Free updates`
}

export default function ProductDetailPage() {
  // buat state
  const router = useRouter()
    const { id } = useLocalSearchParams()
    const [product, setProduct] = useState<Produk | null>(null)
    const [loading, setLoading] = useState(true)
  
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}