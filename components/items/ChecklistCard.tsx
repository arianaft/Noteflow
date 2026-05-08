import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChecklistNote } from '../../types';
import { useTheme } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const theme = useTheme();

  const completed = checklist.items.filter((i) => i.isCompleted).length;
  const total = checklist.items.length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderLeftColor: theme.colors.checklist,
        },
      ]}
    >
      <Text
        style={[styles.title, { color: theme.colors.textPrimary }]}
        numberOfLines={1}
      >
        {checklist.title}
      </Text>
      <Text style={[styles.counter, { color: theme.colors.textSecondary }]}>
        {completed} de {total} tareas completadas
      </Text>
      <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: theme.colors.checklist,
              width: `${progress * 100}%`,
            },
          ]}
        />
      </View>
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
  counter: {
    fontSize: 14,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});