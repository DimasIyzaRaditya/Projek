import { View, Text } from 'react-native'
import React from 'react'

export default function AdminPage() {
  // buat state
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}