import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useGetProductById } from '@/hooks/service/get/useGetProductById';
import useBasketStore from '@/hooks/useBasketStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Dropdown from 'react-native-input-select';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Details() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const { isPending, error, data, isFetching, isRefetching, isLoading, refetch, isSuccess } =
    useGetProductById(id as string);

  const state = useBasketStore(state => state);

  useEffect(() => {
    if (error) {
      console.error('Error fetching product details:', error);
      Alert.alert('Erro', `Falha ao carregar detalhes`, [
        {
          text: 'Tentar novamente',
          onPress: () => refetch(),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }
  }, [error, refetch]);

  const handleAddProduct = () => {
    if (state && !state.customer_id) {
      Alert.alert('Erro', `Falha ao adicionar: informações do cliente indisponíveis`, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }
    if (data && !data.disponible) {
      Alert.alert('Erro', `Falha ao adicionar: produto indisponível`, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }

    if (!quantity) {
      setQuantityError(true);
      setTimeout(() => setQuantityError(false), 3000);
      return;
    }

    if (data && data.id && state.customer_id) {
      const existingProduct = state.products.find(_product => _product.id === data.id);
      if (!existingProduct) {
        const newProduct = {
          ...data,
          quantity: quantity,
          total_price: 0,
          customer_id: state.customer_id,
        };
        state.addProduct(newProduct);
        Alert.alert('Sucesso', `Produto ${data.name} adicionado ao carrinho com sucesso!`, [
          { text: 'OK', style: 'cancel' },
        ]);
      } else {
        const updatedProduct = {
          ...existingProduct,
          quantity: quantity + existingProduct.quantity,
          total_price: 0,
          customer_id: existingProduct.customer_id,
        };
        Alert.alert(
          'Aviso',
          `Produto ${data.name} já consta no carrinho! Deseja atualizar a quantidade?`,
          [
            {
              text: 'OK',
              style: 'default',
              onPress: () => state.updateProduct(data.id, updatedProduct),
            },
            { text: 'Cancelar', style: 'cancel' },
          ]
        );
      }
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os produtos', [
        {
          text: 'OK',
          onPress: () => router.push('/home'),
          style: 'cancel',
        },
      ]);
    }
  }, [error, router]);

  const getHeaderTitle = (): string => {
    if (data && data.name) {
      const nameParts = data.name.split(' ');
      if (nameParts.length > 2) {
        return `${nameParts[0]} ${nameParts[1]} ${nameParts[2]}`;
      }
      if (nameParts.length === 2) {
        return `${nameParts[0]} ${nameParts[1]}`;
      }
      if (nameParts.length === 1) {
        return nameParts[0];
      }
    }
    return '';
  };

  return data && data.id ? (
    <Page type="scrollView" customStyle={{}}>
      <Stack.Screen
        options={{
          title: getHeaderTitle(),
          headerStyle: { backgroundColor: cssVar.color.black },
          headerTitleStyle: { color: cssVar.color.highlight },
          animation: 'fade',
          headerTintColor: cssVar.color.white,
          headerShown: true,
          headerLeft: () => null,
          contentStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            alignContent: 'center',
          },
          headerRight: () => <ButtonUser />,
        }}
      />
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <ScrollView style={styles.card}>
        <Image source={{ uri: data.source }} style={styles.image} contentFit="contain" />
        <View style={styles.info}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.description}>{data.description}</Text>
          <Text style={styles.type}>Tipo: {data.type}</Text>
          <Text style={styles.type}>Teor alcoólico: {data.alcohol_content}%</Text>
          {data.ibu > 0 && <Text style={styles.type}>IBU: {data.ibu}</Text>}
          <Text style={styles.type}>Volume: {data.volume}ml</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Preço:</Text>
            <Text style={styles.price}>R$ {data.price.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Quantidade:</Text>
            <Text style={styles.quantity}>{quantity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.totalPrice}>R$ {(data.price * quantity).toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            label="Quantidade"
            placeholder="Selecione a quantidade..."
            isMultiple={false}
            maxSelectableItems={1}
            error={quantityError ? 'Este campo é obrigatório' : ''}
            options={[
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '4', value: 4 },
              { label: '5', value: 5 },
              { label: '6', value: 6 },
              { label: '7', value: 7 },
              { label: '8', value: 8 },
              { label: '9', value: 9 },
              { label: '10', value: 10 },
            ]}
            selectedValue={quantity}
            onValueChange={value => setQuantity(value as number)}
            primaryColor={cssVar.color.greenLight}
            dropdownStyle={{
              backgroundColor: cssVar.color.darkGray,
              borderColor: cssVar.color.highlight,
            }}
            dropdownIconStyle={{ top: 15, right: 20 }}
            dropdownIcon={<MaterialIcons name="keyboard-arrow-down" size={30} color="white" />}
            labelStyle={{
              color: cssVar.color.white,
              fontSize: 15,
              fontWeight: '500',
            }}
            selectedItemStyle={{ color: cssVar.color.white }}
          />
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>
    </Page>
  ) : null;
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '90%',
    flex: 1,
    backgroundColor: cssVar.color.gray,
    borderRadius: 0,
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    padding: 3,
    paddingTop: 7,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: cssVar.color.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
    marginBottom: 10,
    textAlign: 'center',
  },
  type: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: cssVar.color.veryLightGray,
    marginBottom: 10,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
    fontWeight: '600',
  },
  price: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.greenLight,
  },
  quantity: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.orange,
  },
  totalPrice: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.blue,
  },
  dropdownContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  text: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  link: {
    width: 'auto',
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
