// Import komponen View dan Text dari React Native
import { View, Text } from 'react-native'
// Import React
import React from 'react'
// Import Stack dari expo-router untuk navigasi
import { Stack } from 'expo-router'

// Komponen layout untuk tabs public
export default function PublicLayout() {
  return (
    // Stack navigator dengan header tersembunyi
    <Stack
      screenOptions={{
        headerShown: false, // Sembunyikan header di semua screen
      }}
    >
      {/* Screen index (halaman utama tabs) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Screen login */}
      <Stack.Screen name="login/index" />
    </Stack>
  )
}
