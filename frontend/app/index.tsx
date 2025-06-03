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

SplashScreen.preventAutoHideAsync();

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
        await Font.loadAsync(Entypo.font);

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
      SplashScreen.hideAsync();

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
          headerLeft: () => null,
          headerBackVisible: false,
          gestureEnabled: false,
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
        style={[styles.indexLink, { marginHorizontal: 'auto' }]}
        asChild
        key="Sign-in"
      >
        <TouchableOpacity style={styles.indexButton} activeOpacity={0.7}>
          <Text style={styles.indexButtonText}>Entrar</Text>
        </TouchableOpacity>
      </Link>
    </Page>
  );
}

const styles = StyleSheet.create({
  indexButton: {
    color: cssVar.color.white,
    fontSize: RFValue(16, 540),
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
  indexText: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  indexLink: {},
  indexButtonText: {
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'none',
    paddingHorizontal: 40,
    color: cssVar.color.highlight,
  },
});
