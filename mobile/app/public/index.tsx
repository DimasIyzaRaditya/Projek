import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { API_PRODUK } from "@/scripts/api";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  colors,
  commonStyles,
  headerStyles,
  inputStyles,
  buttonStyles,
  tableStyles,
  statsStyles,
  sectionStyles,
  spacing,
  typography,
  borderRadius,
} from "@/app/styles";

interface Produk {
  id: number;
  nama: string;
  harga: number;
}

async function getProduk(): Promise<Produk[]> {
  try {
    console.log("Fetching products from:", API_PRODUK);

    const res = await fetch(API_PRODUK, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error:", res.status, errorText);
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    console.log("API response:", data);

    const products = Array.isArray(data.data) ? data.data : [];
    console.log("Total products:", products.length);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    getProduk()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal memuat produk");
        setLoading(false);
      });
  }, []);

  const filteredProducts = searchQuery.trim()
    ? products.filter((product) =>
      product.nama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowSearchResults(text.trim().length > 0);
  };

  const handleProductClick = (productId: number) => {
    setSearchQuery("");
    setShowSearchResults(false);
    router.push(`/detail/${productId}` as never);
  };

  return (
    <ScrollView style={commonStyles.container}>
      {/* Header */}
      <View style={headerStyles.containerSecondary}>
        <View style={commonStyles.flexRowBetween}>
          <View style={headerStyles.logoContainer}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={headerStyles.logo}
              resizeMode="contain"
            />
            <Text style={headerStyles.brandText}>Ahmeng Trade</Text>
          </View>

          <Pressable
            onPress={() => router.push("./login")}
            style={({ pressed }) => [
              buttonStyles.brand,
              pressed && { backgroundColor: colors.brand.primaryHover },
            ]}
          >
            <Text style={buttonStyles.brandText}>Login</Text>
          </Pressable>
        </View>
      </View>

      {/* Search Input */}
      <View style={commonStyles.containerPadding}>
        <View style={[inputStyles.searchContainer, { marginTop: spacing.lg }]}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={colors.text.secondary}
          />
          <TextInput
            placeholder="Cari produk digital..."
            placeholderTextColor={colors.text.tertiary}
            value={searchQuery}
            onChangeText={handleSearchChange}
            style={inputStyles.searchInput}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={colors.text.secondary}
              />
            </Pressable>
          )}
        </View>

        {/* Search Results Dropdown */}
        {showSearchResults && (
          <View
            style={{
              marginTop: spacing.md,
              backgroundColor: colors.background.tertiary,
              borderWidth: 1,
              borderColor: colors.border.secondary,
              borderRadius: borderRadius.md,
              maxHeight: 300,
            }}
          >
            {filteredProducts.length > 0 ? (
              <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 300 }}>
                {filteredProducts.map((product, index) => (
                  <Pressable
                    key={product.id}
                    onPress={() => handleProductClick(product.id)}
                    style={({ pressed }) => [
                      {
                        paddingVertical: spacing.base,
                        paddingHorizontal: spacing.lg,
                        borderBottomWidth:
                          index === filteredProducts.length - 1 ? 0 : 1,
                        borderBottomColor: colors.border.primary,
                        backgroundColor: pressed
                          ? colors.border.primary
                          : "transparent",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          commonStyles.textPrimary,
                          commonStyles.textSemibold,
                          { fontSize: typography.fontSize.base, marginBottom: spacing.xs },
                        ]}
                      >
                        {product.nama}
                      </Text>
                      <Text
                        style={[
                          commonStyles.textSecondary,
                          { fontSize: typography.fontSize.xs },
                        ]}
                      >
                        Rp {product.harga.toLocaleString("id-ID")}
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={18}
                      color={colors.text.secondary}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            ) : (
              <View
                style={{
                  paddingVertical: spacing.xl,
                  paddingHorizontal: spacing.lg,
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="magnify-close"
                  size={32}
                  color={colors.text.secondary}
                  style={{ marginBottom: spacing.md }}
                />
                <Text
                  style={[
                    commonStyles.textSecondary,
                    commonStyles.textCenter,
                    { fontSize: typography.fontSize.base },
                  ]}
                >
                  Produk "{searchQuery}" tidak ditemukan
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Hero Section */}
      <View
        style={[
          sectionStyles.container,
          { paddingVertical: spacing['4xl'] },
        ]}
      >
        <Text
          style={[
            sectionStyles.title,
            commonStyles.textCenter,
            { fontSize: typography.fontSize['3xl'], marginBottom: spacing.lg },
          ]}
        >
          Marketplace File Digital
        </Text>
        <Text
          style={[
            sectionStyles.subtitle,
            commonStyles.textCenter,
            { marginBottom: spacing['2xl'] },
          ]}
        >
          Koleksi pribadi template, ebook, source code, dan aset digital untuk
          mereka yang berbagi minat yang sama
        </Text>
      </View>

      {/* Stats Section */}
      <View
        style={{
          paddingVertical: spacing.xl,
          paddingHorizontal: spacing.lg,
          backgroundColor: colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: colors.border.primary,
        }}
      >
        <View style={statsStyles.container}>
          <View style={statsStyles.item}>
            <MaterialCommunityIcons
              name="download"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={statsStyles.value}>10K+</Text>
            <Text style={statsStyles.label}>Total Download</Text>
          </View>
          <View style={statsStyles.item}>
            <MaterialCommunityIcons
              name="trending-up"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={statsStyles.value}>500+</Text>
            <Text style={statsStyles.label}>Produk Digital</Text>
          </View>
          <View style={statsStyles.item}>
            <MaterialCommunityIcons
              name="star"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={statsStyles.value}>4.8</Text>
            <Text style={statsStyles.label}>Rating Rata-rata</Text>
          </View>
          <View style={statsStyles.item}>
            <MaterialCommunityIcons
              name="trophy"
              size={24}
              color={colors.text.secondary}
            />
            <Text style={statsStyles.value}>100+</Text>
            <Text style={statsStyles.label}>Penjual Terpercaya</Text>
          </View>
        </View>
      </View>

      {/* Featured Products */}
      <View style={sectionStyles.container}>
        <Text style={sectionStyles.title}>Produk Digital</Text>
        <Text style={sectionStyles.subtitle}>
          Temukan berbagai produk digital berkualitas untuk kebutuhan Anda
        </Text>

        {/* Table Header */}
        <View style={tableStyles.header}>
          <Text style={[tableStyles.headerText, { flex: 1 }]}>Nama Produk</Text>
          <Text style={[tableStyles.headerText, { width: 100, textAlign: "right" }]}>
            Harga
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
        ) : error ? (
          <View style={tableStyles.emptyState}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={32}
              color={colors.status.error}
              style={{ marginBottom: spacing.base }}
            />
            <Text
              style={[
                { color: colors.status.error, fontSize: typography.fontSize.base, marginBottom: spacing.base },
              ]}
            >
              {error}
            </Text>
            <Pressable
              onPress={() => {
                setLoading(true);
                setError("");
                getProduk().then((data) => {
                  if (data && data.length > 0) {
                    setProducts(data);
                  }
                  setLoading(false);
                });
              }}
              style={[buttonStyles.primary, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}
            >
              <Text style={[buttonStyles.primaryText, { fontSize: typography.fontSize.xs }]}>
                Coba Lagi
              </Text>
            </Pressable>
          </View>
        ) : products && products.length > 0 ? (
          products.map((product, index) => (
            <Pressable
              key={product.id}
              onPress={() => router.push(`/detail/${product.id}` as never)}
              style={[
                tableStyles.row,
                index % 2 === 0 ? tableStyles.rowEven : tableStyles.rowOdd,
                {
                  borderBottomWidth: index === products.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border.primary,
                  borderBottomLeftRadius: index === products.length - 1 ? borderRadius.md : 0,
                  borderBottomRightRadius: index === products.length - 1 ? borderRadius.md : 0,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={tableStyles.cellText}>{product.nama}</Text>
              </View>
              <View
                style={{
                  width: 100,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={tableStyles.cellText}>
                  Rp {product.harga.toLocaleString("id-ID")}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color={colors.text.secondary}
                />
              </View>
            </Pressable>
          ))
        ) : (
          <View style={tableStyles.emptyState}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={32}
              color={colors.text.secondary}
              style={{ marginBottom: spacing.base }}
            />
            <Text style={commonStyles.textSecondary}>
              Belum ada produk tersedia
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border.primary,
          backgroundColor: colors.background.primary,
          paddingVertical: spacing['2xl'],
          paddingHorizontal: spacing.lg,
        }}
      >
        <View style={{ marginBottom: spacing.xl }}>
          <Text
            style={[
              commonStyles.textPrimary,
              commonStyles.textSemibold,
              { fontSize: typography.fontSize.md, marginBottom: spacing.md },
            ]}
          >
            DigitalMarket
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: typography.fontSize.xs }]}>
            Platform jual beli file digital terpercaya di Indonesia
          </Text>
        </View>
        <View style={{ marginBottom: spacing.xl }}>
          <Text
            style={[
              commonStyles.textPrimary,
              commonStyles.textSemibold,
              { fontSize: typography.fontSize.base, marginBottom: spacing.md },
            ]}
          >
            Produk
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: typography.fontSize.xs, marginBottom: spacing.xs }]}>
            Template
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: typography.fontSize.xs, marginBottom: spacing.xs }]}>
            E-Book
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: typography.fontSize.xs, marginBottom: spacing.xs }]}>
            Source Code
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: typography.fontSize.xs }]}>
            Assets
          </Text>
        </View>
        <Text
          style={[
            commonStyles.textSecondary,
            commonStyles.textCenter,
            {
              fontSize: typography.fontSize.xs,
              borderTopWidth: 1,
              borderTopColor: colors.border.primary,
              paddingTop: spacing.xl,
            },
          ]}
        >
          © 2025 Ahmeng Trade. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}
