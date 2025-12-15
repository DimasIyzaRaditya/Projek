import { View, Text, Alert } from 'react-native'
import React, { useEffect } from 'react'
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

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin logout?", [
      { text: "Batal", onPress: () => {} },
      {
        text: "Logout",
        onPress: async () => {
          // import AsyncStorage from '@react-native-async-storage/async-storage'
          // await AsyncStorage.removeItem("user")
          router.push('/(public)' as never)
        },
      },
    ])
  }
   if (!loading) {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}
}