import Page from "@/components/Page";
import { cssVar } from "@/constants/css";
import { useEndSession } from "@/hooks/useEndSession";
import useSession from "@/hooks/useSession";
import { StyleSheet, Text, View } from "react-native";

export default function Account() {
    const { authSession } = useSession();
    const endSession = useEndSession();
    let name: string | undefined;
    let id: string | undefined;
    let loggedAt: string | undefined;
    let cpf: string | undefined;

    if (authSession) {
        ({ name, id, loggedAt, cpf } = authSession);
    }

    return (
        <Page customStyle={{ opacity: 0.8, filter: 'grayscale(100%)' }} blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 10 }}>
            <View style={styles.userInfo}>
                <Text style={styles.title}>Informações do usuário: </Text>
                {name && <Text style={styles.text}>Nome: {name}</Text>}
                {id && <Text style={styles.text}>ID: {id}</Text>}
                {cpf && <Text style={styles.text}>CPF: {cpf}</Text>}
                {loggedAt && <Text style={styles.text}>Logado em: {new Date(loggedAt).toLocaleDateString()}</Text>}
            </View>
                  <Text
                    style={styles.signOut}
                    onPress={() => endSession()}>
                    Sair
                  </Text>
        </Page>
    );
}

const styles = StyleSheet.create({
    userInfo: {
        backgroundColor: cssVar.color.black,
        padding: 20,
        margin: 20,
        borderWidth: 1,
        borderTopColor: cssVar.color.highlight,
        borderBottomColor: cssVar.color.highlight,
        shadowColor: cssVar.color.highlight,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
    },
    title: {
        color: cssVar.color.highlight,
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center'
    },
    text: {
        color: cssVar.color.white,
        fontSize: 18,
        marginVertical: 4,
    },
    signOut: {
        fontSize: 26,
        position: 'absolute',
        color: cssVar.color.white,
        bottom: 10,
        marginTop: 30,
        textShadowColor: cssVar.color.black,
        backgroundColor: cssVar.color.black,
        padding: 50,
        width: '100%',
        textAlign: 'center',
        opacity: 1
      },
});
