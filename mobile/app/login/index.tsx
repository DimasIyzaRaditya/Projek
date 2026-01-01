// Import komponen dari React Native untuk UI
import { View, Text, ScrollView, Image, TextInput, Pressable } from "react-native";
// Import React dan useState hook
import React, { useState } from "react";
// Import useRouter untuk navigasi
import { useRouter } from "expo-router";
// Import AsyncStorage untuk menyimpan data lokal
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import endpoint API untuk login
import { API_AUTH_LOGIN } from "@/scripts/api";
// Import icon dari expo vector icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  colors,
  authStyles,
  inputStyles,
  buttonStyles,
  alertStyles,
  spacing,
} from "@/app/styles";

// Komponen halaman Login
export default function LoginPage() {
  // Hook untuk navigasi
  const router = useRouter();
  // State untuk menyimpan username input
  const [username, setUsername] = useState("");
  // State untuk menyimpan password input
  const [password, setPassword] = useState("");
  // State untuk loading status
  const [loading, setLoading] = useState(false);
  // State untuk menyimpan pesan error
  const [error, setError] = useState("");
  // State untuk menyimpan role user
  const [userRole, setUserRole] = useState<"admin" | "seller" | null>(null);

  // Fungsi untuk handle proses login
  const handleLogin = async () => {
    // Validasi input tidak boleh kosong
    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }
    setError(""); // Reset error message
    setLoading(true); // Set loading true

    try {
      console.log("🔐 Attempting login with username:", username);

      // Kirim request POST ke API login
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

      // Jika response tidak OK, tampilkan error
      if (!res.ok) {
        setError(data.error || "Username atau password salah");
        setLoading(false);
        return;
      }

      const user = data.data;

      // Simpan data user ke AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username
      }));

      // Tentukan role berdasarkan username
      const role = username.toLowerCase() === "admin" ? "admin" : "seller";
      setUserRole(role);
      console.log("✅ Login berhasil, role:", role);

      // Redirect ke halaman yang sesuai berdasarkan role
      if (role === "admin") {
        console.log("➡️ Navigating to admin dashboard...");
        router.replace("/admin" as never);
      } else {
        console.log("➡️ Navigating to seller dashboard...");
        router.replace("/seller" as never);
      }
    } catch (error) {
      // Handle error jika terjadi kesalahan
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
