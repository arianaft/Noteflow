import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IdeaNote } from '../../types';
import { useTheme } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: idea.color || theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Text
        style={[styles.title, { color: theme.colors.textPrimary }]}
        numberOfLines={1}
      >
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
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  tagText: {
    fontSize: 12,
  },
});