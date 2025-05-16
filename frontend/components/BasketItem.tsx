import { cssVar } from "@/constants/css";
import { ProductBasketProps } from "@/interfaces/Product.interface";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface BasketItemProps {
    product: ProductBasketProps;
    index: number;
    removeProduct: (product: ProductBasketProps) => void;
    updateProduct: (id: string, product: ProductBasketProps) => void
}

export default function BasketItem({ product, index, removeProduct, updateProduct }: BasketItemProps) {

    const handleIncrement = () => {
        updateProduct(product.id, {
            ...product,
            quantity: product.quantity + 1,
        });
    };

    const handleDecrement = () => {
        if (product.quantity > 1) {
            updateProduct(product.id, {
                ...product,
                quantity: product.quantity - 1,
            });
        } else {
            removeProduct(product);
        }
    };

    const handleRemove = () => {
        removeProduct(product);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.index}>{index + 1}</Text>
            <Image source={{ uri: product.source }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.quantity}>Quantidade: {product.quantity}</Text>
                <Text style={styles.price}>Preço: BRL$ {product.price.toFixed(2)}</Text>
                <Text style={styles.totalPrice}>
                    Total: BRL$ {product.total_price.toFixed(2)}
                </Text>
            </View>
            <View style={styles.actions}>
                <View style={styles.updateActions}>
                    <TouchableOpacity onPress={handleIncrement} style={styles.button}>
                        <AntDesign name="pluscircleo" size={24} color={cssVar.color.darkLime} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDecrement} style={styles.button}>
                        <AntDesign name="minuscircleo" size={24} color={cssVar.color.darkLime} />
                    </TouchableOpacity>
                </View>
                <View style={styles.removeActions}>
                    <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
                        <Ionicons name="trash" size={24} color={cssVar.color.red} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        padding: 5,
        backgroundColor: cssVar.color.white,
        borderRadius: 0,
        shadowColor: cssVar.color.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    index: {
        fontSize: RFValue(16),
        fontWeight: "bold",
        marginRight: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: RFValue(14),
        fontWeight: "bold",
        marginBottom: 5,
    },
    quantity: {
        fontSize: RFValue(12),
        color: "#555",
    },
    price: {
        fontSize: RFValue(12),
        color: "#555",
    },
    totalPrice: {
        fontSize: RFValue(12),
        fontWeight: "bold",
        color: "#333",
        marginTop: 5,
    },
    actions: {
        flexDirection: "column",
    },
    updateActions: {
        flexDirection: "row",
        flex: 1,
    },
    removeActions: {
        flexDirection: "row",
        flex: 0,
        alignSelf: 'flex-end'
    },
    button: {
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: cssVar.color.white,
        fontSize: RFValue(14),
        fontWeight: "bold",
    },
    removeButton: {
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: cssVar.color.white,
        fontSize: RFValue(12),
        fontWeight: "bold",
    },
});