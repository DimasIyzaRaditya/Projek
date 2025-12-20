import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { API_PRODUK_BY_ID } from "@/scripts/api";
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

type Produk = {
    id?: number;
    nama?: string;
    harga?: number;
};

export default function EditProdukPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [produk, setProduk] = useState<Produk>({});
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");

    useEffect(() => {
        fetchProduk();
    }, [id]);

    const fetchProduk = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_PRODUK_BY_ID(Number(id)));
            const json = await res.json();
            if (json.data) {
                setProduk(json.data);
                setNama(json.data.nama || "");
                setHarga(json.data.harga?.toString() || "");
            }
        } catch (e) {
            Alert.alert("Error", "Gagal memuat data produk");
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!nama.trim()) {
            Alert.alert("Validasi", "Nama produk tidak boleh kosong");
            return;
        }

        const hargaNum = parseInt(harga);
        if (isNaN(hargaNum) || hargaNum <= 0) {
            Alert.alert("Validasi", "Harga harus berupa angka positif");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(API_PRODUK_BY_ID(Number(id)), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nama: sanitizeInput(nama),
                    harga: hargaNum,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                Alert.alert("Error", data.error || "Gagal memperbarui produk");
                setSaving(false);
                return;
            }

            // Langsung redirect tanpa alert
            setSaving(false);
            router.replace("/seller");
        } catch (e) {
            Alert.alert("Error", "Terjadi kesalahan");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <View style={[commonStyles.container, commonStyles.flexCenter]}>
                <ActivityIndicator size="large" color={colors.text.primary} />
                <Text
                    style={[
                        commonStyles.textSecondary,
                        { marginTop: spacing.lg, fontSize: 14 },
                    ]}
                >
                    Memuat data produk...
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={commonStyles.container}>
            {/* Header */}
            <View style={headerStyles.container}>
                <View style={[commonStyles.flexRow, { alignItems: "center", marginBottom: spacing.md }]}>
                    <Pressable
                        onPress={() => router.back()}
                        style={[
                            buttonStyles.secondary,
                            { marginRight: spacing.base, padding: spacing.md },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={20}
                            color={colors.text.primary}
                        />
                    </Pressable>
                    <Text style={headerStyles.title}>Edit Produk</Text>
                </View>
                <Text style={[headerStyles.subtitle, { marginLeft: 52 }]}>
                    Perbarui informasi produk #{id}
                </Text>
            </View>

            {/* Form */}
            <View style={{ padding: spacing.lg }}>
                <View style={cardStyles.container}>
                    {/* Nama Produk */}
                    <View style={inputStyles.container}>
                        <Text style={inputStyles.label}>Nama Produk</Text>
                        <TextInput
                            value={nama}
                            onChangeText={setNama}
                            placeholder="Masukkan nama produk"
                            placeholderTextColor={colors.text.tertiary}
                            style={inputStyles.inputSimple}
                        />
                    </View>

                    {/* Harga */}
                    <View style={[inputStyles.container, { marginBottom: spacing['2xl'] }]}>
                        <Text style={inputStyles.label}>Harga (Rp)</Text>
                        <TextInput
                            value={harga}
                            onChangeText={(text) => setHarga(filterNumericInput(text))}
                            placeholder="Masukkan harga"
                            placeholderTextColor={colors.text.tertiary}
                            keyboardType="numeric"
                            style={inputStyles.inputSimple}
                        />
                    </View>

                    {/* Buttons */}
                    <View style={commonStyles.flexRow}>
                        <Pressable
                            onPress={() => router.back()}
                            disabled={saving}
                            style={[
                                buttonStyles.secondary,
                                { flex: 1, justifyContent: "center" },
                            ]}
                        >
                            <Text style={buttonStyles.secondaryText}>Batal</Text>
                        </Pressable>
                        <Pressable
                            onPress={handleSave}
                            disabled={saving}
                            style={[
                                buttonStyles.primary,
                                { flex: 1, marginLeft: spacing.base },
                                saving && buttonStyles.disabled,
                            ]}
                        >
                            {saving ? (
                                <>
                                    <ActivityIndicator
                                        size="small"
                                        color={colors.background.primary}
                                    />
                                    <Text
                                        style={[
                                            buttonStyles.primaryText,
                                            { marginLeft: spacing.md },
                                        ]}
                                    >
                                        Menyimpan...
                                    </Text>
                                </>
                            ) : (
                                <Text style={buttonStyles.primaryText}>Simpan Perubahan</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
