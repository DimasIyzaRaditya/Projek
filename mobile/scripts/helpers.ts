import { API_TRANSAKSI } from './api';

// format rupiah
export function formatRupiah(amount: number | undefined): string {
  if (!amount) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

// format tanggal ke WIB (Waktu Indonesia Barat)
export function formatWIB(dateStr: string | undefined): string {
  if (!dateStr) return '-';
  
  try {
    const date = new Date(dateStr);
    
    // Format: "17 Des 2025, 14:30"
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(date);
  } catch (error) {
    return '-';
  }
}

// format tanggal saja (tanpa waktu)
export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '-';
  
  try {
    const date = new Date(dateStr);
    
    // Format: "17 Des 2025"
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta',
    }).format(date);
  } catch (error) {
    return '-';
  }
}

// format waktu saja
export function formatTime(dateStr: string | undefined): string {
  if (!dateStr) return '-';
  
  try {
    const date = new Date(dateStr);
    
    // Format: "14:30"
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta',
    }).format(date);
  } catch (error) {
    return '-';
  }
}

// format angka biasa
export function formatNumber(num: number | undefined): string {
  if (!num) return '0';
  return new Intl.NumberFormat('id-ID').format(num);
}

// filter input hanya angka
export function filterNumericInput(text: string): string {
  return text.replace(/[^0-9]/g, '');
}

// sanitasi input untuk mencegah XSS (hapus simbol berbahaya)
export function sanitizeInput(text: string): string {
  return text
    .replace(/[<>{}[\]\\\/=]/g, '') // Hapus simbol berbahaya
    .trim();
}

// create transaksi
export async function createTransaksi(data: {
  produkId: number;
  totalHarga: number;
  namaPembeli: string;
  emailPembeli: string;
}) {
  const response = await fetch(API_TRANSAKSI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create transaksi');
  }

  return response.json();
}
