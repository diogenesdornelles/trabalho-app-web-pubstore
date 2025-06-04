import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import OrderItem from '@/components/OrderItem';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useGetOrdersByCustomerId } from '@/hooks/service/get/useGetOrdersByCustomerId';
import useBasketStore from '@/hooks/useBasketStore';
import { Stack } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Orders() {
  const state = useBasketStore(state => state);
  const { isPending, error, data, isFetching, isRefetching, isLoading, refetch } =
    useGetOrdersByCustomerId(state.customer_id as string);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Erro',
        `Falha ao carregar pedidos: ${error.message || 'Ocorreu um erro desconhecido'}`,
        [
          {
            text: 'Tentar novamente',
            onPress: () => refetch(),
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    }
  }, [error, refetch]);

  const screenOptions = useMemo(
    () => ({
      title: 'Pedidos',
      headerStyle: { backgroundColor: cssVar.color.black },
      headerTitleStyle: { color: cssVar.color.highlight },
      animation: 'fade' as const,
      headerTintColor: cssVar.color.white,
      headerShown: true,
      headerBackVisible: false,
      headerLeft: () => null,
      contentStyle: {
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
        alignItems: 'baseline' as const,
        alignContent: 'center' as const,
      },
      headerRight: () => <ButtonUser />,
    }),
    []
  );

  const renderOrderItem = ({ item, index }: { item: any; index: number }) => (
    <OrderItem order={item} index={index} />
  );

  return (
    <Page>
      <StatusBar
        barStyle="light-content"
        backgroundColor={cssVar.color.black}
        translucent={false}
      />
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <Stack.Screen options={screenOptions} />
      <View style={styles.ordersCard}>
        <Text style={styles.ordersTitle}>Lista</Text>
        {data && data.length > 0 ? (
          <FlashList
            data={data}
            keyExtractor={(order, index) =>
              `${order.id}-${index}-${order.created_at.toString()}-${order.ordered_products.length}`
            }
            renderItem={renderOrderItem}
            estimatedItemSize={150}
            contentContainerStyle={styles.ordersListContent}
          />
        ) : (
          <Text style={styles.ordersNoOrders}>Nenhum pedido encontrado</Text>
        )}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  ordersCard: {
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
  ordersListContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  ordersTitle: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
    marginBottom: 0,
    textAlign: 'center',
  },
  ordersNoOrders: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: 100,
  },
});
