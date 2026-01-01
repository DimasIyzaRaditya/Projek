// Import komponen dari React Native untuk UI
import { View, Text, ScrollView, Pressable } from "react-native";
// Import React dan useEffect hook
import React, { useEffect } from "react";
// Import useRouter untuk navigasi
import { useRouter } from "expo-router";
// Import AsyncStorage untuk menyimpan data lokal
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import icon dari expo vector icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Import endpoint API
import { API_TRANSAKSI, API_USER, API_PRODUK } from "@/scripts/api";
// Import helper functions untuk format
import { formatRupiah, formatWIB } from "@/scripts/helpers";
// Import styles yang sudah didefinisikan
import {
  colors,
  commonStyles,
  headerStyles,
  cardStyles,
  tableStyles,
  buttonStyles,
  sectionStyles,
  spacing,
  typography,
} from "@/app/styles";

// Tipe data untuk User
type User = {
  id?: number;
  name?: string;
  username?: string;
};

// Tipe data untuk Produk
type Produk = {
  id?: number;
  nama?: string;
  harga?: number;
};

// Tipe data untuk Transaksi
type Transaksi = {
  id?: number;
  user?: User;
  produk?: Produk;
  namaPembeli?: string;
  emailPembeli?: string;
  totalHarga?: number;
  createdAt?: string;
};

