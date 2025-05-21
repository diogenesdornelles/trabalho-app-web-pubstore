import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import useSession from '@/hooks/useSession';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

// Mantém a splash screen visível enquanto carrega recursos
SplashScreen.preventAutoHideAsync();

// Opções de animação da splash screen
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { authSession } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      try {
        // Pré-carrega as fontes ou fazer chamadas de API
        await Font.loadAsync(Entypo.font);
        // Delay artificial para simular carregamento lento (remover em produção)
        await new Promise(resolve => setTimeout(resolve, 1000));
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
      // redireciona para home, se há session, após esconder splashsreen
      if (authSession) router.replace('/home');
    }
  }, [appIsReady, authSession, router]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Page
      onLayoutRootView={onLayoutRootView}
      customStyle={{ opacity: 0.9, filter: 'grayscale(90%)' }}
      blurSettings={{ intensity: 50, tint: 'systemUltraThinMaterialDark', radius: 5 }}
    >
      <Stack.Screen
        options={{
          title: 'Pub Store',
          headerStyle: { backgroundColor: cssVar.color.black },
          headerTitleStyle: { color: cssVar.color.highlight },
          animation: 'fade',
          headerTintColor: cssVar.color.white,
          headerShown: true,
          contentStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            alignContent: 'center',
          },
          headerRight: () => <ButtonUser />,
        }}
      />
      <Link
        href={{
          pathname: '/sign-in',
        }}
        style={[styles.link, { marginHorizontal: 'auto' }]}
        asChild
        key="Sign-in"
      >
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </Link>
    </Page>
  );
}

const styles = StyleSheet.create({
  button: {
    color: cssVar.color.white,
    fontSize: RFValue(16, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cssVar.color.black,
    padding: 8,
    textDecorationLine: 'none',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: cssVar.color.highlight,
    minWidth: 300,
    marginTop: 20,
  },
  text: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  link: {},
  buttonText: {
    fontSize: RFValue(16, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'none',
    paddingHorizontal: 40,
    color: cssVar.color.highlight,
  },
});
