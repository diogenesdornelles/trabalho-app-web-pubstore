import { cssVar } from '@/constants/css';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { View } from 'react-native';

export default function ItemsLayout() {
  SystemUI.setBackgroundColorAsync('black');
  return (
    <View style={{ backgroundColor: cssVar.color.black, flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[type]" />
        <Stack.Screen name="details" />
      </Stack>
    </View>
  );
}
