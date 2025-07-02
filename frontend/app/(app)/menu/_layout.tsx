import { cssVar } from '@/constants/css';
import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { View } from 'react-native';
export default function MenuLayout() {
  SystemUI.setBackgroundColorAsync('black');
  return (
    <View style={{ backgroundColor: cssVar.color.black, flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="items" />
      </Stack>
    </View>
  );
}
