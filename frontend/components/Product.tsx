import { cssVar } from '@/constants/css';
import { ProductProps } from '@/domain/interfaces/Product.interface';
import useBasketStore from '@/hooks/useBasketStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import ToolTip from './ToolTip';

export default function Product(item: ProductProps): React.ReactElement {
  const state = useBasketStore(state => state);

  const handleAddToBasket = (e: any) => {
    e.stopPropagation();

    if (!item.disponible) {
      Alert.alert('Erro', `Falha ao adicionar: produto indisponível`, [
        { text: 'OK', style: 'cancel' },
      ]);
      return;
    }

    if (state && !state.customer_id) {
      Alert.alert('Erro', `Falha ao adicionar: informações do cliente indisponíveis`, [
        { text: 'OK', style: 'cancel' },
      ]);
      return;
    }

    const existingProduct = state.products.find(_product => _product.id === item.id);

    if (!existingProduct) {
      Alert.alert('Sucesso', `Produto ${item.name} adicionado ao carrinho com sucesso!`, [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          style: 'default',
          onPress: () => {
            state.addProduct({
              ...item,
              quantity: 1,
              total_price: 0,
              customer_id: state.customer_id,
            });
          },
        },
      ]);
    } else {
      Alert.alert(
        'Aviso',
        `Produto ${item.name} já consta no carrinho! Deseja atualizar a quantidade?`,
        [
          {
            text: 'OK',
            style: 'default',
            onPress: () =>
              state.updateProduct(existingProduct.id, {
                ...existingProduct,
                quantity: existingProduct.quantity + 1,
                total_price: 0,
                customer_id: existingProduct.customer_id,
              }),
          },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <View style={styles.productWrapper}>
      <Link
        href={{
          pathname: '/(app)/(details)/[id]',
          params: { id: item.id },
        }}
        style={[styles.productLink, { marginBottom: 30 }]}
        asChild
      >
        <TouchableOpacity
          style={styles.productContainer}
          activeOpacity={0.7}
          disabled={!item.disponible}
        >
          <Image source={item.source} style={styles.productImage} contentFit="scale-down" />
          <View style={styles.productTextContainer}>
            <Text style={styles.productName}>{item.name}</Text>
          </View>
          <View style={styles.productFooter}>
            <Text style={styles.productValue}>R$ {item.price.toFixed(2)}</Text>
            <Text style={styles.productType}>{item.type}</Text>
            <Text
              style={[
                styles.productStatus,
                item.disponible ? styles.productAvailable : styles.productUnavailable,
              ]}
            >
              {item.disponible ? 'Disponível' : 'Indisponível'}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
      {item.disponible && (
        <TouchableOpacity
          style={styles.productBasketButton}
          onPress={handleAddToBasket}
          activeOpacity={0.7}
        >
          <View style={styles.productPlusBadge}>
            <AntDesign name="plus" size={RFValue(12)} color="white" />
          </View>
          <SimpleLineIcons name="basket" size={RFValue(24)} color={cssVar.color.highlight} />
        </TouchableOpacity>
      )}
      <ToolTip text="Detalhes" top={15} left={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  productWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginVertical: RFValue(8),
  },
  productBasketButton: {
    position: 'absolute',
    top: RFValue(10),
    right: RFValue(10),
    zIndex: 10,
    padding: RFValue(8),
  },
  productPlusBadge: {
    position: 'absolute',
    top: RFValue(0),
    right: RFValue(0),
    backgroundColor: 'red',
    borderRadius: RFValue(10),
    width: RFValue(20),
    height: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  productContainer: {
    width: '95%',
    backgroundColor: cssVar.color.backgroundDark,
    borderRadius: 5,
    padding: RFValue(10),
    alignItems: 'center',
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: RFValue(120),
    borderRadius: 5,
  },
  productTextContainer: {
    marginTop: RFValue(10),
    alignItems: 'center',
  },
  productName: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: cssVar.color.white,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: RFValue(10),
  },
  productValue: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.greenLight,
  },
  productType: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.yellow,
  },
  productStatus: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    paddingVertical: RFValue(4),
    paddingHorizontal: RFValue(8),
    borderRadius: 5,
  },
  productAvailable: {
    color: cssVar.color.white,
    backgroundColor: cssVar.color.greenMedium,
  },
  productUnavailable: {
    color: cssVar.color.white,
    backgroundColor: cssVar.color.darkRed,
  },
  productLink: {
    width: '100%',
    textDecorationLine: 'none',
  },
});
