import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNotesStore } from '../store/notesStore';
import { useTheme } from '../constants/theme';

type NoteType = 'note' | 'checklist' | 'idea';

export default function NuevaNotaScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { addNote, addChecklist, addIdea } = useNotesStore();

  const [type, setType] = useState<NoteType>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [selectedColor, setSelectedColor] = useState(theme.colors.ideaColors[0]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (title.length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }
    if (type === 'note' && content.length === 0) {
      newErrors.content = 'El contenido no puede estar vacío';
    }
    if (type === 'idea' && tags.length === 0) {
      newErrors.tags = 'Añade al menos una etiqueta';
    }
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    if (type === 'note') {
      addNote({
        id: generateId(),
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (type === 'checklist') {
      addChecklist({
        id: generateId(),
        title,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (type === 'idea') {
      addIdea({
        id: generateId(),
        title,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        color: selectedColor,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.typeSelector}>
          {(['note', 'checklist', 'idea'] as NoteType[]).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              style={[
                styles.typeButton,
                {
                  backgroundColor:
                    type === t ? theme.colors.primary : theme.colors.surface,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: type === t ? '#fff' : theme.colors.textSecondary,
                  fontSize: 13,
                  fontWeight: '500',
                }}
              >
                {t === 'note' ? 'Nota' : t === 'checklist' ? 'Checklist' : 'Idea'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          placeholder="Título"
          placeholderTextColor={theme.colors.textMuted}
          value={title}
          onChangeText={setTitle}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.surface,
              borderColor: errors.title ? '#EF4444' : theme.colors.border,
              color: theme.colors.textPrimary,
            },
          ]}
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}

        {type === 'note' && (
          <>
            <TextInput
              placeholder="Contenido de la nota..."
              placeholderTextColor={theme.colors.textMuted}
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={6}
              style={[
                styles.input,
                styles.textarea,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: errors.content ? '#EF4444' : theme.colors.border,
                  color: theme.colors.textPrimary,
                },
              ]}
            />
            {errors.content && <Text style={styles.error}>{errors.content}</Text>}
          </>
        )}

        {type === 'idea' && (
          <>
            <TextInput
              placeholder="Etiquetas separadas por coma (ej: react, móvil)"
              placeholderTextColor={theme.colors.textMuted}
              value={tags}
              onChangeText={setTags}
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: errors.tags ? '#EF4444' : theme.colors.border,
                  color: theme.colors.textPrimary,
                },
              ]}
            />
            {errors.tags && <Text style={styles.error}>{errors.tags}</Text>}
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Color de fondo
            </Text>
            <View style={styles.colorSelector}>
              {theme.colors.ideaColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.colorDot,
                    {
                      backgroundColor: color,
                      borderWidth: selectedColor === color ? 3 : 1,
                      borderColor:
                        selectedColor === color
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ]}
                />
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 12 },
  typeSelector: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  textarea: { height: 140, textAlignVertical: 'top' },
  error: { color: '#EF4444', fontSize: 13, marginTop: -6 },
  label: { fontSize: 14, fontWeight: '500' },
  colorSelector: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  colorDot: { width: 36, height: 36, borderRadius: 18 },
  saveButton: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});