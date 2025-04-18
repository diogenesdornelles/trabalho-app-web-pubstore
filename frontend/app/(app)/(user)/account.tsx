import Page from "@/components/page";
import { useStorageState } from "@/hooks/use-storage-state";
import { Text, StyleSheet, View } from "react-native";
import { cssVar } from "@/constants/css";

export default function Account() {
    const [[isLoading, session], setSession] = useStorageState('sessionPubStore');
    let username: string | undefined;
    let id: string | undefined;
    let loggedAt: string | undefined;

    if (session) {
        ({ username, id, loggedAt } = JSON.parse(session) as { username?: string, id?: string, loggedAt?: string });
    }

    return (
        <Page title='Account' customStyle={{ opacity: 0.8, filter: 'grayscale(100%)' }} blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 10 }}>
            <View style={styles.userInfo}>
                <Text style={styles.title}>User Info</Text>
                {username && <Text style={styles.text}>Username: {username}</Text>}
                {id && <Text style={styles.text}>ID: {id}</Text>}
                {loggedAt && <Text style={styles.text}>Logged At: {loggedAt}</Text>}
                {/* VER PEDIDOS */}
            </View>
        </Page>
    );
}

const styles = StyleSheet.create({
    userInfo: {
        backgroundColor: cssVar.color.black,
        padding: 20,
        margin: 20,
        borderWidth: 1,
        // borderRadius: 12,
        borderTopColor: cssVar.color.gold,
        borderBottomColor: cssVar.color.gold,
        // Sombreamento para iOS
        shadowColor: cssVar.color.gold,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // Elevação para Android
        elevation: 5,
        width: '100%'
    },
    title: {
        color: cssVar.color.gold,
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center'
    },
    text: {
        color: cssVar.color.white,
        fontSize: 18,
        marginVertical: 4,
    }
});
