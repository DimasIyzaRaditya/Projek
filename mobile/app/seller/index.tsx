import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function SellerPage() {
  // buat state
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}