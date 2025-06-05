import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import Product from '@/components/Product';
import { ProductBasketProps } from '@/domain/interfaces/Product.interface';
import { useCreateQueryProducts } from '@/hooks/service/post/useCreateQueryProducts';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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

  return (
    <Page>
      {isPending && <CustomBackdrop isOpen={true} />}
      <View style={styles.itemsContainer}>
        <FlashList
          data={data}
          keyExtractor={(product, index) => `${product.id}-${index}-${product.name}`}
          renderItem={({ item }) => <Product {...item} />}
          estimatedItemSize={200}
          contentContainerStyle={styles.itemsList}
        />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    flex: 1,
    width: '100%',
  },
  itemsList: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});
