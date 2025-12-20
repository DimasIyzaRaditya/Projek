import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_TRANSAKSI, API_USER, API_PRODUK } from "@/scripts/api";
import { formatRupiah, formatWIB } from "@/scripts/helpers";
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
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [transaksi, setTransaksi] = React.useState<Transaksi[]>([]);
  const [stats, setStats] = React.useState({
    totalProduk: 0,
    totalTransaksi: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resTransaksi = await fetch(API_TRANSAKSI);
        const jsonTransaksi = await resTransaksi.json();
        console.log("Transaksi data:", jsonTransaksi.data);
        setTransaksi(jsonTransaksi.data || []);

        const [resUser, resProduk] = await Promise.all([
          fetch(API_USER),
          fetch(API_PRODUK),
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
              name="account-multiple"
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
