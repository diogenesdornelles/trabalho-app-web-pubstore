import { cssVar } from "@/constants/css";
import { ExternalPathString, Link } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


export default function Button({ text, pathname, params, onPress }: { text: string, pathname?: string, params?: Record<string, any>, onPress?: () => void }): React.ReactElement {
    return (
        <Link
            href={{
                pathname: pathname as ExternalPathString,
                params
            }}
            style={[styles.link, { marginHorizontal: 'auto' }]}
            asChild
            key={text}
        >
            <TouchableOpacity style={styles.button} activeOpacity={.7} onPress={onPress}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </Link>
    )
}


const styles = StyleSheet.create({

    button: {
        color: cssVar.color.white,
        fontSize: RFValue(16, 540), // vw padrão de 680
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: cssVar.color.black,
        padding: 8,
        textDecorationLine: 'none',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: cssVar.color.gold,
        minWidth: 300,
        marginTop: 20
    },
    link: {
    },
    buttonText: {
        fontSize: RFValue(16, 540), // vw padrão de 680
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 8,
        textDecorationLine: 'none',
        paddingHorizontal: 40,
        color: cssVar.color.gold,
    },
})
