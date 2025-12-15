import { View, Text } from 'react-native'
import React from 'react'

interface Produk {
  id: number;
  nama: string;
  harga: number;
}

export default function HomePage() {
  return (
    <View>
      <Text>HomePage</Text>
    </View>
  )
}