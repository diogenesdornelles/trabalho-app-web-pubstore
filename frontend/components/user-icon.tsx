import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import useSession from '@/hooks/use-session';
import { cssVar } from '@/constants/css';


export default function UserIcon() {
    const { session } = useSession();
    const router = useRouter()
    return (
        <Link
            style={styles.link}
            href="/account"
            asChild>
            <TouchableOpacity activeOpacity={.7} style={styles.button} hitSlop={20} onPressIn={() => router.push('/account')}> 
                {session && <Text style={styles.text}>{JSON.parse(session).username}</Text>}
                {session ? <Feather name="user-check" size={24} color="white" />
                    : <Feather name="user-minus" size={24} color="white" />}
            </TouchableOpacity>
        </Link>

    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10,
        marginTop: 0
    },
    text: {
        color: cssVar.color.white,
        fontSize: 20
    },
    link: {
        width: 'auto'
    }
})
