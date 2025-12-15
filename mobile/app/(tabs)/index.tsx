import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Landingpage() {
  const router = useRouter();
  return (
    <ScrollView>
      <View
        style={{
          paddingVertical: 60,
          paddingHorizontal: 16,
          backgroundColor: "#0a0a0a",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 180, height: 180, marginBottom: 24 }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 32,
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
            marginBottom: 32,
            lineHeight: 24,
          }}
        >
          Koleksi pribadi template, ebook, source code, dan aset digital untuk
          kebutuhan Anda
        </Text>

        {/* CTA Buttons */}
        <View style={{ gap: 12, width: "100%", maxWidth: 320 }}>
          <Pressable
            onPress={() => router.push("/public" as never)}
            style={{
              backgroundColor: "#fafafa",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#0a0a0a" }}>
              Mulai Belanja
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/login" as never)}
            style={{
              borderWidth: 1,
              borderColor: "#fafafa",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fafafa" }}>
              Login Admin/Seller
            </Text>
          </Pressable>
        </View>
      </View>
      {/* Features Section */}
      <View
        style={{
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: "#111111",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#fafafa",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Mengapa Memilih Kami?
        </Text>

        <View style={{ gap: 16 }}></View>

        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={24}
            color="#10b981"
            style={{ marginRight: 16, marginTop: 4 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#fafafa",
                marginBottom: 4,
              }}
            >
              Download Instan
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 18 }}>
              Dapatkan akses instan setelah pembayaran berhasil
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <MaterialCommunityIcons
            name="heart"
            size={24}
            color="#10b981"
            style={{ marginRight: 16, marginTop: 4 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#fafafa",
                marginBottom: 4,
              }}
            >
              Seumur Hidup
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 18 }}>
              Akses selamanya dengan update gratis selamanya
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <MaterialCommunityIcons
            name="headset"
            size={24}
            color="#10b981"
            style={{ marginRight: 16, marginTop: 4 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#fafafa",
                marginBottom: 4,
              }}
            >
              Support 24/7
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3", lineHeight: 18 }}>
              Tim support siap membantu Anda kapan saja
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View
        style={{
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: "#0a0a0a",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#fafafa",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Statistik Kami
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <View style={{ alignItems: "center", flex: 1, minWidth: "45%" }}>
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#fafafa" }}
            >
              10K+
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#a3a3a3",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Total Download
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1, minWidth: "45%" }}>
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#fafafa" }}
            >
              500+
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#a3a3a3",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Produk Digital
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1, minWidth: "45%" }}>
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#fafafa" }}
            >
              4.8/5
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#a3a3a3",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Rating Pelanggan
            </Text>
          </View>

          <View style={{ alignItems: "center", flex: 1, minWidth: "45%" }}>
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#fafafa" }}
            >
              100+
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#a3a3a3",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Seller Aktif
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#262626",
          backgroundColor: "#0a0a0a",
          paddingVertical: 48,
          paddingHorizontal: 16,
        }}
      >
        {/* Footer Bottom */}
        <View
          style={{
            marginTop: 32,
            borderTopWidth: 1,
            borderTopColor: "#262626",
            paddingTop: 32,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 13, color: "#a3a3a3", textAlign: "center" }}>
            © 2025 Ahmeng Trade. All rights reserved.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
