import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { API_AUTH_LOGIN } from "@/scripts/api";

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
      
    </ScrollView>
  );
}