// Komponen halaman Admin Dashboard
export default function AdminPage() {
  // Hook untuk navigasi
  const router = useRouter();
  // State untuk loading status
  const [loading, setLoading] = React.useState(true);
  // State untuk menyimpan daftar transaksi
  const [transaksi, setTransaksi] = React.useState<Transaksi[]>([]);
  // State untuk menyimpan statistik dashboard
  const [stats, setStats] = React.useState({
    totalUser: 0, // Total jumlah user
    totalProduk: 0, // Total jumlah produk
    totalTransaksi: 0, // Total jumlah transaksi
    totalRevenue: 0, // Total pendapatan
  });

  // useEffect untuk fetch data saat komponen dimount
  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      setLoading(true); // Set loading true
      try {
        // Fetch data transaksi dari API
        const resTransaksi = await fetch(API_TRANSAKSI);
        const jsonTransaksi = await resTransaksi.json();
        console.log("Transaksi data:", jsonTransaksi.data);
        // Simpan data transaksi ke state
        setTransaksi(jsonTransaksi.data || []);

        // Fetch data user dan produk secara paralel
        const [resUser, resProduk] = await Promise.all([
          fetch(API_USER),
          fetch(API_PRODUK),
        ]);

        const jsonUser = await resUser.json();
        const jsonProduk = await resProduk.json();

        // Hitung total revenue dari semua transaksi
        const totalRevenue = (jsonTransaksi.data || []).reduce(
          (sum: number, t: Transaksi) => sum + (t.totalHarga || 0),
          0
        );

        // Update state statistik
        setStats({
          totalUser: jsonUser.data?.length || 0,
          totalProduk: jsonProduk.data?.length || 0,
          totalTransaksi: jsonTransaksi.data?.length || 0,
          totalRevenue: totalRevenue,
        });
      } catch (e) {
        console.error("Error fetching data:", e);
      }
      setLoading(false); // Set loading false setelah selesai
    };

    fetchData(); // Panggil fungsi fetch
  }, []);

  // Fungsi untuk logout
  const handleLogout = async () => {
    try {
      // Hapus data user dari AsyncStorage
      await AsyncStorage.removeItem("user");
      // Redirect ke halaman utama
      router.replace("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // Fungsi untuk format tanggal ke format WIB
  function formatWIB(dateStr: string | undefined) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Jakarta", // Timezone WIB
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return d.toLocaleString("id-ID", options).replace(",", "");
  }

  return (
    <ScrollView style={commonStyles.container}>
      {/* Header */}
      <View style={headerStyles.container}>
        <View style={commonStyles.flexRowBetween}>
          <Text style={headerStyles.title}>Dashboard Admin</Text>
          <Pressable onPress={handleLogout} style={buttonStyles.secondary}>
            <MaterialCommunityIcons
              name="logout"
              size={16}
              color={colors.text.primary}
              style={{ marginRight: spacing.sm }}
            />
            <Text style={buttonStyles.secondaryText}>Logout</Text>
          </Pressable>
        </View>
        <Text style={headerStyles.subtitle}>Selamat datang, Admin</Text>
      </View>

      {/* Stats Cards */}
      <View style={sectionStyles.container}>
        {/* Total User */}
        <View style={cardStyles.container}>
          <View style={cardStyles.header}>
            <Text style={cardStyles.title}>Total User</Text>
            <MaterialCommunityIcons
              name="account-group"
              size={16}
              color={colors.text.secondary}
            />
          </View>
          <Text style={cardStyles.value}>{stats.totalUser}</Text>
          <Text style={cardStyles.description}>Kelola semua user</Text>
        </View>

        {/* Total Produk */}
        <View style={cardStyles.container}>
          <View style={cardStyles.header}>
            <Text style={cardStyles.title}>Total Produk</Text>
            <MaterialCommunityIcons
              name="package-variant"
              size={16}
              color={colors.text.secondary}
            />
          </View>
          <Text style={cardStyles.value}>{stats.totalProduk}</Text>
          <Text style={cardStyles.description}>Kelola semua produk</Text>
        </View>

        {/* Total Transaksi */}
        <View style={cardStyles.container}>
          <View style={cardStyles.header}>
            <Text style={cardStyles.title}>Total Transaksi</Text>
            <MaterialCommunityIcons
              name="shopping"
              size={16}
              color={colors.text.secondary}
            />
          </View>
          <Text style={cardStyles.value}>{stats.totalTransaksi}</Text>
          <Text style={cardStyles.description}>Kelola semua transaksi</Text>
        </View>

        {/* Total Revenue */}
        <View style={cardStyles.container}>
          <View style={cardStyles.header}>
            <Text style={cardStyles.title}>Total Revenue</Text>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={16}
              color={colors.text.secondary}
            />
          </View>
          <Text style={[cardStyles.value, { fontSize: 20 }]}>{formatRupiah(stats.totalRevenue)}</Text>
          <Text style={cardStyles.description}>Total pendapatan</Text>
        </View>
      </View>

      {/* Tabel Transaksi */}
      <View style={{ padding: spacing.lg }}>
        <Text style={sectionStyles.headerTitle}>Semua Transaksi</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.lg }}>
          <View style={{ minWidth: 800 }}>
            {/* Table Header */}
            <View style={tableStyles.header}>
              <Text style={[tableStyles.headerText, { width: 50 }]}>ID</Text>
              <Text style={[tableStyles.headerText, { width: 150 }]}>Produk</Text>
              <Text style={[tableStyles.headerText, { width: 140 }]}>Nama Pembeli</Text>
              <Text style={[tableStyles.headerText, { width: 160 }]}>Email Pembeli</Text>
              <Text style={[tableStyles.headerText, { width: 120, textAlign: "right" }]}>
                Total Harga
              </Text>
              <Text style={[tableStyles.headerText, { width: 140, textAlign: "right" }]}>
                Tanggal (WIB)
              </Text>
            </View>

            {/* Table Body */}
            {loading ? (
              <View style={tableStyles.loadingState}>
                <MaterialCommunityIcons
                  name="loading"
                  size={32}
                  color={colors.text.secondary}
                  style={{ marginBottom: spacing.base }}
                />
                <Text style={commonStyles.textSecondary}>Memuat transaksi...</Text>
              </View>
            ) : transaksi.length === 0 ? (
              <View style={tableStyles.emptyState}>
                <MaterialCommunityIcons
                  name="cart-off"
                  size={32}
                  color={colors.text.secondary}
                  style={{ marginBottom: spacing.base }}
                />
                <Text style={commonStyles.textSecondary}>Belum ada transaksi</Text>
              </View>
            ) : (
              transaksi.map((trx, index) => (
                <View
                  key={trx.id || index}
                  style={[
                    tableStyles.row,
                    index % 2 === 0 ? tableStyles.rowEven : tableStyles.rowOdd,
                    {
                      borderBottomWidth: index === transaksi.length - 1 ? 0 : 1,
                      borderBottomColor: colors.border.primary,
                      borderBottomLeftRadius: index === transaksi.length - 1 ? 8 : 0,
                      borderBottomRightRadius: index === transaksi.length - 1 ? 8 : 0,
                    },
                  ]}
                >
                  <Text style={[tableStyles.cellText, { width: 50 }]}>
                    {trx.id || "-"}
                  </Text>
                  <Text style={[tableStyles.cellText, { width: 150 }]}>
                    {trx.produk?.nama || "-"}
                  </Text>
                  <Text style={[tableStyles.cellText, { width: 140 }]}>
                    {trx.namaPembeli}
                  </Text>
                  <Text
                    style={[
                      tableStyles.cellText,
                      { width: 160, fontSize: typography.fontSize.sm },
                    ]}
                    numberOfLines={1}
                  >
                    {trx.emailPembeli}
                  </Text>
                  <Text
                    style={[tableStyles.cellText, { width: 120, textAlign: "right" }]}
                  >
                    {formatRupiah(trx.totalHarga)}
                  </Text>
                  <Text
                    style={[
                      tableStyles.cellText,
                      { width: 140, textAlign: "right", fontSize: typography.fontSize.sm },
                    ]}
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
