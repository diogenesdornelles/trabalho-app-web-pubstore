import CustomBackdrop from '@/components/CustomBackdrop';
import CustomHeader from '@/components/CustomHeader';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useGetProductById } from '@/hooks/service/get/useGetProductById';
import useBasketStore from '@/hooks/useBasketStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Dropdown from 'react-native-input-select';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Details() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const { isPending, error, data, isFetching, isRefetching, isLoading, refetch } =
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
        Alert.alert('Sucesso', `Produto ${data.name} adicionado ao carrinho com sucesso!`, [
          { text: 'Cancelar', style: 'cancel', onPress: () => {} },
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => {
              const newProduct = {
                ...data,
                quantity: quantity,
                total_price: 0,
                customer_id: state.customer_id,
              };
              state.addProduct(newProduct);
            },
          },
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
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'OK',
              style: 'default',
              onPress: () => state.updateProduct(data.id, updatedProduct),
            },
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

  return data && data.id ? (
    <Page header={<CustomHeader title="Detalhes" />} type="view">
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <ScrollView style={styles.detailsCard}>
        <Image source={{ uri: data.source }} style={styles.detailsImage} contentFit="contain" />
        <View style={styles.detailsInfo}>
          <Text style={styles.detailsName}>{data.name}</Text>
          <Text style={styles.detailsDescription}>{data.description}</Text>
          <Text style={styles.detailsText}>Tipo: {data.type}</Text>
          <Text style={styles.detailsText}>Teor alcoólico: {data.alcohol_content}%</Text>
          {data.ibu > 0 && <Text style={styles.detailsText}>IBU: {data.ibu}</Text>}
          <Text style={styles.detailsText}>Volume: {data.volume}ml</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Preço:</Text>
            <Text style={styles.detailsPrice}>R$ {data.price.toFixed(2)}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Quantidade:</Text>
            <Text style={styles.detailsQuantity}>{quantity}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsLabel}>Total:</Text>
            <Text style={styles.detailsTotalPrice}>R$ {(data.price * quantity).toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.detailsDropdownContainer}>
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
        <TouchableOpacity
          style={styles.detailsButton}
          activeOpacity={0.7}
          onPress={handleAddProduct}
        >
          <Text style={styles.detailsButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>
    </Page>
  ) : null;
}
const styles = StyleSheet.create({
  detailsCard: {
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
  detailsImage: {
    width: '100%',
    height: 200,
  },
  detailsInfo: {
    padding: 15,
  },
  detailsName: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: cssVar.color.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  detailsDescription: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
    marginBottom: 10,
    textAlign: 'center',
  },
  detailsText: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: cssVar.color.veryLightGray,
    marginBottom: 10,
    textAlign: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailsLabel: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
    fontWeight: '600',
  },
  detailsPrice: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.greenLight,
  },
  detailsQuantity: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.orange,
  },
  detailsTotalPrice: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.blue,
  },
  detailsDropdownContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  detailsButton: {
    backgroundColor: cssVar.color.highlight,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 15,
    marginBottom: 40,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: cssVar.color.black,
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  detailsLink: {
    width: 'auto',
  },
  detailsButtonHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 0,
  },
  detailsTextHeader: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  detailsLinkHeader: {
    width: 'auto',
  },
});
