import { View, Text, ScrollView, Image, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { API_AUTH_LOGIN } from "@/scripts/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginPage() {
  // buat state
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

      // Login via API
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

      // Determine role from API response atau dari data
      let role: "admin" | "seller" = "seller";

      // Cek apakah API return role data
      if (data.role) {
        role = data.role.toLowerCase() === "admin" ? "admin" : "seller";
      } else if (data.data && data.data.role) {
        role = data.data.role.toLowerCase() === "admin" ? "admin" : "seller";
      } else {
        // Fallback ke username jika API tidak return role
        role = username.toLowerCase() === "admin" ? "admin" : "seller";
      }

      setUserRole(role);
      console.log("✅ Login berhasil, role dari API:", role);

      // Navigate based on role
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
        "Terjadi kesalahan saat login. Pastikan API berjalan di port 3001"
      );
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0a0a0a' }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', minHeight: '100%', paddingHorizontal: 16 }}>
      <View style={{ width: '100%', maxWidth: 320, backgroundColor: 'rgba(19, 19, 19, 0.5)', borderRadius: 8, borderWidth: 1, borderColor: '#262626', padding: 24 }}>
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={{ width: 80, height: 80, marginBottom: 24 }}
          resizeMode="contain"
        />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fafafa' }}>Login</Text>
          <Text style={{ fontSize: 14, color: '#a3a3a3', marginTop: 8, textAlign: 'center' }}>
            Masuk dengan akun Ahmeng Trade Anda
          </Text>
        </View>

        {/* Form */}
        <View>
          {/* Username */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fafafa', marginBottom: 6 }}>Username</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#404040', backgroundColor: '#1f1f1f', borderRadius: 6, paddingHorizontal: 12 }}>
              <MaterialCommunityIcons name="account-outline" size={18} color="#a3a3a3" />
              <TextInput
                placeholder="Masukkan username"
                placeholderTextColor="#6b7280"
                value={username}
                onChangeText={setUsername}
                editable={!loading}
                style={{
                  flex: 1,
                  color: '#fafafa',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  fontSize: 14,
                }}
              />
            </View>
          </View>

          {/* Password */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#fafafa', marginBottom: 6 }}>Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#404040', backgroundColor: '#1f1f1f', borderRadius: 6, paddingHorizontal: 12 }}>
              <MaterialCommunityIcons name="lock-outline" size={18} color="#a3a3a3" />
              <TextInput
                placeholder="Masukkan password"
                placeholderTextColor="#6b7280"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
                style={{
                  flex: 1,
                  color: '#fafafa',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  fontSize: 14,
                }}
              />
            </View>
          </View>

          {/* Error Message */}
          {error && (
            <View style={{ backgroundColor: 'rgba(127, 29, 29, 0.5)', borderWidth: 1, borderColor: '#7c2d2d', borderRadius: 6, padding: 12, marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#f87171" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 12, color: '#f87171', flex: 1 }}>{error}</Text>
            </View>
          )}

          {/* Login Button */}
          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#d4d4d8' : '#fafafa',
              borderRadius: 6,
              paddingVertical: 12,
              alignItems: 'center',
              marginBottom: 12,
              opacity: loading ? 0.5 : 1,
              flexDirection: 'row',
              justifyContent: 'center',
            })}
          >
            {loading && <MaterialCommunityIcons name="loading" size={16} color="#0a0a0a" style={{ marginRight: 8 }} />}
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#0a0a0a' }}>
              {loading ? "Memproses..." : "Login"}
            </Text>
          </Pressable>



          {/* Back Link */}
          <View style={{ alignItems: 'center' }}>
            <Pressable onPress={() => router.back()} disabled={loading}>
              <Text style={{ fontSize: 14, color: '#fafafa', textDecorationLine: 'underline' }}>Kembali ke beranda</Text>
            </Pressable>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}
