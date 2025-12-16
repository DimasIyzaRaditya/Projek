import { View, Text, ScrollView, Image, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { API_AUTH_LOGIN } from "@/scripts/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  colors,
  authStyles,
  inputStyles,
  buttonStyles,
  alertStyles,
  spacing,
} from "@/app/styles";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "seller" | null>(null);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }
    setError("");
    setLoading(true);

    try {
      console.log("🔐 Attempting login with username:", username);

      const res = await fetch(`${API_AUTH_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      console.log("📊 Login response status:", res.status);
      const data = await res.json();
      console.log("📋 Login response:", data);

      if (!res.ok) {
        setError(data.error || "Username atau password salah");
        setLoading(false);
        return;
      }

      let role: "admin" | "seller" = "seller";

      if (data.role) {
        role = data.role.toLowerCase() === "admin" ? "admin" : "seller";
      } else if (data.data && data.data.role) {
        role = data.data.role.toLowerCase() === "admin" ? "admin" : "seller";
      } else {
        role = username.toLowerCase() === "admin" ? "admin" : "seller";
      }

      setUserRole(role);
      console.log("✅ Login berhasil, role dari API:", role);

      if (role === "admin") {
        console.log("➡️ Navigating to admin dashboard...");
        router.replace("/admin" as never);
      } else {
        console.log("➡️ Navigating to seller dashboard...");
        router.replace("/seller" as never);
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setError(
        "Terjadi kesalahan saat login. Pastikan API berjalan di port 3000"
      );
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background.primary }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        paddingHorizontal: spacing.lg,
      }}
    >
      <View style={authStyles.container}>
        {/* Header */}
        <View style={authStyles.headerContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 80, height: 80, marginBottom: spacing["2xl"] }}
            resizeMode="contain"
          />
          <Text style={authStyles.title}>Login</Text>
          <Text style={authStyles.subtitle}>
            Masuk dengan akun Ahmeng Trade Anda
          </Text>
        </View>

        {/* Form */}
        <View>
          {/* Username */}
          <View style={inputStyles.container}>
            <Text style={inputStyles.label}>Username</Text>
            <View style={inputStyles.wrapper}>
              <MaterialCommunityIcons
                name="account-outline"
                size={18}
                color={colors.text.secondary}
              />
              <TextInput
                placeholder="Masukkan username"
                placeholderTextColor={colors.text.muted}
                value={username}
                onChangeText={setUsername}
                editable={!loading}
                style={inputStyles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={inputStyles.container}>
            <Text style={inputStyles.label}>Password</Text>
            <View style={inputStyles.wrapper}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={18}
                color={colors.text.secondary}
              />
              <TextInput
                placeholder="Masukkan password"
                placeholderTextColor={colors.text.muted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
                style={inputStyles.input}
              />
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <View style={alertStyles.container}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={18}
                color={colors.status.error}
                style={{ marginRight: spacing.md }}
              />
              <Text style={alertStyles.text}>{error}</Text>
            </View>
          )}

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => [
              buttonStyles.primary,
              { marginBottom: spacing.base },
              pressed && { backgroundColor: colors.text.secondary },
              loading && buttonStyles.disabled,
            ]}
          >
            {loading && (
              <MaterialCommunityIcons
                name="loading"
                size={16}
                color={colors.background.primary}
                style={{ marginRight: spacing.md }}
              />
            )}
            <Text style={buttonStyles.primaryText}>
              {loading ? "Memproses..." : "Login"}
            </Text>
          </Pressable>

          {/* Back Link */}
          <View style={{ alignItems: "center" }}>
            <Pressable onPress={() => router.back()} disabled={loading}>
              <Text style={authStyles.link}>Kembali ke beranda</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
