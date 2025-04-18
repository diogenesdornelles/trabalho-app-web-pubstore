import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { items } from '@/fakedb/items';
import { ItemInterface } from '@/interfaces/item.interface';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAssets } from 'expo-asset';
import { Image } from 'expo-image';
import useBasketStore from '@/context/use-basket-store';
import Dropdown from 'react-native-input-select';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BasketIcon from '@/components/basket-icon';
import Header from '@/components/header';
import { cssVar } from '@/constants/css';


export default function Details() {
  const { id } = useLocalSearchParams();

  const [quantity, setQuantity] = useState<number>(1);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [assets] = useAssets([require('@/assets/images/chopp-card.png')]);

  const addItem = useBasketStore((state) => state.addItem);
  const item: ItemInterface | undefined = items.find(item => item.id === id);

  const handleAddItem = () => {
    if (!quantity) {
      setQuantityError(true);
      setTimeout(() => setQuantityError(false), 3000);
    } else {
      if (item && item.id) {
        addItem({ ...item, quantity: quantity });
      }
    }
  };

  return (
    (item && assets) ? (
      <>
        <BasketIcon />
        <Header title={item ? item.name.split(' ')[0] : ''}/>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.card}>
              <Image source={assets[0]} style={styles.image} contentFit="contain" />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.type}>Type: {item.type}</Text>
                <Text style={styles.type}>Alcohol content: {item.alcoholContent}%</Text>
                <Text style={styles.type}>IBU: {item.ibu}</Text>
                <Text style={styles.type}>Volume: {item.volume}ml</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Price:</Text>
                  <Text style={styles.price}>USD$ {item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Quantity:</Text>
                  <Text style={styles.quantity}>{quantity}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Total:</Text>
                  <Text style={styles.totalPrice}>USD$ {(item.price * quantity).toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.dropdownContainer}>
                <Dropdown
                  label="Quantity"
                  placeholder="Select quantity..."
                  isMultiple={false}
                  maxSelectableItems={1}
                  error={quantityError ? 'This field is required' : ''}
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
                  onValueChange={(value) => setQuantity(value as number)}
                  primaryColor={'#4CAF50'}
                  dropdownStyle={{
                    backgroundColor: '#000',
                    borderColor: 'rgba(255,215,0,0.95)'
                  }}
                  dropdownIconStyle={{ top: 15, right: 20 }}
                  dropdownIcon={
                    <MaterialIcons name="keyboard-arrow-down" size={30} color="white" />
                  }
                  labelStyle={{ color: 'white', fontSize: 15, fontWeight: '500' }}
                  selectedItemStyle={{ color: 'white' }}
                />
              </View>
              <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleAddItem}>
                <Text style={styles.buttonText}>Add to Basket</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </>
    ) : null
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: cssVar.color.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: cssVar.color.gray,
    borderRadius: 12,
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
    padding: 3,
    paddingTop: 7
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
    color: cssVar.color.lightGray,
    marginBottom: 10,
    textAlign: 'center',
  },
  type: {
    fontSize: RFValue(14),
    fontWeight: '600',
    color: cssVar.color.lightGray,
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
    color: cssVar.color.lightGray,
    fontWeight: '600',
  },
  price: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: cssVar.color.green,
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
    backgroundColor: cssVar.color.gold,
    paddingVertical: 12,
    alignItems: 'center',
    margin: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: cssVar.color.black,
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
});