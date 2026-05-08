import { View, Text, StyleSheet } from 'react-native';
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

  if (notes.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>
          No tienes notas todavía
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlashList
        data={notes}
        estimatedItemSize={100}
        renderItem={({ item }: { item: Note }) => (
          <NoteCard
            note={item}
            onPress={() => router.push(`/(tabs)/notas/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});