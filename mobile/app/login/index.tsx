import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function LoginPage() {
  // buat state
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "seller" | null>(null);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
}
