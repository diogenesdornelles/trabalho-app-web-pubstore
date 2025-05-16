import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Image } from 'expo-image';
import { cssVar } from "@/constants/css";
import useBasketStore from "@/hooks/useBasketStore";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ProductProps } from "@/interfaces/Product.interface";


export default function Product(item: ProductProps): React.ReactElement {
    const state = useBasketStore((state) => state);

    const handleAddToBasket = () => {
        if (!item.disponible) {
            Alert.alert(
                "Error",
                `Failed to add: indisponible product`,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
            return
        }
        if (state && !state.customer_id) {
            Alert.alert(
                "Error",
                `Failed to add: indisponible customer info`,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
            return
        }
        state.addProduct({ ...item, customer_id: state.customer_id, total_price: 0, quantity: 1 });
    }

    return (
        <Link
            href={{
                pathname: '/(app)/(details)/[id]',
                params: { id: item.id }
            }}
            style={[styles.link, { marginHorizontal: 'auto', marginBottom: 30 }]}
            asChild
        >
            <TouchableOpacity
                style={styles.container}
                activeOpacity={.7}
                disabled={!item.disponible}
                onPress={() => { if (!item.disponible) alert('Product not disponible'); }}
            >
                <Image source={item.source} style={styles.image} contentFit="scale-down" />
                <View style={styles.textContainer}>
                    {!item.disponible && (
                        <SimpleLineIcons name="basket" size={RFValue(20)} color={cssVar.color.darkRed} onPress={handleAddToBasket} />
                    )}
                    <Text style={styles.name}>{item.name}</Text>
                </View>
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
        width: "95%",
        backgroundColor: cssVar.color.backgroundDark,
        borderRadius: 5,
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
        borderRadius: 5
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
        color: cssVar.color.greenLight
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
        borderRadius: 5
    },
    available: {
        color: cssVar.color.white,
        backgroundColor: cssVar.color.greenMedium
    },
    unavailable: {
        color: cssVar.color.white,
        backgroundColor: cssVar.color.darkRed
    },
    link: {
        width: "100%",
        textDecorationLine: "none"
    }
});
