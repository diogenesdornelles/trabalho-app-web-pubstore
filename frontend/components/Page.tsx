import ImageBackground from '@/components/ImageBackground';
import Container from '@/components/Container';
import { StatusBar, ViewStyle } from 'react-native';
import { BlurTint } from 'expo-blur';
import { useMemo } from 'react';
import { cssVar } from '@/constants/css';

interface PageProps {
  customStyle?: ViewStyle;
  blurSettings?: {
    intensity?: number;
    tint?: BlurTint;
    radius?: number;
  };
  children?: React.ReactNode;
  header: React.ReactNode;
  type?: 'view' | 'scrollView';
  onLayoutRootView?: () => void;
}

export default function Page({
  children,
  type = 'view',
  customStyle,
  header,
  blurSettings,
  onLayoutRootView,
}: PageProps) {
  const memoizedChildren = useMemo(() => children, [children]);
  return (
    <Container header={header} type={type ? type : 'view'} onLayoutRootView={onLayoutRootView}>
      <StatusBar backgroundColor={cssVar.color.black} barStyle="light-content" />
      <ImageBackground customStyle={customStyle} blurSettings={blurSettings} />
      {memoizedChildren}
    </Container>
  );
}
