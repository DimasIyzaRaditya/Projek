import { View, Text, Alert, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_PRODUK_BY_ID } from "@/scripts/api";
import { formatRupiah } from "@/scripts/helpers";

interface Produk {
  id: number;
  nama: string;
  harga: number;
  deskripsi?: string;
  rating?: number;
  downloads?: number;
}

const getIconByTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle.includes("ebook") ||
    lowerTitle.includes("e-book") ||
    lowerTitle.includes("buku")
  ) {
    return "book-open";
  }
  if (
    lowerTitle.includes("source code") ||
    lowerTitle.includes("script") ||
    lowerTitle.includes("code")
  ) {
    return "code-braces";
  }
  if (
    lowerTitle.includes("icon") ||
    lowerTitle.includes("design") ||
    lowerTitle.includes("ilustrasi") ||
    lowerTitle.includes("font")
  ) {
    return "palette";
  }
  if (
    lowerTitle.includes("template") ||
    lowerTitle.includes("ui") ||
    lowerTitle.includes("ux") ||
    lowerTitle.includes("dashboard")
  ) {
    return "layout-grid";
  }

  return "download";
};

const generateDescription = (nama: string) => {
  const lowerNama = nama.toLowerCase();

  if (
    lowerNama.includes("ebook") ||
    lowerNama.includes("e-book") ||
    lowerNama.includes("buku")
  ) {
    return `${nama}\n\nE-Book digital berkualitas tinggi dengan konten lengkap dan mendalam.\n\nYang Anda dapatkan:\n• Format PDF berkualitas tinggi\n• Konten lengkap dan terstruktur\n• Mudah dibaca di berbagai perangkat\n• Lifetime access\n• Free updates`;
  }

  if (
    lowerNama.includes("source code") ||
    lowerNama.includes("script") ||
    lowerNama.includes("code")
  ) {
    return `${nama}\n\nSource code lengkap dan siap pakai.\n\nYang Anda dapatkan:\n• Source code lengkap\n• Dokumentasi penggunaan\n• Clean code & best practices\n• Easy to customize\n• Lifetime access\n• Free updates`;
  }

  if (
    lowerNama.includes("template") ||
    lowerNama.includes("ui") ||
    lowerNama.includes("dashboard")
  ) {
    return `${nama}\n\nTemplate UI/UX modern dan responsive.\n\nYang Anda dapatkan:\n• Design modern & clean\n• Fully responsive\n• Komponen siap pakai\n• Easy to customize\n• Lifetime access\n• Free updates`;
  }

  if (
    lowerNama.includes("icon") ||
    lowerNama.includes("design") ||
    lowerNama.includes("ilustrasi") ||
    lowerNama.includes("font")
  ) {
    return `${nama}\n\nKoleksi aset design berkualitas tinggi.\n\nYang Anda dapatkan:\n• File berkualitas tinggi\n• Multiple format\n• Easy to use\n• Scalable vector\n• Lifetime access\n• Free updates`;
  }

  return `${nama}\n\nProduk digital berkualitas tinggi yang siap digunakan.\n\nYang Anda dapatkan:\n• Kualitas terbaik\n• Instant download\n• Lifetime access\n• Free updates`;
};

export default function ProductDetailPage() {
  // buat state
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Produk | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(API_PRODUK_BY_ID(Number(id)));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const produk = data.data;
        setProduct({
          ...produk,
          deskripsi: generateDescription(produk.nama),
          rating: 4.5 + Math.random() * 0.4,
          downloads: Math.floor(100 + Math.random() * 900),
        });
      } catch (error) {
        console.error("Error fetching produk:", error);
        Alert.alert("Error", "Gagal memuat produk");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0a0a0a",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fafafa", fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0a0a0a",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#fafafa",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Produk Tidak Ditemukan
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#a3a3a3",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Produk yang Anda cari tidak tersedia
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: "#fafafa",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#0a0a0a" }}>
            Kembali
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginVertical: 8,
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={20}
          color="#fafafa"
          style={{ marginRight: 8 }}
        />
        <Text style={{ fontSize: 14, color: "#fafafa" }}>Kembali</Text>
      </Pressable>

      {/* Product Image */}
      <View
        style={{
          aspectRatio: 16 / 9,
          backgroundColor: "rgba(64, 64, 64, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#262626",
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons
          name={getIconByTitle(product.nama) as any}
          size={48}
          color="#fafafa"
        />
      </View>

      {/* Product Content */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        {/* Title & Rating */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#fafafa",
              marginBottom: 12,
            }}
          >
            {product.nama}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <MaterialCommunityIcons name="star" size={16} color="#eab308" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#fafafa",
                  marginLeft: 4,
                }}
              >
                {product.rating?.toFixed(1)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="download"
                size={16}
                color="#a3a3a3"
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3", marginLeft: 4 }}>
                {product.downloads?.toLocaleString("id-ID")} downloads
              </Text>
            </View>
          </View>

          {/* Price */}
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#fafafa" }}>
            {formatRupiah(product.harga)}
          </Text>
        </View>

        {/* Description */}
        <View
          style={{
            marginBottom: 32,
            paddingBottom: 24,
            borderBottomWidth: 1,
            borderBottomColor: "#262626",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#fafafa",
              marginBottom: 12,
            }}
          >
            Deskripsi Produk
          </Text>
          <Text style={{ fontSize: 14, color: "#a3a3a3", lineHeight: 22 }}>
            {product.deskripsi}
          </Text>
        </View>

        {/* Features */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#fafafa",
              marginBottom: 12,
            }}
          >
            Apa yang Anda Dapatkan
          </Text>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Instant download
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Lifetime access
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Free updates
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Money back guarantee
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12 }}>
          <Pressable
            style={{
              backgroundColor: "#fafafa",
              paddingVertical: 14,
              borderRadius: 6,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() =>
              Alert.alert("Info", "Fitur pembelian belum tersedia")
            }
          >
            <MaterialCommunityIcons
              name="cart"
              size={18}
              color="#0a0a0a"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#0a0a0a" }}>
              Beli Sekarang
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
