import BasketItem from "@/components/BasketItem";
import ButtonUser from "@/components/ButtonUser";
import CustomBackdrop from "@/components/CustomBackdrop";
import Page from "@/components/Page";
import { cssVar } from "@/constants/css";
import useBasketStore from "@/hooks/useBasketStore";
import { useCreateOrder } from "@/hooks/useOrder";
import { useCreateProductOrdered } from "@/hooks/useProductOrdered";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


export default function Basket() {
    const state = useBasketStore((state) => state);
    const router = useRouter();
    const queryCreateOrderMutation = useCreateOrder();
    const queryCreateProdutOrderedMutation = useCreateProductOrdered();

    const { data: orderData,
        isPending: isPendingOrderData,
        mutateAsync: createOrder,
        isError: isErrorOrderData, error: errorOrderData } = queryCreateOrderMutation;
    const { data: productData,
        isPending: isPendingProductData,
        mutateAsync: createProductOrdered,
        isError: isErrorProductData, error: errorProductData } = queryCreateProdutOrderedMutation;

    const handleMakeOrder = async () => {
        if (state.products.length === 0) {
            Alert.alert("Sem produtos", "Por favor, adicione produtos ao seu carrinho antes de fazer um pedido.");
            return;
        }

        if (isPendingOrderData || isPendingProductData) {
            Alert.alert("Processando", "Seu pedido está sendo processado. Por favor, aguarde.");
            return;
        }

        if (!state.customer_id) {
            Alert.alert("Sem cliente", "Por favor, selecione um cliente antes de fazer um pedido.");
            return;
        }
        try {
            // Cria o pedido e aguarda a resposta
            const orderResponse = await createOrder({
                customer_id: state.customer_id
            });

            console.log("Order created successfully:", orderResponse);

            if (state.products.length > 0) {
                // Usa diretamente o mutateAsync como Promise para cada produto
                const productPromises = state.products.map(product =>
                    createProductOrdered({
                        product_id: product.id,
                        order_id: orderResponse.id,
                        quantity: product.quantity,
                    })
                );

                // Aguarda todas as promessas concluírem
                await Promise.all(productPromises);

                Alert.alert(
                    'Sucesso',
                    'Seu pedido foi realizado com sucesso! Faça o pagamento para concluir o pedido.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                router.push('/home');
                                state.clear();
                            },
                            style: 'default',
                        },
                    ]
                );
            }
        } catch (error) {
            console.error("Error during order process:", error);
            Alert.alert(
                'Erro',
                'Falha ao processar seu pedido. Por favor, tente novamente.'
            );
        }
    };

    useEffect(() => {
        if (isErrorOrderData) {
            console.error("Error creating order:", errorOrderData);
            Alert.alert(
                'Erro',
                `Ocorreu um erro ao criar seu pedido`,
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ]
            );
        }
    }, [isErrorOrderData, errorOrderData]);

    useEffect(() => {
        if (isErrorProductData) {
            console.error("Error creating product ordered:", errorProductData);
            Alert.alert(
                'Erro',
                `Ocorreu um erro ao adicionar produtos ao seu pedido`,
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ]
            );
        }
    }, [isErrorProductData, errorProductData]);

    return (
        <Page customStyle={{ display: 'flex', flexDirection: 'row', opacity: .8, filter: 'grayscale(80%)' }} blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 4 }} >
            {(isPendingOrderData || isPendingProductData) && <CustomBackdrop isOpen={true} />}
            <Stack.Screen
                options={{
                    title: 'Carrinho',
                    headerStyle: { backgroundColor: cssVar.color.black },
                    headerTitleStyle: { color: cssVar.color.highlight, },
                    animation: 'fade',
                    headerTintColor: cssVar.color.white,
                    headerShown: true,
                    contentStyle: {
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        alignContent: 'center'
                    },
                    headerRight: () => <ButtonUser />
                }}
            />
            <View style={styles.card}>
                <Text style={styles.title}>Produtos</Text>

                {state.products.length > 0 ? (<>
                    <FlatList
                        style={styles.list}
                        data={state.products}
                        keyExtractor={(product) => product.id.toString()}
                        renderItem={({ item, index }) => <BasketItem product={item} index={index} removeProduct={state.removeProduct} updateProduct={state.updateProduct} />}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalValue}>R$ {state.total_value?.toFixed(2) || "0,00"}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleMakeOrder}>
                        <Text style={styles.buttonText}>Fazer Pedido</Text>
                    </TouchableOpacity>

                </>)
                    : (<Text style={styles.noProducts}>Nenhum produto encontrado</Text>)}
            </View>

        </Page>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        flex: 1,
        maxHeight: '95%',
        backgroundColor: cssVar.color.darkGray,
        borderRadius: 0,
        shadowColor: cssVar.color.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
        padding: 2,
        paddingTop: 4
    },
    list: {
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: RFValue(24),
        fontWeight: 'bold',
        color: cssVar.color.highlight,
        marginBottom: 0,
        textAlign: 'center',
    },
    noProducts: {
        fontSize: RFValue(14),
        color: cssVar.color.veryLightGray,
        alignSelf: 'center',
        fontWeight: '600',
        marginTop: 100
    },
    button: {
        backgroundColor: cssVar.color.highlight,
        paddingVertical: 12,
        alignItems: 'center',
        margin: 15,
        marginBottom: 40,
        borderRadius: 5
    },
    buttonText: {
        color: cssVar.color.black,
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    buttonHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10,
        marginTop: 0
    },
    textHeader: {
        color: cssVar.color.white,
        fontSize: 20
    },
    linkHeader: {
        width: 'auto'
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: cssVar.color.highlight + '40',
        marginHorizontal: 10,
    },
    totalLabel: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: cssVar.color.veryLightGray,
    },
    totalValue: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: cssVar.color.highlight,
    },
});