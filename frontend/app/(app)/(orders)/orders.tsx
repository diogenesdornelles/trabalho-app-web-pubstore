import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import OrderItem from '@/components/OrderItem';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import useBasketStore from '@/hooks/useBasketStore';
import { Stack } from 'expo-router';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useEffect } from 'react';
import { useGetOrdersById } from '@/hooks/service/get/useGetOrdersById';

export default function Orders() {
  const state = useBasketStore(state => state);
  const { isPending, error, data, isFetching, isRefetching, isLoading, refetch, isSuccess } =
    useGetOrdersById(state.customer_id as string);

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
    <Page
      customStyle={{
        display: 'flex',
        flexDirection: 'row',
        opacity: 0.8,
        filter: 'grayscale(80%)',
      }}
      blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 4 }}
    >
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <Stack.Screen
        options={{
          title: 'Pedidos',
          headerStyle: { backgroundColor: cssVar.color.black },
          headerTitleStyle: { color: cssVar.color.highlight },
          animation: 'fade',
          headerTintColor: cssVar.color.white,
          headerShown: true,
          contentStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            alignContent: 'center',
          },
          headerRight: () => <ButtonUser />,
        }}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Lista</Text>
        {data ? (
          <>
            <FlatList
              style={styles.list}
              data={data}
              keyExtractor={product => product.id.toString()}
              renderItem={({ item, index }) => <OrderItem order={item} index={index} />}
            />
          </>
        ) : (
          <Text style={styles.noProducts}>Nenhum produto encontrado</Text>
        )}
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
    paddingTop: 4,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
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
    marginTop: 100,
  },
  button: {
    backgroundColor: cssVar.color.highlight,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 15,
    marginBottom: 40,
    borderRadius: 5,
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
    marginTop: 0,
  },
  textHeader: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  linkHeader: {
    width: 'auto',
  },
});
