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
      // Este catch só vai pegar erros de rede, não os erros já tratados pelo TanStack Query
      console.error('Erro não tratado:', error);
    }
  }, [type, text, queryProducts, router]);

  // Efeito para fazer a chamada inicial - executa apenas uma vez quando o componente monta
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Efeito separado para lidar com erros da mutation
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
    <Page
      type="view"
      customStyle={{ opacity: 0.9, filter: 'grayscale(90%)' }}
      blurSettings={{ intensity: 50, tint: 'systemUltraThinMaterialDark', radius: 0 }}
    >
      {isPending && <CustomBackdrop isOpen={true} />}

      <Stack.Screen
        options={{
          title: typeof text === 'string' ? text : 'Bebidas',
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

      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={product => product.id.toString()}
        renderItem={({ item }) => <Product {...item} />}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 0,
  },
  text: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  link: {
    width: 'auto',
  },
  list: {
    marginTop: 20,
    marginBottom: 20,
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
