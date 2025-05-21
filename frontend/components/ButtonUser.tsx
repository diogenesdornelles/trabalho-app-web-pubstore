import { cssVar } from '@/constants/css';
import useSession from '@/hooks/useSession';
import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ButtonUser() {
  const { authSession } = useSession();
  const router = useRouter();
  return (
    <Link style={styles.linkHeader} href="/account" asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonHeader}
        hitSlop={20}
        onPressIn={() => router.push('/account')}
      >
        {authSession && (
          <Text style={styles.textHeader}>{authSession ? authSession.name : ''}</Text>
        )}
        {authSession ? (
          <Feather name="user-check" size={24} color="white" />
        ) : (
          <Feather name="user-minus" size={24} color="white" />
        )}
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 0,
  },
  textHeader: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  linkHeader: {
    width: 'auto',
  },
});
