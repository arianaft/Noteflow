import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../../store/notesStore';
import NoteCard from '../../components/items/NoteCard';
import { Note } from '../../types';
import { useTheme } from '../../constants/theme';

export default function NotasScreen() {
  const { notes } = useNotesStore();
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {notes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>
            No tienes notas todavía
          </Text>
        </View>
      ) : (
        <FlashList
          data={notes}
          renderItem={({ item }: { item: Note }) => (
            <NoteCard
              note={item}
              onPress={() => router.push(`/(tabs)/notas/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/nueva-nota')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 32 },
});