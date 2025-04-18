import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Button from '@/components/button';
import useSession from '@/hooks/use-session';
import Page from '@/components/page';


// Mantém a splash screen visível enquanto carregamos recursos
SplashScreen.preventAutoHideAsync();

// Opções de animação da splash screen (opcional)
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

export default function Index() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { session } = useSession();
    const router = useRouter();

    useEffect(() => {
        async function prepare() {
            try {
                // Pré-carrega as fontes (ou faça chamadas de API necessárias)
                await Font.loadAsync(Entypo.font);
                // Delay artificial para simular carregamento lento (remova em produção)
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);



    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            // Esconde a splash screen após a renderização do layout principal
            SplashScreen.hideAsync();
            // redireciona, após esconder splashsreen
            if (session) router.replace('/home');
        }
    }, [appIsReady, session, router]);

    if (!appIsReady) {
        return null;
    }

    return (
        <Page onLayoutRootView={onLayoutRootView} title="Pub Store" customStyle={{ opacity: .9, filter: 'grayscale(90%)' }} blurSettings={{ intensity: 50, tint: 'systemUltraThinMaterialDark', radius: 5 }}>
            <Button text="Sign-in" pathname="/sign-in" />
        </Page>

    );
}
