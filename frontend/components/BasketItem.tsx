import { cssVar } from '@/constants/css';
import { ProductBasketProps } from '@/domain/interfaces/Product.interface';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface BasketItemProps {
  product: ProductBasketProps;
  index: number;
  removeProduct: (product: ProductBasketProps) => void;
  updateProduct: (id: string, product: ProductBasketProps) => void;
}

export default function BasketItem({
  product,
  index,
  removeProduct,
  updateProduct,
}: BasketItemProps) {
  // Funções de manipulação permanecem inalteradas
  const handleIncrement = () => {
    updateProduct(product.id, {
      ...product,
      quantity: product.quantity + 1,
    });
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      updateProduct(product.id, {
        ...product,
        quantity: product.quantity - 1,
      });
    } else {
      Alert.alert('Remover Produto', `Deseja remover ${product.name} do carrinho?`, [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => removeProduct(product),
          style: 'destructive',
        },
      ]);
    }
  };

  const handleRemove = () => {
    Alert.alert('Remover Produto', `Deseja remover ${product.name} do carrinho?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: () => removeProduct(product),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.index}>{index + 1}</Text>
      <Image source={{ uri: product.source }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.quantity}>Quantidade: {product.quantity}</Text>
        <Text style={styles.price}>Preço: R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.totalPrice}>Total: R$ {product.total_price.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>
        {/* Linha superior: Ver detalhes */}
        <View style={styles.actionRow}>
          <Link
            href={{
              pathname: '/(app)/(details)/[id]',
              params: { id: product.id },
            }}
            asChild
            onPress={e => e.stopPropagation()}
          >
            <TouchableOpacity style={styles.viewButton} activeOpacity={0.7}>
              <AntDesign name="infocirlceo" size={24} color={cssVar.color.black} />
              <Text style={styles.actionText}>Ver</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Linha do meio: Botões de quantidade */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.quantityButton}
            testID="decrement-button"
          >
            <AntDesign name="minuscircleo" size={20} color={cssVar.color.darkLime} />
          </TouchableOpacity>

          <Text style={styles.quantityValue}>{product.quantity}</Text>

          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.quantityButton}
            testID="increment-button"
          >
            <AntDesign name="pluscircleo" size={20} color={cssVar.color.darkLime} />
          </TouchableOpacity>
        </View>

        {/* Linha inferior: Remover */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={handleRemove}
            style={styles.removeButton}
            testID="remove-button"
          >
            <Ionicons name="trash" size={20} color={cssVar.color.red} />
            <Text style={styles.removeText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(10),
    padding: RFValue(10),
    backgroundColor: cssVar.color.white,
    borderRadius: 8,
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  index: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginRight: RFValue(10),
    width: RFValue(20),
    textAlign: 'center',
  },
  image: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: 5,
    marginRight: RFValue(10),
  },
  info: {
    flex: 1,
    marginRight: RFValue(10),
  },
  name: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginBottom: RFValue(5),
  },
  quantity: {
    fontSize: RFValue(12),
    color: '#555',
  },
  price: {
    fontSize: RFValue(12),
    color: '#555',
  },
  totalPrice: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#333',
    marginTop: RFValue(5),
  },
  // Estilos reorganizados para actions
  actions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: RFValue(80),
    height: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: RFValue(4),
    width: '100%',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(2),
    paddingHorizontal: RFValue(4),
    borderRadius: RFValue(4),
  },
  actionText: {
    fontSize: RFValue(14),
    marginLeft: RFValue(4),
    color: cssVar.color.black,
  },
  quantityButton: {
    padding: RFValue(4),
    borderRadius: RFValue(4),
  },
  quantityValue: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginHorizontal: RFValue(8),
    minWidth: RFValue(20),
    textAlign: 'center',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(4),
    borderRadius: RFValue(4),
  },
  removeText: {
    fontSize: RFValue(10),
    marginLeft: RFValue(4),
    color: cssVar.color.red,
  },
});
