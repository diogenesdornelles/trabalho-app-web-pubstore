import { cssVar } from '@/constants/css';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BasketIcon } from './BasketIcon';
import ButtonUser from './ButtonUser';

interface CustomHeaderProps {
  title?: string;
  showBasket?: boolean;
  showUser?: boolean;
  showBackButton?: boolean;
}

export default function CustomHeader({
  title,
  showBasket = false,
  showUser = false,
  showBackButton = true,
}: CustomHeaderProps) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.sideContainer}>
          {showBackButton && (
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <MaterialIcons name="arrow-back" size={28} color={cssVar.color.highlight} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={[styles.sideContainer, styles.rightContainer]}>
          {showBasket && <BasketIcon />}
          {showUser && <ButtonUser />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: cssVar.color.orange,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: cssVar.color.black,
    borderBottomWidth: 1,
    borderBottomColor: cssVar.color.gray,
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
  iconButton: {
    padding: 4,
  },
});
