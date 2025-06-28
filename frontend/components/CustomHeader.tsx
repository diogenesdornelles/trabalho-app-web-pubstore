import { cssVar } from '@/constants/css';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RelativePathString, useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface CustomHeaderProps {
  right?: React.ReactNode;
  title?: string;
  backOptions?: {
    show?: boolean;
    redirectTo?: RelativePathString | null;
  };
}

export default function CustomHeader({
  right,
  title,
  backOptions = { show: true, redirectTo: null },
}: CustomHeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {backOptions.show && (
        <TouchableOpacity
          onPress={() =>
            !backOptions.redirectTo ? router.back() : router.push(backOptions.redirectTo)
          }
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={28} color={cssVar.color.highlight} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: RFValue(75),
  },
  title: {
    color: cssVar.color.highlight,
    fontSize: 22,
    marginTop: RFValue(35),
    marginLeft: RFValue(10),
    flex: 1,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(35),
    marginLeft: RFValue(10),
  },
  right: {
    marginTop: RFValue(35),
    marginLeft: RFValue(10),
    flex: 1,
  },
});
