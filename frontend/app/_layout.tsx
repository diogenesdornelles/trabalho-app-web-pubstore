import { cssVar } from '@/constants/css';
import { SessionProvider } from '@/providers/SessionProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <SessionProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: cssVar.color.black },
            }}
          />
        </SessionProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
