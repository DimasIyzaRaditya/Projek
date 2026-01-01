// Import komponen dari React Native
import { View, Text, Pressable, Image, ScrollView } from "react-native";
// Import React
import React from "react";
// Import useRouter untuk navigasi
import { useRouter } from "expo-router";
// Import icon dari expo vector icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Komponen halaman landing/beranda
export default function Landingpage() {
  // Hook untuk navigasi
  const router = useRouter();
  return (
    // ScrollView agar konten bisa di-scroll
    <ScrollView>
      {/* Container utama hero section */}
      <View
        style={{
          paddingVertical: 60, // Padding vertikal 60px
          paddingHorizontal: 16, // Padding horizontal 16px
          backgroundColor: "#0a0a0a", // Background hitam
          alignItems: "center", // Rata tengah horizontal
          justifyContent: "center", // Rata tengah vertikal
        }}
      >
        {/* Logo aplikasi */}
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 180, height: 180, marginBottom: 24 }}
          resizeMode="contain"
        />
        {/* Judul utama */}
        <Text
          style={{
            fontSize: 32, // Ukuran font 32px
            fontWeight: "bold", // Font tebal
            color: "#fafafa", // Warna putih
            textAlign: "center", // Text rata tengah
            marginBottom: 16, // Margin bawah 16px
          }}
        >
          Marketplace File Digital
        </Text>
        {/* Subtitle/deskripsi */}
        <Text
          style={{
            fontSize: 16, // Ukuran font 16px
            color: "#a3a3a3", // Warna abu-abu
            textAlign: "center", // Text rata tengah
            marginBottom: 32, // Margin bawah 32px
            lineHeight: 24, // Tinggi baris 24px
          }}
        >
          Koleksi pribadi template, ebook, source code, dan aset digital untuk
          kebutuhan Anda
        </Text>

        {/* Container untuk tombol CTA */}
        <View style={{ gap: 12, width: "100%", maxWidth: 320 }}>
          {/* Tombol Mulai Belanja */}
          <Pressable
            onPress={() => router.push("/public" as never)} // Navigasi ke halaman public
            style={{
              backgroundColor: "#fafafa", // Background putih
              paddingVertical: 14, // Padding vertikal 14px
              borderRadius: 8, // Border radius 8px
              alignItems: "center", // Rata tengah
              marginBottom: 12, // Margin bawah 12px
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#0a0a0a" }}>
              Mulai Belanja
            </Text>
          </Pressable>

          {/* Tombol Login Admin/Seller */}
          <Pressable
            onPress={() => router.push("/login" as never)} // Navigasi ke halaman login
            style={{
              borderWidth: 1, // Lebar border 1px
              borderColor: "#fafafa", // Warna border putih
              paddingVertical: 14, // Padding vertikal 14px
              borderRadius: 8, // Border radius 8px
              alignItems: "center", // Rata tengah
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fafafa" }}>
              Login Admin/Seller
            </Text>
          </Pressable>
        </View>
      </View>
      
      {/* Footer section */}
      <View
        style={{
          paddingVertical: 40, // Padding vertikal 40px
          paddingHorizontal: 16, // Padding horizontal 16px
          backgroundColor: "#111111", // Background gelap
        }}

      >
        {/* Footer Bottom - Copyright */}
        <View
          style={{
            marginTop: 32, // Margin atas 32px
            borderTopWidth: 1, // Lebar border atas 1px
            borderTopColor: "#262626", // Warna border abu gelap
            paddingTop: 32, // Padding atas 32px
            alignItems: "center", // Rata tengah
          }}
        >
          {/* Text copyright */}
          <Text style={{ fontSize: 13, color: "#a3a3a3", textAlign: "center" }}>
            © 2025 Ahmeng Trade. All rights reserved.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
