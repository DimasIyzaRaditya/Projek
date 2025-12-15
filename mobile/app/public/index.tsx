import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { API_PRODUK } from '@/scripts/api';
import { useRouter } from 'expo-router';

interface Produk {
  id: number;
  nama: string;
  harga: number;
}

async function getProduk(): Promise<Produk[]> {
  try {
    console.log("🔄 Fetching products from:", API_PRODUK);

    const res = await fetch(API_PRODUK, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("📊 Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ API error:", res.status, errorText);
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ API response:", data);

    const products = Array.isArray(data.data) ? data.data : [];
    console.log("📦 Total products:", products.length);

    return products;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}
// buat state
export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


export default function HomePage() {
  return (
    <View>
      <Text>HomePage</Text>
    </View>
  )
}