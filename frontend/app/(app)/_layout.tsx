import { Stack } from 'expo-router';
import ProtectedRoutes from '@/components/ProtectedRoutes';

export default function AppLayout() {
  return (
    <ProtectedRoutes>
      {/* Substituímos Tabs por Stack */}
      <Stack screenOptions={{ headerShown: false }} />
    </ProtectedRoutes>
  );
}
