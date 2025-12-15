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
      <Text>Index</Text>
    </View>
  );
}
