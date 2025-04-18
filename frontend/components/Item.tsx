import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Image } from 'expo-image';
import { ItemSimpleViewPropsInterface } from "@/interfaces/item-simple-view.props.interface";
import { cssVar } from "@/constants/css";



export default function Item(item: ItemSimpleViewPropsInterface): React.ReactElement {
    return (
        <Link
            href={{
                pathname: '/(app)/(details)/[id]',
                params: { id: item.id }
            }}
            style={[styles.link, { marginHorizontal: 'auto' }]}
            asChild
        >
            <TouchableOpacity 
                style={styles.container} 
                activeOpacity={.7} 
                disabled={!item.disponible} 
                onPress={() => { if (!item.disponible) alert('Item not disponible'); }} 
            >
                {/* Imagem do Item */}
                <Image source={item.source} style={styles.image} contentFit="scale-down" />

                {/* Nome */}
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    {/* <Text style={styles.description}>{item.description}</Text> */}
                </View>

                {/* Valor e Disponibilidade */}
                <View style={styles.footer}>
                    <Text style={styles.value}>USD$ {item.price.toFixed(2)}</Text>
                    <Text style={styles.type}>{item.type}</Text>
                    <Text style={[styles.status, item.disponible ? styles.available : styles.unavailable]}>
                        {item.disponible ? "Disponible" : "Undisponible"}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}


const styles = StyleSheet.create({
    container: {
        width: "90%",
        backgroundColor: cssVar.color.darkGray,
        borderRadius: 10,
        padding: RFValue(10),
        marginVertical: RFValue(8),
        alignItems: "center",
        shadowColor: cssVar.color.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    },
    image: {
        width: "100%",
        height: RFValue(120),
        borderRadius: 8
    },
    textContainer: {
        marginTop: RFValue(10),
        alignItems: "center"
    },
    name: {
        fontSize: RFValue(16),
        fontWeight: "bold",
        color: cssVar.color.white
    },
    description: {
        fontSize: RFValue(12),
        color: cssVar.color.lightGray,
        textAlign: "center",
        marginTop: RFValue(4)
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: RFValue(10)
    },
    value: {
        fontSize: RFValue(14),
        fontWeight: "bold",
        color: cssVar.color.green
    },
    type: {
        fontSize: RFValue(14),
        fontWeight: "bold",
        color: cssVar.color.yellow
    },
    status: {
        fontSize: RFValue(12),
        fontWeight: "bold",
        paddingVertical: RFValue(4),
        paddingHorizontal: RFValue(8),
        borderRadius: 4
    },
    available: {
        color: cssVar.color.lightGreen,
        backgroundColor: cssVar.color.darkGreen
    },
    unavailable: {
        color: cssVar.color.red,
        backgroundColor: cssVar.color.darkRed
    },
    link: {
        width: "100%",
        textDecorationLine: "none"
    }
});
