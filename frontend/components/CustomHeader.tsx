import { cssVar } from '@/constants/css';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface CustomHeaderProps {
  right?: React.ReactNode;
  title?: string;
}

export default function CustomHeader({ right, title }: CustomHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(75),
    elevation: 5,
  },
  title: {
    color: cssVar.color.highlight,
    fontSize: 25,
    marginTop: RFValue(25),
    marginLeft: RFValue(10),
  },
  right: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
});
