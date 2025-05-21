import { cssVar } from '@/constants/css';
import { ProductProps } from '@/domain/interfaces/Product.interface';
import useBasketStore from '@/hooks/useBasketStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Product(item: ProductProps): React.ReactElement {
  const state = useBasketStore(state => state);

  const handleAddToBasket = (e: any) => {
    // Evitar que o evento se propague para o TouchableOpacity pai
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
      state.addProduct({
        ...item,
        quantity: 1,
        total_price: 0,
        customer_id: state.customer_id,
      });
      Alert.alert('Sucesso', `Produto ${item.name} adicionado ao carrinho com sucesso!`, [
        { text: 'OK', style: 'cancel' },
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
    <View style={styles.wrapper}>
      <Link
        href={{
          pathname: '/(app)/(details)/[id]',
          params: { id: item.id },
        }}
        style={[styles.link, { marginBottom: 30 }]}
        asChild
      >
        <TouchableOpacity style={styles.container} activeOpacity={0.7} disabled={!item.disponible}>
          <Image source={item.source} style={styles.image} contentFit="scale-down" />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.value}>R$ {item.price.toFixed(2)}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={[styles.status, item.disponible ? styles.available : styles.unavailable]}>
              {item.disponible ? 'Disponível' : 'Indisponível'}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
      {item.disponible && (
        <TouchableOpacity
          style={styles.basketButton}
          onPress={handleAddToBasket}
          activeOpacity={0.7}
        >
          <View style={styles.plusBadge}>
            <AntDesign name="plus" size={RFValue(12)} color="white" />
          </View>
          <SimpleLineIcons name="basket" size={RFValue(24)} color={cssVar.color.highlight} />
        </TouchableOpacity>
      )}
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipText}>Ver detalhes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginVertical: RFValue(8),
  },
  basketButton: {
    position: 'absolute',
    top: RFValue(10),
    right: RFValue(10),
    zIndex: 10,
    padding: RFValue(8),
  },
  plusBadge: {
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
  container: {
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
  image: {
    width: '100%',
    height: RFValue(120),
    borderRadius: 5,
  },
  textContainer: {
    marginTop: RFValue(10),
    alignItems: 'center',
  },
  name: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: cssVar.color.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: RFValue(10),
  },
  value: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.greenLight,
  },
  type: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.yellow,
  },
  status: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    paddingVertical: RFValue(4),
    paddingHorizontal: RFValue(8),
    borderRadius: 5,
  },
  available: {
    color: cssVar.color.white,
    backgroundColor: cssVar.color.greenMedium,
  },
  unavailable: {
    color: cssVar.color.white,
    backgroundColor: cssVar.color.darkRed,
  },
  link: {
    width: '100%',
    textDecorationLine: 'none',
  },
  tooltipContainer: {
    position: 'absolute',
    top: RFValue(15),
    left: RFValue(15),
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: RFValue(5),
    padding: RFValue(10),
    zIndex: 15,
    // display: 'none',
  },
  tooltipText: {
    color: 'white',
    fontSize: RFValue(10),
    fontWeight: 'bold',
  },
});
