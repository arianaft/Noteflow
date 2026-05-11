import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotesStore } from '../../../store/notesStore';
import { useTheme } from '../../../constants/theme';
import * as Haptics from 'expo-haptics';

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const { checklists, deleteChecklist, toggleChecklistItem } = useNotesStore();

  const checklist = checklists.find((c) => c.id === id);

  if (!checklist) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.textMuted }}>Checklist no encontrado</Text>
      </View>
    );
  }

  const handleToggle = (itemId: string) => {
    toggleChecklistItem(checklist.id, itemId);
    const allCompleted = checklist.items.every((i) =>
      i.id === itemId ? !i.isCompleted : i.isCompleted
    );
    if (allCompleted) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDelete = () => {
  if (window.confirm('¿Estás seguro de que quieres eliminar este checklist?')) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    deleteChecklist(checklist.id);
    router.back();
  }
};

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        {checklist.title}
      </Text>
      {checklist.items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleToggle(item.id)}
          style={[styles.item, { borderColor: theme.colors.border }]}
        >
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: item.isCompleted
                  ? theme.colors.checklist
                  : 'transparent',
                borderColor: item.isCompleted
                  ? theme.colors.checklist
                  : theme.colors.border,
              },
            ]}
          />
          <Text
            style={[
              styles.itemText,
              {
                color: item.isCompleted
                  ? theme.colors.textMuted
                  : theme.colors.textPrimary,
                textDecorationLine: item.isCompleted ? 'line-through' : 'none',
              },
            ]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
      {checklist.items.length === 0 && (
        <Text style={[styles.empty, { color: theme.colors.textMuted }]}>
          No hay items en este checklist
        </Text>
      )}
      <TouchableOpacity
        onPress={handleDelete}
        style={[styles.deleteButton, { backgroundColor: '#EF4444' }]}
      >
        <Text style={styles.deleteButtonText}>Eliminar checklist</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
  itemText: { fontSize: 16 },
  empty: { fontSize: 16, marginTop: 20 },
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