import {
  View,
  Text,
  Alert,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_PRODUK, API_PRODUK_BY_ID } from "@/scripts/api";
import {
  colors,
  commonStyles,
  headerStyles,
  cardStyles,
  tableStyles,
  buttonStyles,
  modalStyles,
  sectionStyles,
  spacing,
  typography,
  borderRadius,
} from "@/app/styles";

type Produk = {
  id?: number;
  nama?: string;
  harga?: number;
};

export default function SellerPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [produkList, setProdukList] = React.useState<Produk[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<number | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_PRODUK);
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

  const handleDelete = (id: number) => {
    console.log("handleDelete called with id:", id);
    setProductToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (productToDelete === null) return;

    console.log("Attempting to delete product with id:", productToDelete);
    setDeleting(true);

    try {
      const res = await fetch(API_PRODUK_BY_ID(productToDelete), {
        method: "DELETE",
      });
      console.log("Delete response status:", res.status);

      if (res.ok) {
        console.log("Delete successful!");
        setDeleteModalVisible(false);
        setProductToDelete(null);
        Alert.alert("Sukses", "Produk berhasil dihapus");
        fetchProduk();
      } else {
        const errorData = await res.json();
        console.log("Delete error:", errorData);
        Alert.alert("Error", errorData.error || "Gagal menghapus produk");
      }
    } catch (e) {
      console.log("Delete exception:", e);
      Alert.alert("Error", "Terjadi kesalahan: " + String(e));
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setProductToDelete(null);
  };

  return (
    <ScrollView style={commonStyles.container}>
      {/* Header */}
      <View style={headerStyles.container}>
        <View style={[commonStyles.flexRowBetween, { marginBottom: spacing.md }]}>
          <Text style={headerStyles.title}>Dashboard Seller</Text>
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
        <Text style={headerStyles.subtitle}>Selamat datang, Seller</Text>
      </View>

      {/* Stats Cards */}
      <View style={sectionStyles.container}>
        <View style={cardStyles.container}>
          <View style={cardStyles.header}>
            <Text style={cardStyles.title}>Total Produk</Text>
            <MaterialCommunityIcons
              name="package-variant"
              size={16}
              color={colors.text.secondary}
            />
          </View>
          <Text style={cardStyles.value}>{produkList.length}</Text>
          <Text style={cardStyles.description}>Produk yang tersedia</Text>
        </View>
      </View>

      {/* Tabel Produk */}
      <View style={{ padding: spacing.lg }}>
        <View style={sectionStyles.header}>
          <Text style={sectionStyles.headerTitle}>Kelola Produk</Text>
          <Pressable
            onPress={() => Alert.alert("Info", "Fitur tambah produk segera hadir")}
            style={[buttonStyles.primary, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}
          >
            <MaterialCommunityIcons
              name="plus"
              size={16}
              color={colors.background.primary}
              style={{ marginRight: spacing.xs }}
            />
            <Text style={buttonStyles.primaryText}>Tambah</Text>
          </Pressable>
        </View>

        {/* Table Header */}
        <View style={tableStyles.header}>
          <Text style={[tableStyles.headerText, { width: 50 }]}>ID</Text>
          <Text style={[tableStyles.headerText, { flex: 1 }]}>Nama Produk</Text>
          <Text style={[tableStyles.headerText, { width: 100, textAlign: "right" }]}>
            Harga
          </Text>
          <Text style={[tableStyles.headerText, { width: 100, textAlign: "center" }]}>
            Aksi
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
            <Text style={commonStyles.textSecondary}>Memuat produk...</Text>
          </View>
        ) : produkList.length === 0 ? (
          <View style={tableStyles.emptyState}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={32}
              color={colors.text.secondary}
              style={{ marginBottom: spacing.base }}
            />
            <Text style={commonStyles.textSecondary}>Belum ada produk</Text>
          </View>
        ) : (
          produkList.map((produk, index) => (
            <View
              key={produk.id || index}
              style={[
                tableStyles.row,
                index % 2 === 0 ? tableStyles.rowEven : tableStyles.rowOdd,
                {
                  borderBottomWidth: index === produkList.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border.primary,
                  borderBottomLeftRadius: index === produkList.length - 1 ? borderRadius.md : 0,
                  borderBottomRightRadius: index === produkList.length - 1 ? borderRadius.md : 0,
                },
              ]}
            >
              <Text style={[tableStyles.cellText, { width: 50 }]}>{produk.id}</Text>
              <Text style={[tableStyles.cellText, { flex: 1 }]}>
                {produk.nama || "-"}
              </Text>
              <Text style={[tableStyles.cellText, { width: 100, textAlign: "right" }]}>
                Rp {produk.harga?.toLocaleString("id-ID") || "0"}
              </Text>
              <View
                style={{
                  width: 100,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    if (produk.id !== undefined) {
                      router.push(`/seller/edit/${produk.id}` as any);
                    }
                  }}
                  style={buttonStyles.iconButton}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={16}
                    color={colors.text.primary}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    console.log("Delete button pressed, produk.id:", produk.id);
                    if (produk.id !== undefined) {
                      handleDelete(produk.id);
                    } else {
                      console.log("produk.id is undefined!");
                    }
                  }}
                  style={[buttonStyles.iconButtonDanger, { marginLeft: spacing.md }]}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={16}
                    color={colors.text.primary}
                  />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.container}>
            <View style={modalStyles.header}>
              <View style={modalStyles.iconContainer}>
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={24}
                  color={colors.text.primary}
                />
              </View>
              <Text style={modalStyles.title}>Konfirmasi Hapus</Text>
            </View>

            <Text style={modalStyles.message}>
              Apakah Anda yakin ingin menghapus produk #{productToDelete}? Tindakan
              ini tidak dapat dibatalkan.
            </Text>

            <View style={modalStyles.buttonContainer}>
              <Pressable
                onPress={cancelDelete}
                disabled={deleting}
                style={[
                  buttonStyles.secondary,
                  { flex: 1, justifyContent: "center" },
                ]}
              >
                <Text style={buttonStyles.secondaryText}>Batal</Text>
              </Pressable>

              <Pressable
                onPress={confirmDelete}
                disabled={deleting}
                style={[
                  buttonStyles.danger,
                  { flex: 1, marginLeft: spacing.base },
                  deleting && buttonStyles.disabled,
                ]}
              >
                {deleting ? (
                  <>
                    <ActivityIndicator size="small" color={colors.text.primary} />
                    <Text
                      style={[buttonStyles.dangerText, { marginLeft: spacing.md }]}
                    >
                      Menghapus...
                    </Text>
                  </>
                ) : (
                  <Text style={buttonStyles.dangerText}>Hapus</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
