// Import komponen dari React Native untuk UI dan interaksi
import { View, Text, Alert, Pressable, ScrollView, TextInput, Modal, ActivityIndicator } from "react-native";
// Import React dan hooks
import React, { useEffect, useState } from "react";
// Import hooks dari expo-router untuk routing dan parameter
import { useLocalSearchParams, useRouter } from "expo-router";
// Import icon dari expo vector icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Import endpoint API untuk produk
import { API_PRODUK_BY_ID } from "@/scripts/api";
// Import helper functions untuk format dan transaksi
import { formatRupiah, createTransaksi } from "@/scripts/helpers";

// Interface untuk tipe data Produk
interface Produk {
  id: number; // ID produk
  nama: string; // Nama produk
  harga: number; // Harga produk
  deskripsi?: string; // Deskripsi produk (optional)
  rating?: number; // Rating produk (optional)
  downloads?: number; // Jumlah download (optional)
}

// Fungsi untuk mendapatkan icon berdasarkan judul produk
const getIconByTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase(); // Konversi ke lowercase untuk matching

  // Cek apakah produk adalah ebook
  if (
    lowerTitle.includes("ebook") ||
    lowerTitle.includes("e-book") ||
    lowerTitle.includes("buku")
  ) {
    return "book-open";
  }
  // Cek apakah produk adalah source code
  if (
    lowerTitle.includes("source code") ||
    lowerTitle.includes("script") ||
    lowerTitle.includes("code")
  ) {
    return "code-braces";
  }
  // Cek apakah produk adalah design/icon
  if (
    lowerTitle.includes("icon") ||
    lowerTitle.includes("design") ||
    lowerTitle.includes("ilustrasi") ||
    lowerTitle.includes("font")
  ) {
    return "palette";
  }
  // Cek apakah produk adalah template UI
  if (
    lowerTitle.includes("template") ||
    lowerTitle.includes("ui") ||
    lowerTitle.includes("ux") ||
    lowerTitle.includes("dashboard")
  ) {
    return "layout-grid";
  }

  // Default icon jika tidak match
  return "download";
};

// Fungsi untuk generate deskripsi otomatis berdasarkan nama produk
const generateDescription = (nama: string) => {
  const lowerNama = nama.toLowerCase();

  // Generate deskripsi untuk ebook
  if (
    lowerNama.includes("ebook") ||
    lowerNama.includes("e-book") ||
    lowerNama.includes("buku")
  ) {
    return `${nama}\n\nE-Book digital berkualitas tinggi dengan konten lengkap dan mendalam.\n\nYang Anda dapatkan:\n• Format PDF berkualitas tinggi\n• Konten lengkap dan terstruktur\n• Mudah dibaca di berbagai perangkat\n• Lifetime access\n• Free updates`;
  }

  // Generate deskripsi untuk source code
  if (
    lowerNama.includes("source code") ||
    lowerNama.includes("script") ||
    lowerNama.includes("code")
  ) {
    return `${nama}\n\nSource code lengkap dan siap pakai.\n\nYang Anda dapatkan:\n• Source code lengkap\n• Dokumentasi penggunaan\n• Clean code & best practices\n• Easy to customize\n• Lifetime access\n• Free updates`;
  }

  // Generate deskripsi untuk template
  if (
    lowerNama.includes("template") ||
    lowerNama.includes("ui") ||
    lowerNama.includes("dashboard")
  ) {
    return `${nama}\n\nTemplate UI/UX modern dan responsive.\n\nYang Anda dapatkan:\n• Design modern & clean\n• Fully responsive\n• Komponen siap pakai\n• Easy to customize\n• Lifetime access\n• Free updates`;
  }

  // Generate deskripsi untuk icon/design
  if (
    lowerNama.includes("icon") ||
    lowerNama.includes("design") ||
    lowerNama.includes("ilustrasi") ||
    lowerNama.includes("font")
  ) {
    return `${nama}\n\nKoleksi aset design berkualitas tinggi.\n\nYang Anda dapatkan:\n• File berkualitas tinggi\n• Multiple format\n• Easy to use\n• Scalable vector\n• Lifetime access\n• Free updates`;
  }

  // Deskripsi default
  return `${nama}\n\nProduk digital berkualitas tinggi yang siap digunakan.\n\nYang Anda dapatkan:\n• Kualitas terbaik\n• Instant download\n• Lifetime access\n• Free updates`;
};

