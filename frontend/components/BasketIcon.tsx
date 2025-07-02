import { cssVar } from '@/constants/css';
import useBasketStore from '@/hooks/useBasketStore';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const BasketIcon = () => {
  const quantity = useBasketStore(state => state.products.length);
  const router = useRouter();

  const handlePress = () => {
    router.push('/basket');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.iconContainer}>
        {quantity > 0 ? (
          <SimpleLineIcons name="basket-loaded" size={28} color={cssVar.color.highlight} />
        ) : (
          <SimpleLineIcons name="basket" size={28} color={cssVar.color.highlight} />
        )}
        {quantity > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{quantity}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
