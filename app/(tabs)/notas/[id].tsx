import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useTheme } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function NotaDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const { notes, deleteNote } = useNotesStore();

  const nota = notes.find((n) => n.id === id);

  if (!nota) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.textMuted }}>Nota no encontrada</Text>
      </View>
    );
  }

 const handleDelete = () => {
  if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    deleteNote(nota.id);
    router.back();
  }
};

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        {nota.title}
      </Text>
      <Text style={[styles.date, { color: theme.colors.textMuted }]}>
        {new Date(nota.createdAt).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </Text>
      <Text style={[styles.content, { color: theme.colors.textSecondary }]}>
        {nota.content}
      </Text>
      <TouchableOpacity
        onPress={handleDelete}
        style={[styles.deleteButton, { backgroundColor: '#EF4444' }]}
      >
        <Text style={styles.deleteButtonText}>Eliminar nota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  date: { fontSize: 13, marginBottom: 20 },
  content: { fontSize: 16, lineHeight: 24 },
  deleteButton: {
    position: 'absolute',
    bottom: 32,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});