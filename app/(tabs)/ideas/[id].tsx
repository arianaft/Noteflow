import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useTheme } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function IdeaDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const { ideas, deleteIdea } = useNotesStore();

  const idea = ideas.find((i) => i.id === id);

  if (!idea) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.textMuted }}>Idea no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
  if (window.confirm('¿Estás seguro de que quieres eliminar esta idea?')) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    deleteIdea(idea.id);
    router.back();
  }
};

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: idea.color || theme.colors.background },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        {idea.title}
      </Text>
      <View style={styles.tagsContainer}>
        {idea.tags.map((tag, index) => (
          <View
            key={index}
            style={[styles.tag, { backgroundColor: theme.colors.border }]}
          >
            <Text style={[styles.tagText, { color: theme.colors.textSecondary }]}>
              {tag}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={handleDelete}
        style={[styles.deleteButton, { backgroundColor: '#EF4444' }]}
      >
        <Text style={styles.deleteButtonText}>Eliminar idea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 9999 },
  tagText: { fontSize: 14 },
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