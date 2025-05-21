import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import useSession from './useSession';

export function useEndSession(): () => void {
  const { signOut } = useSession();
  const router = useRouter();
  const endSession = () => {
    Alert.alert('Erro', 'Session closed. Please log in again.', [
      {
        text: 'OK',
        onPress: () => router.push('/home'),
        style: 'cancel',
      },
    ]);
    signOut();
    router.push('/login');
  };
  return endSession;
}
