import useClients from '@/hooks/useClients';
import { SessionProvider } from '@/providers/SessionProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { cssVar } from '@/constants/css';

export default function RootLayout() {
  const { queryClient } = useClients();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(cssVar.color.black);

      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider>
    </QueryClientProvider>
  );
}
