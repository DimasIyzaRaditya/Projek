import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_PRODUK } from "@/scripts/api";
import { filterNumericInput, sanitizeInput } from "@/scripts/helpers";
import {
  colors,
  commonStyles,
  headerStyles,
  inputStyles,
  buttonStyles,
  cardStyles,
  spacing,
  borderRadius,
} from "@/app/styles";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    deskripsi: "",
  });

  const handleSubmit = async () => {
    if (!formData.nama.trim()) {
      Alert.alert("Validasi", "Nama produk tidak boleh kosong");
      return;
    }

    const hargaNum = parseInt(formData.harga);
    if (isNaN(hargaNum) || hargaNum <= 0) {
      Alert.alert("Validasi", "Harga harus berupa angka positif");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_PRODUK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: sanitizeInput(formData.nama),
          harga: hargaNum,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        Alert.alert("Error", data.error || "Gagal menambahkan produk");
        setLoading(false);
        return;
      }

      // Langsung redirect tanpa alert
      setLoading(false);
      router.replace("/seller");
    } catch (err) {
      console.error("Error:", err);
      Alert.alert("Error", "Terjadi kesalahan saat menambahkan produk");
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {/* Header */}
      <View style={headerStyles.container}>
        <View style={commonStyles.flexRowCenter}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                padding: spacing.sm,
                marginLeft: -spacing.sm,
                marginRight: spacing.md,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.text.primary}
            />
          </Pressable>
          <Text style={headerStyles.title}>Tambah Produk Baru</Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: spacing.lg }}
      >
        <View
          style={[
            cardStyles.container,
            {
              backgroundColor: colors.background.card,
              borderRadius: borderRadius.lg,
              padding: spacing.lg,
            },
          ]}
        >
          {/* Nama Produk */}
          <View style={inputStyles.container}>
            <Text style={inputStyles.label}>Nama Produk *</Text>
            <View style={inputStyles.wrapper}>
              <MaterialCommunityIcons
                name="package-variant"
                size={18}
                color={colors.text.secondary}
              />
              <TextInput
                placeholder="Masukkan nama produk"
                placeholderTextColor={colors.text.muted}
                value={formData.nama}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, nama: text }))
                }
                editable={!loading}
                style={inputStyles.input}
              />
            </View>
          </View>

          {/* Harga */}
          <View style={inputStyles.container}>
            <Text style={inputStyles.label}>Harga (Rp) *</Text>
            <View style={inputStyles.wrapper}>
              <MaterialCommunityIcons
                name="cash"
                size={18}
                color={colors.text.secondary}
              />
              <TextInput
                placeholder="Masukkan harga produk"
                placeholderTextColor={colors.text.muted}
                keyboardType="numeric"
                value={formData.harga}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, harga: filterNumericInput(text) }))
                }
                editable={!loading}
                style={inputStyles.input}
              />
            </View>
          </View>

          {/* Deskripsi */}
          <View style={inputStyles.container}>
            <Text style={inputStyles.label}>Deskripsi (Opsional)</Text>
            <View
              style={[
                inputStyles.wrapper,
                {
                  alignItems: "flex-start",
                  paddingVertical: spacing.md,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="text"
                size={18}
                color={colors.text.secondary}
                style={{ marginTop: 2 }}
              />
              <TextInput
                placeholder="Masukkan deskripsi produk"
                placeholderTextColor={colors.text.muted}
                multiline
                numberOfLines={5}
                value={formData.deskripsi}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, deskripsi: text }))
                }
                editable={!loading}
                style={[
                  inputStyles.input,
                  {
                    height: 100,
                    textAlignVertical: "top",
                  },
                ]}
              />
            </View>
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
            <Pressable
              onPress={() => router.back()}
              disabled={loading}
              style={({ pressed }) => [
                buttonStyles.secondary,
                { flex: 1, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={buttonStyles.secondaryText}>Batal</Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={({ pressed }) => [
                buttonStyles.primary,
                { flex: 1, opacity: pressed || loading ? 0.7 : 1 },
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colors.text.primary} />
              ) : (
                <Text style={buttonStyles.primaryText}>Simpan Produk</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
