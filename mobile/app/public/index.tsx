import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
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

      {/* Stats Section */}
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 16,
          backgroundColor: "#0a0a0a",
          borderTopWidth: 1,
          borderTopColor: "#262626",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <MaterialCommunityIcons name="download" size={24} color="#a3a3a3" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fafafa",
                marginTop: 8,
              }}
            >
              10K+
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3", marginTop: 4 }}>
              Total Download
            </Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <MaterialCommunityIcons
              name="trending-up"
              size={24}
              color="#a3a3a3"
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fafafa",
                marginTop: 8,
              }}
            >
              500+
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3", marginTop: 4 }}>
              Produk Digital
            </Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <MaterialCommunityIcons name="star" size={24} color="#a3a3a3" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fafafa",
                marginTop: 8,
              }}
            >
              4.8
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3", marginTop: 4 }}>
              Rating Rata-rata
            </Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <MaterialCommunityIcons name="trophy" size={24} color="#a3a3a3" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fafafa",
                marginTop: 8,
              }}
            >
              100+
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3", marginTop: 4 }}>
              Penjual Terpercaya
            </Text>
          </View>
        </View>
      </View>

      {/* Featured Products */}
      <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#fafafa",
            marginBottom: 8,
          }}
        >
          Produk Digital
        </Text>
        <Text style={{ fontSize: 14, color: "#a3a3a3", marginBottom: 16 }}>
          Temukan berbagai produk digital berkualitas untuk kebutuhan Anda
        </Text>

        {/* Table Header */}
        <View
          style={{
            backgroundColor: "#1a1a1a",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#404040",
            paddingVertical: 12,
            paddingHorizontal: 12,
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#262626",
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              fontWeight: "700",
              color: "#fafafa",
              textTransform: "uppercase",
            }}
          >
            Nama Produk
          </Text>
          <Text
            style={{
              width: 100,
              fontSize: 12,
              fontWeight: "700",
              color: "#fafafa",
              textTransform: "uppercase",
              textAlign: "right",
            }}
          >
            Harga
          </Text>
        </View>

        {/* Table Body */}
        {loading ? (
          <View
            style={{
              backgroundColor: "#1a1a1a",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderLeftWidth: 1,
              borderLeftColor: "#262626",
              borderRightWidth: 1,
              borderRightColor: "#262626",
              borderBottomWidth: 1,
              borderBottomColor: "#262626",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 40,
            }}
          >
            <MaterialCommunityIcons
              name="loading"
              size={32}
              color="#a3a3a3"
              style={{ marginBottom: 12 }}
            />
            <Text style={{ color: "#a3a3a3", fontSize: 14 }}>
              Memuat produk...
            </Text>
          </View>
        ) : error ? (
          <View
            style={{
              backgroundColor: "#1a1a1a",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderLeftWidth: 1,
              borderLeftColor: "#262626",
              borderRightWidth: 1,
              borderRightColor: "#262626",
              borderBottomWidth: 1,
              borderBottomColor: "#262626",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 40,
            }}
          >
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={32}
              color="#f87171"
              style={{ marginBottom: 12 }}
            />
            <Text style={{ color: "#f87171", fontSize: 14, marginBottom: 12 }}>
              {error}
            </Text>
            <Pressable
              onPress={() => {
                setLoading(true);
                setError("");
                getProduk().then((data) => {
                  if (data && data.length > 0) {
                    setProducts(data);
                  }
                  setLoading(false);
                });
              }}
              style={{
                backgroundColor: "#fafafa",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <Text
                style={{ color: "#0a0a0a", fontWeight: "600", fontSize: 12 }}
              >
                Coba Lagi
              </Text>
            </Pressable>
          </View>
        ) : products && products.length > 0 ? (
          products.map((product, index) => (
            <Pressable
              key={product.id}
              onPress={() => router.push(`/detail/${product.id}` as never)}
              style={{
                backgroundColor: index % 2 === 0 ? "#0f0f0f" : "#1a1a1a",
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderBottomWidth: index === products.length - 1 ? 0 : 1,
                borderBottomColor: "#262626",
                borderLeftWidth: 1,
                borderLeftColor: "#262626",
                borderRightWidth: 1,
                borderRightColor: "#262626",
                borderBottomLeftRadius: index === products.length - 1 ? 8 : 0,
                borderBottomRightRadius: index === products.length - 1 ? 8 : 0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#fafafa" }}
                >
                  {product.nama}
                </Text>
              </View>
              <View
                style={{
                  width: 100,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#fafafa" }}
                >
                  Rp {product.harga.toLocaleString("id-ID")}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color="#a3a3a3"
                />
              </View>
            </Pressable>
          ))
        ) : (
          <View
            style={{
              backgroundColor: "#1a1a1a",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderWidth: 1,
              borderColor: "#262626",
              paddingVertical: 32,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={32}
              color="#a3a3a3"
              style={{ marginBottom: 12 }}
            />
            <Text style={{ color: "#a3a3a3", fontSize: 14 }}>
              Belum ada produk tersedia
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#262626",
          backgroundColor: "#0a0a0a",
          paddingVertical: 24,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#fafafa",
              marginBottom: 8,
            }}
          >
            DigitalMarket
          </Text>
          <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
            Platform jual beli file digital terpercaya di Indonesia
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#fafafa",
              marginBottom: 8,
            }}
          >
            Produk
          </Text>
          <Text style={{ fontSize: 12, color: "#a3a3a3", marginBottom: 4 }}>
            Template
          </Text>
          <Text style={{ fontSize: 12, color: "#a3a3a3", marginBottom: 4 }}>
            E-Book
          </Text>
          <Text style={{ fontSize: 12, color: "#a3a3a3", marginBottom: 4 }}>
            Source Code
          </Text>
          <Text style={{ fontSize: 12, color: "#a3a3a3" }}>Assets</Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: "#a3a3a3",
            textAlign: "center",
            borderTopWidth: 1,
            borderTopColor: "#262626",
            paddingTop: 20,
          }}
        >
          © 2025 Ahmeng Trade. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}
