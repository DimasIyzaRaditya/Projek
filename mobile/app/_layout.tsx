import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="public/index" />
        <Stack.Screen name="admin/index" />
        <Stack.Screen name="seller/index" />
        <Stack.Screen name="detail/[id]/index" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
    </>
  );
}
