'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import ProductCard from '@/components/product-card';
import { API_PRODUK } from '@/lib/api';

interface Produk {
  id: number;
  nama: string;
  harga: number;
  deskripsi?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export default function PublicPage() {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_PRODUK, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error('Gagal mengambil data produk');
      }
      const result = await response.json();
      setProduk(result.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-50">Produk Digital</h2>
            <p className="mt-2 text-neutral-400">
              Temukan berbagai produk digital berkualitas untuk kebutuhan Anda
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-800 border-t-blue-600"></div>
            </div>
          ) : error ? (
            <div className="rounded-md border border-red-800 bg-red-950/50 p-4 text-red-400">
              {error}
            </div>
          ) : produk.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-400">Tidak ada produk yang tersedia</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {produk.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  title={product.nama}
                  description="Produk digital berkualitas"
                  price={product.harga}
                  rating={4.5}
                  downloads={0}
                  imageUrl=""
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}