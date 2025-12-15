import { View, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function SellerPage() {
  // buat state
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // import AsyncStorage from '@react-native-async-storage/async-storage'
      // const userData = await AsyncStorage.getItem("user")
      // if (!userData) {
      //   router.push("/login")
      //   return
      // }

      // const parsedUser = JSON.parse(userData)
      // if (parsedUser.username.toLowerCase() === "admin") {
      //   router.push("/admin")
      //   return
      // }

      // setUser(parsedUser)
      setLoading(false)
    }

    checkAuth()
  }, [])

  return (
    <View>
      <Text>index</Text>
    </View>
  )
}