import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Note } from '../../types';
import { useTheme } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  const theme = useTheme();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderLeftColor: theme.colors.note,
        },
      ]}
    >
      <Text
        style={[styles.title, { color: theme.colors.textPrimary }]}
        numberOfLines={1}
      >
        {note.title}
      </Text>
      <Text
        style={[styles.content, { color: theme.colors.textSecondary }]}
        numberOfLines={2}
      >
        {note.content}
      </Text>
      <Text style={[styles.date, { color: theme.colors.textMuted }]}>
        {formatDate(note.createdAt)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
});