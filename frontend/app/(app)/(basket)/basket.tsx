import BasketItem from '@/components/BasketItem';
import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useCreateOrder } from '@/hooks/service/post/useCreateOrder';
import { useCreateProductOrdered } from '@/hooks/service/post/useCreateProductOrdered';
import useBasketStore from '@/hooks/useBasketStore';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { RFValue } from 'react-native-responsive-fontsize';

import { useQueryClient } from '@tanstack/react-query';
import CustomHeader from '@/components/CustomHeader';

export default function Basket() {
  const state = useBasketStore(state => state);
  const queryClient = useQueryClient();
  const router = useRouter();
  const queryCreateOrderMutation = useCreateOrder();
  const queryCreateProdutOrderedMutation = useCreateProductOrdered();

  const {
    isPending: isPendingOrderData,
    mutateAsync: createOrder,
    isError: isErrorOrderData,
    error: errorOrderData,
  } = queryCreateOrderMutation;
  const {
    isPending: isPendingProductData,
    mutateAsync: createProductOrdered,
    isError: isErrorProductData,
    error: errorProductData,
  } = queryCreateProdutOrderedMutation;

  const handleMakeOrder = async () => {
    if (state.products.length === 0) {
      Alert.alert(
        'Sem produtos',
        'Por favor, adicione produtos ao seu carrinho antes de fazer um pedido.',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ]
      );
      return;
    }

    if (!state.customer_id) {
      Alert.alert('Sem cliente', 'Por favor, selecione um cliente antes de fazer um pedido.', [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
      return;
    }
    try {
      const orderResponse = await createOrder({
        customer_id: state.customer_id,
      });

      console.log('Order created successfully:', orderResponse);

      if (state.products.length > 0) {
        const productPromises = state.products.map(product =>
          createProductOrdered({
            product_id: product.id,
            order_id: orderResponse.id,
            quantity: product.quantity,
          })
        );

        const result = await Promise.all(productPromises);

        if (result && result.length > 0) {
          console.log('Products ordered successfully:', result);
          queryClient.invalidateQueries({
            queryKey: ['orders'],
            exact: false,
          });

          Alert.alert(
            'Sucesso',
            'Seu pedido foi realizado com sucesso! Faça o pagamento para concluir o pedido.',
            [
              {
                text: 'OK',
                onPress: () => {
                  router.push('/orders');
                  state.clear();
                },
                style: 'default',
              },
            ]
          );
        } else {
          Alert.alert('Erro', 'Falha ao processar seu pedido. Por favor, tente novamente.');
        }
      }
    } catch (error) {
      console.error('Error during order process:', error);
      Alert.alert('Erro', 'Falha ao processar seu pedido. Por favor, tente novamente.');
    }
  };

  useEffect(() => {
    if (isErrorOrderData) {
      console.error('Error creating order:', errorOrderData);
      Alert.alert('Erro', `Ocorreu um erro ao criar seu pedido`, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  }, [isErrorOrderData, errorOrderData]);

  useEffect(() => {
    if (isErrorProductData) {
      console.error('Error creating product ordered:', errorProductData);
      Alert.alert('Erro', `Ocorreu um erro ao adicionar produtos ao seu pedido`, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  }, [isErrorProductData, errorProductData]);

  return (
    <Page header={<CustomHeader title="Cesta" />} type="view">
      {(isPendingOrderData || isPendingProductData) && <CustomBackdrop isOpen={true} />}
      <View style={styles.basketCard}>
        <Text style={styles.basketTitle}>Produtos</Text>
        {state.products.length > 0 ? (
          <>
            <FlashList
              data={state.products}
              keyExtractor={(product, index) =>
                `${product.id}-${index}-${product.quantity}-${product.name}`
              }
              renderItem={({ item, index }) => (
                <BasketItem
                  product={item}
                  index={index}
                  removeProduct={state.removeProduct}
                  updateProduct={state.updateProduct}
                />
              )}
              estimatedItemSize={125}
              contentContainerStyle={styles.basketListContent}
            />
            <View style={styles.basketTotalContainer}>
              <Text style={styles.basketTotalLabel}>Total:</Text>
              <Text style={styles.basketTotalValue}>
                R$ {state.total_value?.toFixed(2) || '0,00'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.basketButton}
              activeOpacity={0.7}
              onPress={handleMakeOrder}
            >
              <Text style={styles.basketButtonText}>Fazer Pedido</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.basketNoProducts}>Nenhum produto encontrado</Text>
        )}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  basketCard: {
    width: '100%',
    flex: 1,
    backgroundColor: cssVar.color.darkGray,
    borderRadius: 0,
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    padding: 2,
    paddingTop: 4,
  },
  basketListContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  basketTitle: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
    marginBottom: 0,
    textAlign: 'center',
  },
  basketNoProducts: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: 100,
  },
  basketButton: {
    backgroundColor: cssVar.color.highlight,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 15,
    marginBottom: 40,
    borderRadius: 5,
  },
  basketButtonText: {
    color: cssVar.color.black,
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  basketButtonHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 0,
  },
  basketTextHeader: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  basketLinkHeader: {
    width: 'auto',
  },
  basketTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: cssVar.color.highlight + '40',
    marginHorizontal: 10,
  },
  basketTotalLabel: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: cssVar.color.veryLightGray,
  },
  basketTotalValue: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
  },
});
