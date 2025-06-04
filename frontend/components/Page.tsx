import ImageBackground from '@/components/ImageBackground';
import Container from '@/components/Container';
import { ViewStyle } from 'react-native';
import { BlurTint } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';

interface PageProps {
  customStyle?: ViewStyle;
  blurSettings?: {
    intensity?: number;
    tint?: BlurTint;
    radius?: number;
  };
  children?: React.ReactNode;
  type?: 'view' | 'scrollView';
  onLayoutRootView?: () => void;
}

export default function Page({
  children,
  type = 'view',
  customStyle,
  blurSettings,
  onLayoutRootView,
}: PageProps) {
  const memoizedChildren = useMemo(() => children, [children]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container type={type ? type : 'view'} onLayoutRootView={onLayoutRootView}>
        <ImageBackground customStyle={customStyle} blurSettings={blurSettings} />
        {memoizedChildren}
      </Container>
    </SafeAreaView>
  );
}
