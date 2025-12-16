import { View, Text, Alert, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Produk = {
  id?: number;
  nama?: string;
  harga?: number;
};

export default function SellerPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [produkList, setProdukList] = React.useState<Produk[]>([]);

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/produk");
      const json = await res.json();
      setProdukList(json.data || []);
    } catch (e) {
      setProdukList([]);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Konfirmasi Hapus",
      "Apakah Anda yakin ingin menghapus produk ini?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(`http://localhost:3000/api/produk/${id}`, {
                method: "DELETE",
              });
              if (res.ok) {
                Alert.alert("Sukses", "Produk berhasil dihapus");
                fetchProduk();
              } else {
                Alert.alert("Error", "Gagal menghapus produk");
              }
            } catch (e) {
              Alert.alert("Error", "Terjadi kesalahan");
            }
          },
        },
      ]
    );
  };

  return (
      <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
        {/* Header */}
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#262626",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#fafafa" }}
            >
              Dashboard Seller
            </Text>
            <Pressable
              onPress={handleLogout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#404040",
                backgroundColor: "#1f1f1f",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <MaterialCommunityIcons
                name="logout"
                size={16}
                color="#fafafa"
                style={{ marginRight: 6 }}
              />
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#fafafa" }}
              >
                Logout
              </Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
            Selamat datang, Seller
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingVertical: 20, paddingHorizontal: 16 }}>
          {/* Produk Saya */}
          <View
            style={{
              backgroundColor: "rgba(23, 23, 23, 0.5)",
              borderWidth: 1,
              borderColor: "#262626",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#fafafa" }}
              >
                Total Produk
              </Text>
              <MaterialCommunityIcons
                name="package-variant"
                size={16}
                color="#a3a3a3"
              />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#fafafa",
                marginBottom: 4,
              }}
            >
              {produkList.length}
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Produk yang tersedia
            </Text>
          </View>
        </View>

        {/* Tabel Produk */}
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ color: "#fafafa", fontSize: 18, fontWeight: "bold" }}>
              Kelola Produk
            </Text>
            <Pressable
              onPress={() => Alert.alert("Info", "Fitur tambah produk segera hadir")}
              style={{
                backgroundColor: "#fafafa",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="plus" size={16} color="#0a0a0a" style={{ marginRight: 4 }} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#0a0a0a" }}>
                Tambah
              </Text>
            </Pressable>
          </View>

          {/* Table Header */}
          <View
            style={{
              backgroundColor: "#1a1a1a",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#404040",
              paddingVertical: 12,
              paddingHorizontal: 12,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#262626",
            }}
          >
            <Text
              style={{
                width: 50,
                fontSize: 12,
                fontWeight: "700",
                color: "#fafafa",
                textTransform: "uppercase",
              }}
            >
              ID
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: "700",
                color: "#fafafa",
                textTransform: "uppercase",
              }}
            >
              Nama Produk
            </Text>
            <Text
              style={{
                width: 100,
                fontSize: 12,
                fontWeight: "700",
                color: "#fafafa",
                textTransform: "uppercase",
                textAlign: "right",
              }}
            >
              Harga
            </Text>
            <Text
              style={{
                width: 100,
                fontSize: 12,
                fontWeight: "700",
                color: "#fafafa",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Aksi
            </Text>
          </View>

          {/* Table Body */}
          {loading ? (
            <View
              style={{
                backgroundColor: "#1a1a1a",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderLeftWidth: 1,
                borderLeftColor: "#262626",
                borderRightWidth: 1,
                borderRightColor: "#262626",
                borderBottomWidth: 1,
                borderBottomColor: "#262626",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 40,
              }}
            >
              <MaterialCommunityIcons
                name="loading"
                size={32}
                color="#a3a3a3"
                style={{ marginBottom: 12 }}
              />
              <Text style={{ color: "#a3a3a3", fontSize: 14 }}>
                Memuat produk...
              </Text>
            </View>
          ) : produkList.length === 0 ? (
            <View
              style={{
                backgroundColor: "#1a1a1a",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderWidth: 1,
                borderColor: "#262626",
                paddingVertical: 32,
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={32}
                color="#a3a3a3"
                style={{ marginBottom: 12 }}
              />
              <Text style={{ color: "#a3a3a3", fontSize: 14 }}>
                Belum ada produk
              </Text>
            </View>
          ) : (
            produkList.map((produk, index) => (
              <View
                key={produk.id || index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#0f0f0f" : "#1a1a1a",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderBottomWidth: index === produkList.length - 1 ? 0 : 1,
                  borderBottomColor: "#262626",
                  borderLeftWidth: 1,
                  borderLeftColor: "#262626",
                  borderRightWidth: 1,
                  borderRightColor: "#262626",
                  borderBottomLeftRadius: index === produkList.length - 1 ? 8 : 0,
                  borderBottomRightRadius: index === produkList.length - 1 ? 8 : 0,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: 50,
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#fafafa",
                  }}
                >
                  {produk.id}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#fafafa",
                  }}
                >
                  {produk.nama || "-"}
                </Text>
                <Text
                  style={{
                    width: 100,
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#fafafa",
                    textAlign: "right",
                  }}
                >
                  Rp {produk.harga?.toLocaleString("id-ID") || "0"}
                </Text>
                <View
                  style={{
                    width: 100,
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <Pressable
                    onPress={() => Alert.alert("Info", "Fitur edit segera hadir")}
                    style={{
                      backgroundColor: "#404040",
                      padding: 6,
                      borderRadius: 4,
                    }}
                  >
                    <MaterialCommunityIcons name="pencil" size={16} color="#fafafa" />
                  </Pressable>
                  <Pressable
                    onPress={() => produk.id && handleDelete(produk.id)}
                    style={{
                      backgroundColor: "#7f1d1d",
                      padding: 6,
                      borderRadius: 4,
                    }}
                  >
                    <MaterialCommunityIcons name="delete" size={16} color="#fafafa" />
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  }

