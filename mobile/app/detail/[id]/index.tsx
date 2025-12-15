import { View, Text } from 'react-native'
import React from 'react'

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

export default function ProductDetailPage() {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}