import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  if (!loading) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
        {/* Header */}
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#262626",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#fafafa" }}
            >
              Dashboard Admin
            </Text>
            <Pressable
              onPress={handleLogout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#404040",
                backgroundColor: "#1f1f1f",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <MaterialCommunityIcons
                name="logout"
                size={16}
                color="#fafafa"
                style={{ marginRight: 6 }}
              />
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#fafafa" }}
              >
                Logout
              </Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
            Selamat datang, Admin
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingVertical: 20, paddingHorizontal: 16 }}>
          {/* Total User */}
          <View
            style={{
              backgroundColor: "rgba(23, 23, 23, 0.5)",
              borderWidth: 1,
              borderColor: "#262626",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#fafafa" }}
              >
                Total User
              </Text>
              <MaterialCommunityIcons
                name="account-multiple"
                size={16}
                color="#a3a3a3"
              />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#fafafa",
                marginBottom: 4,
              }}
            >
              -
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Kelola semua user
            </Text>
          </View>

          {/* Total Produk */}
          <View
            style={{
              backgroundColor: "rgba(23, 23, 23, 0.5)",
              borderWidth: 1,
              borderColor: "#262626",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#fafafa" }}
              >
                Total Produk
              </Text>
              <MaterialCommunityIcons
                name="package-variant"
                size={16}
                color="#a3a3a3"
              />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#fafafa",
                marginBottom: 4,
              }}
            >
              -
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Kelola semua produk
            </Text>
          </View>

          {/* Total Transaksi */}
          <View
            style={{
              backgroundColor: "rgba(23, 23, 23, 0.5)",
              borderWidth: 1,
              borderColor: "#262626",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#fafafa" }}
              >
                Total Transaksi
              </Text>
              <MaterialCommunityIcons
                name="shopping"
                size={16}
                color="#a3a3a3"
              />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#fafafa",
                marginBottom: 4,
              }}
            >
              -
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Kelola semua transaksi
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}