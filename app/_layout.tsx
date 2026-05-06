import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="nueva-nota"
        options={{
          presentation: 'modal',
          title: 'Nueva nota',
        }}
      />
    </Stack>
  );
}