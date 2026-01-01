// Import komponen Link untuk navigasi
import { Link } from 'expo-router';
// Import StyleSheet untuk styling
import { StyleSheet } from 'react-native';

// Import komponen themed custom
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Komponen untuk halaman modal
export default function ModalScreen() {
  return (
    // Container utama dengan themed view
    <ThemedView style={styles.container}>
      {/* Judul modal */}
      <ThemedText type="title">This is a modal</ThemedText>
      {/* Link untuk kembali ke home dengan opsi dismissTo */}
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

// Styling untuk komponen modal
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ambil seluruh ruang yang tersedia
    alignItems: 'center', // Rata tengah horizontal
    justifyContent: 'center', // Rata tengah vertikal
    padding: 20, // Padding 20px di semua sisi
  },
  link: {
    marginTop: 15, // Margin atas 15px
    paddingVertical: 15, // Padding vertikal 15px
  },
});
