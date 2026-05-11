import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1F2937',
          borderTopColor: '#374151',
        },
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#6B7280',
        headerStyle: {
          backgroundColor: '#1F2937',
        },
        headerTintColor: '#F9FAFB',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notas/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="checklists/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="ideas/[id]"
        options={{ href: null }}
      />
    </Tabs>
  );
}