import ImageBackground from '@/components/image-background';
import Container from '@/components/container';
import Header from '@/components/header';
import { ViewStyle } from 'react-native';
import { BlurTint } from 'expo-blur';


interface Props {
    customStyle?: ViewStyle;
    blurSettings?: {
        intensity?: number;
        tint?: BlurTint;
        radius?: number
    },
    children?: React.ReactNode,
    title: string,
    type?: 'view' | 'scrollView',
    onLayoutRootView?: () => void
}

export default function Page({ children, type = 'view', title, customStyle, blurSettings, onLayoutRootView }: Props) {

    return (
        <Container type={type ? type : 'view'} onLayoutRootView={onLayoutRootView}>
            <Header title={title} />
            <ImageBackground customStyle={customStyle} blurSettings={blurSettings} />
            {children}
        </Container>
    );
}
