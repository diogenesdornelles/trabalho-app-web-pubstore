import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import Product from '@/components/Product';
import { cssVar } from '@/constants/css';
import { ProductBasketProps } from '@/domain/interfaces/Product.interface';
import { useCreateQueryProducts } from '@/hooks/service/post/useCreateQueryProducts';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo } from 'react';
import { Alert, StatusBar, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

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

  const screenOptions = useMemo(
    () => ({
      title: typeof text === 'string' ? text : 'Bebidas',
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
    [text]
  );

  return (
    <Page>
      {isPending && <CustomBackdrop isOpen={true} />}
      <StatusBar
        barStyle="light-content"
        backgroundColor={cssVar.color.black}
        translucent={false}
      />
      <Stack.Screen options={screenOptions} />

      <FlashList
        data={data}
        keyExtractor={(product, index) => `${product.id}-${index}-${product.name}`}
        renderItem={({ item }) => <Product {...item} />}
        estimatedItemSize={200}
        contentContainerStyle={styles.itemsList}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  itemsList: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
