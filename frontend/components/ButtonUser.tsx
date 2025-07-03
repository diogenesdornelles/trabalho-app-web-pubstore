import { cssVar } from '@/constants/css';
import useSession from '@/hooks/useSession';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
          <Text style={styles.buttonUserTextHeader}>
            {authSession ? authSession.name.split(' ')[0] : ''}
          </Text>
        )}
        {authSession ? (
          <MaterialCommunityIcons name="account-check" size={28} color={cssVar.color.highlight} />
        ) : (
          <MaterialCommunityIcons name="account-minus" size={28} color={cssVar.color.highlight} />
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
