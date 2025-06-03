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
    <View style={styles.basketItemContainer}>
      <Text style={styles.basketItemIndex}>{index + 1}</Text>
      <Image source={{ uri: product.source }} style={styles.basketItemImage} />

      <View style={styles.basketItemInfo}>
        <Text style={styles.basketItemName}>{product.name}</Text>
        <Text style={styles.basketItemQuantity}>Quantidade: {product.quantity}</Text>
        <Text style={styles.basketItemPrice}>Preço: R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.basketItemTotalPrice}>Total: R$ {product.total_price.toFixed(2)}</Text>
      </View>

      <View style={styles.basketItemActions}>
        {/* Linha superior: Ver detalhes */}
        <View style={styles.basketItemActionRow}>
          <Link
            href={{
              pathname: '/(app)/(details)/[id]',
              params: { id: product.id },
            }}
            asChild
            onPress={e => e.stopPropagation()}
          >
            <TouchableOpacity style={styles.basketItemViewButton} activeOpacity={0.7}>
              <AntDesign name="infocirlceo" size={24} color={cssVar.color.black} />
              <Text style={styles.basketItemActionText}>Ver</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Linha do meio: Botões de quantidade */}
        <View style={styles.basketItemActionRow}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.basketItemQuantityButton}
            testID="decrement-button"
          >
            <AntDesign name="minuscircleo" size={20} color={cssVar.color.darkLime} />
          </TouchableOpacity>

          <Text style={styles.basketItemQuantityValue}>{product.quantity}</Text>

          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.basketItemQuantityButton}
            testID="increment-button"
          >
            <AntDesign name="pluscircleo" size={20} color={cssVar.color.darkLime} />
          </TouchableOpacity>
        </View>

        {/* Linha inferior: Remover */}
        <View style={styles.basketItemActionRow}>
          <TouchableOpacity
            onPress={handleRemove}
            style={styles.basketItemRemoveButton}
            testID="remove-button"
          >
            <Ionicons name="trash" size={20} color={cssVar.color.red} />
            <Text style={styles.basketItemRemoveText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  basketItemContainer: {
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
  basketItemIndex: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginRight: RFValue(10),
    width: RFValue(20),
    textAlign: 'center',
  },
  basketItemImage: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: 5,
    marginRight: RFValue(10),
  },
  basketItemInfo: {
    flex: 1,
    marginRight: RFValue(10),
  },
  basketItemName: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginBottom: RFValue(5),
  },
  basketItemQuantity: {
    fontSize: RFValue(12),
    color: '#555',
  },
  basketItemPrice: {
    fontSize: RFValue(12),
    color: '#555',
  },
  basketItemTotalPrice: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#333',
    marginTop: RFValue(5),
  },
  basketItemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: RFValue(80),
    height: '100%',
  },
  basketItemActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: RFValue(4),
    width: '100%',
  },
  basketItemViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(2),
    paddingHorizontal: RFValue(4),
    borderRadius: RFValue(4),
  },
  basketItemActionText: {
    fontSize: RFValue(14),
    marginLeft: RFValue(4),
    color: cssVar.color.black,
  },
  basketItemQuantityButton: {
    padding: RFValue(4),
    borderRadius: RFValue(4),
  },
  basketItemQuantityValue: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    marginHorizontal: RFValue(8),
    minWidth: RFValue(20),
    textAlign: 'center',
  },
  basketItemRemoveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(4),
    borderRadius: RFValue(4),
  },
  basketItemRemoveText: {
    fontSize: RFValue(10),
    marginLeft: RFValue(4),
    color: cssVar.color.red,
  },
});
