import useSession from '@/hooks/useSession';
import Entypo from '@expo/vector-icons/Entypo';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function Index() {
  const { authSession } = useSession();
  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font);

        await new Promise(resolve => setTimeout(resolve, 100));
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

      if (authSession) {
        router.replace('/home');
        return;
      } else {
        router.replace('/sign-in');
        return;
      }
    }
  }, [appIsReady, router, authSession]);

  if (!appIsReady) {
    return null;
  }
  return <View onLayout={onLayoutRootView}></View>;
}
