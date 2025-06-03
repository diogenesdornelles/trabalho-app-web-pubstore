import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import OrderItem from '@/components/OrderItem';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useGetOrdersByCustomerId } from '@/hooks/service/get/useGetOrdersByCustomerId';
import useBasketStore from '@/hooks/useBasketStore';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
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

  return (
    <Page>
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <Stack.Screen
        options={{
          title: 'Pedidos',
          headerStyle: { backgroundColor: cssVar.color.black },
          headerTitleStyle: { color: cssVar.color.highlight },
          animation: 'fade',
          headerTintColor: cssVar.color.white,
          headerShown: true,
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
          contentStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            alignContent: 'center',
          },
          headerRight: () => <ButtonUser />,
        }}
      />
      <View style={styles.ordersCard}>
        <Text style={styles.ordersTitle}>Lista</Text>
        {data ? (
          <>
            <FlatList
              style={styles.ordersList}
              data={data}
              keyExtractor={product => product.id.toString()}
              renderItem={({ item, index }) => <OrderItem order={item} index={index} />}
            />
          </>
        ) : (
          <Text style={styles.ordersNoOrders}>Nenhum produto encontrado</Text>
        )}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  ordersCard: {
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
    paddingTop: 4,
  },
  ordersList: {
    marginTop: 10,
    marginBottom: 10,
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
