import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';

export default function AdminPage() {
  // buat state
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
    useEffect(() => {
    const checkAuth = async () => {
      setLoading(false);
    };

    checkAuth();
  }, []);
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}