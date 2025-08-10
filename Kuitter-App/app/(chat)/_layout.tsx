import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="partner-chat/[id]" />
      <Stack.Screen name="anchor" />
    </Stack>
  );
}