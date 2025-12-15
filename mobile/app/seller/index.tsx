import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function SellerPage() {
  // buat state
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

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
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin logout?", [
      { text: "Batal", onPress: () => {} },
      {
        text: "Logout",
        onPress: async () => {
          // import AsyncStorage from '@react-native-async-storage/async-storage'
          // await AsyncStorage.removeItem("user")
          router.push("/(public)" as never);
        },
      },
    ]);
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
              Dashboard Seller
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
            Selamat datang, Seller
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingVertical: 20, paddingHorizontal: 16 }}>
          {/* Produk Saya */}
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
                Produk Saya
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
              Total produk yang dijual
            </Text>
          </View>

          {/* Transaksi */}
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
                Transaksi
              </Text>
              <MaterialCommunityIcons name="cart" size={16} color="#a3a3a3" />
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
              Total transaksi
            </Text>
          </View>

          {/* Pendapatan */}
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
                Pendapatan
              </Text>
              <MaterialCommunityIcons
                name="currency-usd"
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
              Rp -
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Total pendapatan
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
