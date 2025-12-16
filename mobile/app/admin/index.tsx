import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type User = {
  id?: number;
  name?: string;
  username?: string;
};

type Produk = {
  id?: number;
  nama?: string;
  harga?: number;
};

type Transaksi = {
  id?: number;
  user?: User;
  produk?: Produk;
  namaPembeli?: string;
  emailPembeli?: string;
  totalHarga?: number;
  createdAt?: string;
};

export default function AdminPage() {
  // buat state
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [transaksi, setTransaksi] = React.useState<Transaksi[]>([]);
  const [stats, setStats] = React.useState({
    totalUser: 0,
    totalProduk: 0,
    totalTransaksi: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch transaksi
        const resTransaksi = await fetch("http://localhost:3000/api/transaksi");
        const jsonTransaksi = await resTransaksi.json();
        console.log("Transaksi data:", jsonTransaksi.data);
        setTransaksi(jsonTransaksi.data || []);

        // Fetch stats
        const [resUser, resProduk] = await Promise.all([
          fetch("http://localhost:3000/api/user"),
          fetch("http://localhost:3000/api/produk"),
        ]);
        
        const jsonUser = await resUser.json();
        const jsonProduk = await resProduk.json();

        setStats({
          totalUser: jsonUser.data?.length || 0,
          totalProduk: jsonProduk.data?.length || 0,
          totalTransaksi: jsonTransaksi.data?.length || 0,
        });
      } catch (e) {
        console.error("Error fetching data:", e);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  function formatWIB(dateStr: string | undefined) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return d.toLocaleString("id-ID", options).replace(",", "");
  }

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
              Dashboard Admin
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
            Selamat datang, Admin
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingVertical: 20, paddingHorizontal: 16 }}>
          {/* Total User */}
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
                Total User
              </Text>
              <MaterialCommunityIcons
                name="account-multiple"
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
              {stats.totalUser}
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Kelola semua user
            </Text>
          </View>

          {/* Total Produk */}
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
              {stats.totalProduk}
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Kelola semua produk
            </Text>
          </View>

          {/* Total Transaksi */}
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
                Total Transaksi
              </Text>
              <MaterialCommunityIcons
                name="shopping"
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
              {stats.totalTransaksi}
            </Text>
            <Text style={{ fontSize: 12, color: "#a3a3a3" }}>
              Kelola semua transaksi
            </Text>
          </View>
        </View>

        {/* Tabel Transaksi Lengkap */}
        <View style={{ padding: 16 }}>
          <Text style={{ color: "#fafafa", fontSize: 18, fontWeight: "bold", marginBottom: 16 }}>
            Semua Transaksi
          </Text>

          {/* Table */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ minWidth: 800 }}>
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
                    width: 150,
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#fafafa",
                    textTransform: "uppercase",
                  }}
                >
                  Produk
                </Text>
                <Text
                  style={{
                    width: 140,
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#fafafa",
                    textTransform: "uppercase",
                  }}
                >
                  Nama Pembeli
                </Text>
                <Text
                  style={{
                    width: 160,
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#fafafa",
                    textTransform: "uppercase",
                  }}
                >
                  Email Pembeli
                </Text>
                <Text
                  style={{
                    width: 120,
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#fafafa",
                    textTransform: "uppercase",
                    textAlign: "right",
                  }}
                >
                  Total Harga
                </Text>
                <Text
                  style={{
                    width: 140,
                    fontSize: 12,
                    fontWeight: "700",
                    color: "#fafafa",
                    textTransform: "uppercase",
                    textAlign: "right",
                  }}
                >
                  Tanggal (WIB)
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
                    Memuat transaksi...
                  </Text>
                </View>
              ) : transaksi.length === 0 ? (
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
                    name="cart-off"
                    size={32}
                    color="#a3a3a3"
                    style={{ marginBottom: 12 }}
                  />
                  <Text style={{ color: "#a3a3a3", fontSize: 14 }}>
                    Belum ada transaksi
                  </Text>
                </View>
              ) : (
                transaksi.map((trx, index) => (
                  <View
                    key={trx.id || index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#0f0f0f" : "#1a1a1a",
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      borderBottomWidth: index === transaksi.length - 1 ? 0 : 1,
                      borderBottomColor: "#262626",
                      borderLeftWidth: 1,
                      borderLeftColor: "#262626",
                      borderRightWidth: 1,
                      borderRightColor: "#262626",
                      borderBottomLeftRadius: index === transaksi.length - 1 ? 8 : 0,
                      borderBottomRightRadius: index === transaksi.length - 1 ? 8 : 0,
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
                      {trx.id || "-"}
                    </Text>
                    <Text
                      style={{
                        width: 150,
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#fafafa",
                      }}
                    >
                      {trx.produk?.nama || "-"}
                    </Text>
                    <Text
                      style={{
                        width: 140,
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#fafafa",
                      }}
                    >
                      {trx.namaPembeli}
                    </Text>
                    <Text
                      style={{
                        width: 160,
                        fontSize: 13,
                        color: "#fafafa",
                      }}
                      numberOfLines={1}
                    >
                      {trx.emailPembeli}
                    </Text>
                    <Text
                      style={{
                        width: 120,
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#fafafa",
                        textAlign: "right",
                      }}
                    >
                      Rp {trx.totalHarga?.toLocaleString("id-ID") || "0"}
                    </Text>
                    <Text
                      style={{
                        width: 140,
                        fontSize: 13,
                        color: "#fafafa",
                        textAlign: "right",
                      }}
                    >
                      {formatWIB(trx.createdAt)}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
