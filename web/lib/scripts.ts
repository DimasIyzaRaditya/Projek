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