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

export default function ProductDetailPage() {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}