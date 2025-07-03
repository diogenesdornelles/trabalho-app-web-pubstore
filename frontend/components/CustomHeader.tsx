import { cssVar } from '@/constants/css';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BasketIcon } from './BasketIcon';
import ButtonUser from './ButtonUser';
import { MenuIcon } from './MenuIcon';

interface CustomHeaderProps {
  title?: string;
  showBasket?: boolean;
  showUser?: boolean;
  showBackButton?: boolean;
  showMenu?: boolean;
}

export default function CustomHeader({
  title,
  showBasket = false,
  showUser = false,
  showBackButton = true,
  showMenu = false,
}: CustomHeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color={cssVar.color.highlight} />
        </TouchableOpacity>
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {showBasket && <BasketIcon />}
      {showMenu && <MenuIcon />}
      {showUser && <ButtonUser />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: RFValue(65),
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
    backgroundColor: cssVar.color.greenDark,
  },
  sideContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    justifyContent: 'flex-end',
    gap: 15,
  },
  title: {
    color: cssVar.color.highlight,
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
});
