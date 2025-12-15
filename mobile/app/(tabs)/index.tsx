import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

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
    </ScrollView>
  );
}
