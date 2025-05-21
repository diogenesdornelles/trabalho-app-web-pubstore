import ImageBackground from '@/components/ImageBackground';
import Container from '@/components/Container';
import { ViewStyle } from 'react-native';
import { BlurTint } from 'expo-blur';

interface Props {
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
}: Props) {
  return (
    <Container type={type ? type : 'view'} onLayoutRootView={onLayoutRootView}>
      <ImageBackground customStyle={customStyle} blurSettings={blurSettings} />
      {children}
    </Container>
  );
}
