// Import komponen Stack dari expo-router untuk navigasi
import { Stack } from 'expo-router';
// Import StatusBar untuk mengatur tampilan status bar
import { StatusBar } from 'react-native';
// Import reanimated untuk animasi
import 'react-native-reanimated';

// Komponen layout utama aplikasi
export default function RootLayout() {
  return (
    <>
      {/* Stack Navigator untuk mengatur navigasi antar halaman */}
      <Stack screenOptions={{
        headerShown: false // Sembunyikan header default
      }}>
        {/* Screen untuk tabs utama */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Screen untuk halaman public */}
        <Stack.Screen name="public/index" />
        {/* Screen untuk halaman admin */}
        <Stack.Screen name="admin/index" />
        {/* Screen untuk halaman seller */}
        <Stack.Screen name="seller/index" />
        {/* Screen untuk halaman detail produk dengan parameter id */}
        <Stack.Screen name="detail/[id]/index" />
        {/* Screen untuk halaman login */}
        <Stack.Screen name="login/index" />
        {/* Screen modal dengan presentasi modal */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      {/* StatusBar dengan style light dan background hitam */}
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
    </>
  );
}
