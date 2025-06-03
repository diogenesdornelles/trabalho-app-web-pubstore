import { Alert } from 'react-native';
import useSession from './useSession';
import { useRouter } from 'expo-router';

export function useEndSession(): () => void {
  const { signOut } = useSession();
  const router = useRouter();
  const endSession = () => {
    Alert.alert('Opss!', 'A sessão terminou. Por favor, faça login novamente', [
      {
        text: 'OK',
        onPress: () => {
          signOut();
          router.push('/sign-in');
        },
        style: 'cancel',
      },
    ]);
  };
  return endSession;
}
