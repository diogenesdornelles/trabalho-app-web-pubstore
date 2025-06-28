import { ImageBackground as ImageBackground_, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurTint, BlurView } from 'expo-blur';
import { cssVar } from '@/constants/css';

interface Props {
  customStyle?: ViewStyle;
  blurSettings?: {
    intensity?: number;
    tint?: BlurTint;
    radius?: number;
  };
}

export default function ImageBackground({ customStyle, blurSettings }: Props) {
  return (
    <>
      <ImageBackground_
        source={require('@/assets/images/pub_2.jpg')}
        resizeMode="cover"
        style={[styles.bgImage, customStyle || {}]}
        blurRadius={blurSettings?.radius || 0}
      />
      <BlurView
        style={styles.blurView}
        intensity={blurSettings?.intensity ?? 50}
        tint={blurSettings?.tint ?? 'default'}
      />
      <View style={styles.blackView}></View>
    </>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
  },
  blackView: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: cssVar.color.black,
    width: '100%',
    height: '100%',
    zIndex: -3,
  },
});