// Komponen halaman detail produk
export default function ProductDetailPage() {
  // Hook untuk navigasi
  const router = useRouter();
  // Ambil parameter ID dari URL
  const { id } = useLocalSearchParams();
  // State untuk menyimpan data produk
  const [product, setProduct] = useState<Produk | null>(null);
  // State untuk loading status
  const [loading, setLoading] = useState(true);
  // State untuk modal pembelian
  const [buyModalVisible, setBuyModalVisible] = useState(false);
  // State untuk loading saat proses pembelian
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  // State untuk modal sukses pembelian
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  // State untuk form data pembelian
  const [formData, setFormData] = useState({
    namaPembeli: "", // Nama pembeli
    emailPembeli: "", // Email pembeli
  });

  // useEffect untuk fetch data produk saat komponen dimount
  useEffect(() => {
    // Fungsi async untuk mengambil data produk dari API
    const fetchProduct = async () => {
      try {
        // Fetch data produk berdasarkan ID
        const res = await fetch(API_PRODUK_BY_ID(Number(id)));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const produk = data.data;
        // Set product dengan data dari API + generate deskripsi & rating random
        setProduct({
          ...produk,
          deskripsi: generateDescription(produk.nama), // Generate deskripsi otomatis
          rating: 4.5 + Math.random() * 0.4, // Rating random 4.5-4.9
          downloads: Math.floor(100 + Math.random() * 900), // Download random 100-1000
        });
      } catch (error) {
        console.error("Error fetching produk:", error);
        Alert.alert("Error", "Gagal memuat produk");
        router.back(); // Kembali jika gagal load
      } finally {
        setLoading(false); // Set loading false setelah selesai
      }
    };

    // Panggil fetch hanya jika ID ada
    if (id) {
      fetchProduct();
    }
  }, [id, router]);

  // Jika masih loading, tampilkan loading screen
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0a0a0a",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fafafa", fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  // Jika produk tidak ditemukan, tampilkan error screen
  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0a0a0a",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#fafafa",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          Produk Tidak Ditemukan
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#a3a3a3",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Produk yang Anda cari tidak tersedia
        </Text>
        {/* Tombol kembali */}
        <Pressable
          onPress={() => router.back()}
          style={{
            backgroundColor: "#fafafa",
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#0a0a0a" }}>
            Kembali
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    // ScrollView untuk konten yang bisa di-scroll
    <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      {/* Tombol Kembali */}
      <Pressable
        onPress={() => router.back()} // Kembali ke halaman sebelumnya
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginVertical: 8,
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={20}
          color="#fafafa"
          style={{ marginRight: 8 }}
        />
        <Text style={{ fontSize: 14, color: "#fafafa" }}>Kembali</Text>
      </Pressable>

      {/* Gambar/Icon Produk */}
      <View
        style={{
          aspectRatio: 16 / 9, // Ratio 16:9
          backgroundColor: "rgba(64, 64, 64, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#262626",
          marginBottom: 20,
        }}
      >
        {/* Icon dinamis berdasarkan nama produk */}
        <MaterialCommunityIcons
          name={getIconByTitle(product.nama) as any}
          size={48}
          color="#fafafa"
        />
      </View>

      {/* Konten Detail Produk */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        {/* Section Judul & Rating */}
        <View style={{ marginBottom: 24 }}>
          {/* Nama Produk */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#fafafa",
              marginBottom: 12,
            }}
          >
            {product.nama}
          </Text>
          {/* Rating dan Download Count */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            {/* Rating */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <MaterialCommunityIcons name="star" size={16} color="#eab308" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#fafafa",
                  marginLeft: 4,
                }}
              >
                {product.rating?.toFixed(1)}
              </Text>
            </View>
            {/* Download Count */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="download"
                size={16}
                color="#a3a3a3"
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3", marginLeft: 4 }}>
                {product.downloads?.toLocaleString("id-ID")} downloads
              </Text>
            </View>
          </View>

          {/* Harga Produk */}
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#fafafa" }}>
            {formatRupiah(product.harga)}
          </Text>
        </View>

        {/* Description */}
        <View
          style={{
            marginBottom: 32,
            paddingBottom: 24,
            borderBottomWidth: 1,
            borderBottomColor: "#262626",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#fafafa",
              marginBottom: 12,
            }}
          >
            Deskripsi Produk
          </Text>
          <Text style={{ fontSize: 14, color: "#a3a3a3", lineHeight: 22 }}>
            {product.deskripsi}
          </Text>
        </View>

        {/* Features */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#fafafa",
              marginBottom: 12,
            }}
          >
            Apa yang Anda Dapatkan
          </Text>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Instant download
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Lifetime access
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Free updates
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "#10b981",
                  marginRight: 10,
                }}
              />
              <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                Money back guarantee
              </Text>
            </View>
          </View>
        </View>

        {/* Tombol Action - Beli Sekarang */}
        <View style={{ gap: 12 }}>
          <Pressable
            style={{
              backgroundColor: "#fafafa",
              paddingVertical: 14,
              borderRadius: 6,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => setBuyModalVisible(true)} // Buka modal pembelian
          >
            <MaterialCommunityIcons
              name="cart"
              size={18}
              color="#0a0a0a"
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#0a0a0a" }}>
              Beli Sekarang
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Modal untuk Form Pembelian */}
      <Modal
        visible={buyModalVisible} // Kontrol visibility modal
        transparent // Background transparan
        animationType="slide" // Animasi slide dari bawah
        onRequestClose={() => setBuyModalVisible(false)} // Handle close
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)", // Overlay gelap
            justifyContent: "flex-end", // Posisi di bawah
          }}
        >
          <View
            style={{
              backgroundColor: "#171717",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              paddingBottom: 40,
            }}
          >
            {/* Header Modal */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fafafa" }}>
                Konfirmasi Pembelian
              </Text>
              {/* Tombol Close */}
              <Pressable onPress={() => setBuyModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#fafafa" />
              </Pressable>
            </View>

            {/* Deskripsi Modal */}
            <Text style={{ fontSize: 14, color: "#a3a3a3", marginBottom: 20 }}>
              Lengkapi data pembeli untuk melanjutkan pembelian {product?.nama}
            </Text>

            {/* Form Input */}
            <View style={{ gap: 16, marginBottom: 20 }}>
              {/* Input Nama Pembeli */}
              <View>
                <Text style={{ fontSize: 14, color: "#fafafa", marginBottom: 8 }}>
                  Nama Pembeli *
                </Text>
                <TextInput
                  placeholder="Masukkan nama pembeli"
                  placeholderTextColor="#737373"
                  value={formData.namaPembeli}
                  onChangeText={(text) =>
                    setFormData({ ...formData, namaPembeli: text })
                  }
                  style={{
                    backgroundColor: "#262626",
                    borderWidth: 1,
                    borderColor: "#404040",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: "#fafafa",
                    fontSize: 14,
                  }}
                />
              </View>

              {/* Input Email Pembeli */}
              <View>
                <Text style={{ fontSize: 14, color: "#fafafa", marginBottom: 8 }}>
                  Email Pembeli *
                </Text>
                <TextInput
                  placeholder="pembeli@example.com"
                  placeholderTextColor="#737373"
                  value={formData.emailPembeli}
                  onChangeText={(text) =>
                    setFormData({ ...formData, emailPembeli: text })
                  }
                  keyboardType="email-address" // Keyboard email
                  autoCapitalize="none" // Nonaktifkan auto capitalize
                  style={{
                    backgroundColor: "#262626",
                    borderWidth: 1,
                    borderColor: "#404040",
                    borderRadius: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: "#fafafa",
                    fontSize: 14,
                  }}
                />
              </View>

              {/* Display Total Pembayaran */}
              <View
                style={{
                  backgroundColor: "#262626",
                  padding: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#404040",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#a3a3a3" }}>
                    Total Pembayaran:
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fafafa" }}>
                    {formatRupiah(product?.harga || 0)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Tombol Action Modal */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              {/* Tombol Batal */}
              <Pressable
                onPress={() => setBuyModalVisible(false)}
                disabled={purchaseLoading}
                style={{
                  flex: 1,
                  backgroundColor: "#262626",
                  paddingVertical: 14,
                  borderRadius: 8,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#404040",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600", color: "#fafafa" }}>
                  Batal
                </Text>
              </Pressable>
              {/* Tombol Konfirmasi Pembelian */}
              <Pressable
                onPress={async () => {
                  // Validasi nama pembeli tidak boleh kosong
                  if (!formData.namaPembeli.trim()) {
                    Alert.alert("Validasi", "Nama pembeli harus diisi");
                    return;
                  }
                  // Validasi email pembeli tidak boleh kosong
                  if (!formData.emailPembeli.trim()) {
                    Alert.alert("Validasi", "Email pembeli harus diisi");
                    return;
                  }
                  // Validasi format email
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(formData.emailPembeli)) {
                    Alert.alert("Validasi", "Format email tidak valid");
                    return;
                  }

                  setPurchaseLoading(true); // Set loading true
                  try {
                    // Kirim request create transaksi ke API
                    await createTransaksi({
                      produkId: product!.id,
                      totalHarga: product!.harga,
                      namaPembeli: formData.namaPembeli.trim(),
                      emailPembeli: formData.emailPembeli.trim(),
                    });
                    setBuyModalVisible(false); // Tutup modal pembelian
                    setSuccessModalVisible(true); // Buka modal sukses
                    setFormData({ namaPembeli: "", emailPembeli: "" }); // Reset form
                  } catch (err: any) {
                    Alert.alert("Error", err.message || "Gagal membeli produk");
                  } finally {
                    setPurchaseLoading(false); // Set loading false
                  }
                }}
                disabled={purchaseLoading}
                style={{
                  flex: 1,
                  backgroundColor: "#fafafa",
                  paddingVertical: 14,
                  borderRadius: 8,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {/* Tampilkan loading indicator atau text */}
                {purchaseLoading ? (
                  <ActivityIndicator size="small" color="#0a0a0a" />
                ) : (
                  <Text style={{ fontSize: 14, fontWeight: "600", color: "#0a0a0a" }}>
                    Konfirmasi
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Sukses Pembelian */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade" // Animasi fade
        onRequestClose={() => {
          setSuccessModalVisible(false);
          router.push("/public"); // Redirect ke public page
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.8)", // Overlay gelap
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#171717",
              borderRadius: 16,
              padding: 32,
              width: "100%",
              maxWidth: 400,
              alignItems: "center",
            }}
          >
            {/* Icon Sukses */}
            <View
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.1)", // Background hijau transparan
                borderRadius: 50,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <MaterialCommunityIcons
                name="check-circle"
                size={48}
                color="#22c55e" // Warna hijau
              />
            </View>
            {/* Text Sukses */}
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#fafafa",
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Pembelian Berhasil!
            </Text>
            {/* Pesan Terima Kasih */}
            <Text
              style={{
                fontSize: 14,
                color: "#a3a3a3",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Terima kasih telah membeli{" "}
              <Text style={{ fontWeight: "600", color: "#fafafa" }}>
                {product?.nama}
              </Text>
            </Text>
            {/* Tombol Kembali ke Beranda */}
            <Pressable
              onPress={() => {
                setSuccessModalVisible(false);
                router.push("/public"); // Redirect ke public page
              }}
              style={{
                backgroundColor: "#fafafa",
                paddingHorizontal: 32,
                paddingVertical: 14,
                borderRadius: 8,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#0a0a0a" }}>
                Kembali ke Beranda
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
