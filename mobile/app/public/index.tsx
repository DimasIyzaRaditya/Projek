import { View, Text, ScrollView, Image, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { API_PRODUK } from "@/scripts/api";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Produk {
  id: number;
  nama: string;
  harga: number;
}

async function getProduk(): Promise<Produk[]> {
  try {
    console.log("🔄 Fetching products from:", API_PRODUK);

    const res = await fetch(API_PRODUK, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("📊 Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ API error:", res.status, errorText);
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ API response:", data);

    const products = Array.isArray(data.data) ? data.data : [];
    console.log("📦 Total products:", products.length);

    return products;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}
// buat state
export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView>
      {/* Header */}
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          backgroundColor: "#111111",
          borderBottomWidth: 1,
          borderBottomColor: "#262626",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo and Brand */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 40, height: 40, borderRadius: 6 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#fafafa",
              marginLeft: 12,
            }}
          >
            Ahmeng Trade
          </Text>
        </View>

        {/* Login Button */}
        <Pressable
          onPress={() => router.push("./login")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#3b82f6" : "#2563eb",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 6,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#fafafa" }}>
            Login
          </Text>
        </Pressable>
      </View>
      {/* Main Section */}
      {/* Search Input */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1a1a1a",
          borderWidth: 1,
          borderColor: "#404040",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
      >
        <MaterialCommunityIcons name="magnify" size={20} color="#a3a3a3" />
        <TextInput
          placeholder="Cari produk digital..."
          placeholderTextColor="#666666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            flex: 1,
            marginLeft: 12,
            fontSize: 14,
            color: "#fafafa",
            paddingVertical: 8,
          }}
        />
      </View>
      <View
        style={{
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: "#0a0a0a",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#fafafa",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Marketplace File Digital
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#a3a3a3",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Koleksi pribadi template, ebook, source code, dan aset digital untuk
          mereka yang berbagi minat yang sama
        </Text>
      </View>
    </ScrollView>
  );
}
