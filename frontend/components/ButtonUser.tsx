import { cssVar } from '@/constants/css';
import useSession from '@/hooks/useSession';
import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ButtonUser() {
  const { authSession } = useSession();
  const router = useRouter();
  return (
    <Link style={styles.buttonUserLinkHeader} href="/user" asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonUserHeader}
        hitSlop={20}
        onPressIn={() => router.push('/user')}
      >
        {authSession && (
          <Text style={styles.buttonUserTextHeader}>{authSession ? authSession.name : ''}</Text>
        )}
        {authSession ? (
          <Feather name="user-check" size={25} color="white" />
        ) : (
          <Feather name="user-minus" size={25} color="white" />
        )}
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonUserHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginRight: 10,
  },
  buttonUserTextHeader: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  buttonUserLinkHeader: {
    width: 'auto',
  },
});
