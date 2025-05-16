
import useClients from "@/hooks/useClients";
import { SessionProvider } from "@/providers/SessionProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";


export default function RootLayout() {
  const { queryClient } = useClients();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider></QueryClientProvider>
  )
}
