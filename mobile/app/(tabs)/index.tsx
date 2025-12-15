import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function Landingpage() {
  const router = useRouter();
  return (
    <View
      style={{
        paddingVertical: 60,
        paddingHorizontal: 16,
        backgroundColor: "#0a0a0a",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
    </View>
  );
}
