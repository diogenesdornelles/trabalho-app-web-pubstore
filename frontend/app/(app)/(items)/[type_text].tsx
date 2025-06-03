import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import Product from '@/components/Product';
import { cssVar } from '@/constants/css';
import { ProductBasketProps } from '@/domain/interfaces/Product.interface';
import { useCreateQueryProducts } from '@/hooks/service/post/useCreateQueryProducts';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';

export default function Items() {
  const router = useRouter();
  const { type_text } = useLocalSearchParams();

  const [type, text] = typeof type_text === 'string' ? type_text.split('_') : ['beer', 'Cervejas'];

  const queryProductsMutation = useCreateQueryProducts();
  const { data, isPending, isError, error, mutateAsync: queryProducts } = queryProductsMutation;

  const fetchProducts = useCallback(async () => {
    if (!type || !text) {
      Alert.alert('Erro', 'Tipo de produto inválido', [
        {
          text: 'OK',
          onPress: () => router.push('/home'),
          style: 'cancel',
        },
      ]);
      return;
    }

    try {
      await queryProducts({
        product_type: type as ProductBasketProps['type'],
      });
    } catch (error) {
      console.error('Erro não tratado:', error);
    }
  }, [type, text, queryProducts, router]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (isError) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', `Ocorreu um erro ao buscar os produtos`, [
        {
          text: 'OK',
          onPress: () => router.push('/home'),
          style: 'cancel',
        },
      ]);
    }
  }, [isError, error, router]);

  return (
    <Page>
      {isPending && <CustomBackdrop isOpen={true} />}

      <Stack.Screen
        options={{
          title: typeof text === 'string' ? text : 'Bebidas',
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

      <FlatList
        style={styles.itemsList}
        data={data}
        keyExtractor={product => product.id.toString()}
        renderItem={({ item }) => <Product {...item} />}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  itemsList: {
    marginTop: 20,
    marginBottom: 20,
  },
});
