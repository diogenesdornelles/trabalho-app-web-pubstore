import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useEndSession } from '@/hooks/useEndSession';
import { Link, Stack } from 'expo-router';
import { useMemo } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Home() {
  const endSession = useEndSession();

  const screenOptions = useMemo(
    () => ({
      title: 'Home',
      headerStyle: { backgroundColor: cssVar.color.black },
      headerTitleStyle: { color: cssVar.color.highlight },
      animation: 'fade' as const,
      headerTintColor: cssVar.color.white,
      headerShown: true,
      headerBackVisible: false,
      headerLeft: () => null,
      contentStyle: {
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
        alignItems: 'baseline' as const,
        alignContent: 'center' as const,
      },
      headerRight: () => <ButtonUser />,
    }),
    []
  );

  return (
    <Page>
      <StatusBar
        barStyle="light-content"
        backgroundColor={cssVar.color.black}
        translucent={false}
      />
      <Stack.Screen options={screenOptions} />
      <Text style={styles.homeText}>PubStore</Text>
      <Link
        href={{
          pathname: '/menu',
        }}
        style={[styles.homeLink, { marginHorizontal: 'auto' }]}
        asChild
        key="Sign-in"
      >
        <TouchableOpacity style={styles.homeButton} activeOpacity={0.7}>
          <Text style={styles.homeButtonText}>Menu</Text>
        </TouchableOpacity>
      </Link>
      <Text style={styles.homeSignOut} onPress={() => endSession()}>
        Sair
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  homeText: {
    color: cssVar.color.white,
    fontSize: RFValue(30, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: cssVar.color.black,
    padding: 10,
    width: '100%',
  },
  homeSignOut: {
    fontSize: 26,
    position: 'absolute',
    color: cssVar.color.white,
    bottom: 10,
    marginTop: 30,
    textShadowColor: cssVar.color.black,
    backgroundColor: cssVar.color.black,
    padding: 50,
    width: '100%',
    textAlign: 'center',
    opacity: 1,
  },
  homeLink: {},
  homeButton: {
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
  homeButtonText: {
    fontSize: RFValue(16, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'none',
    paddingHorizontal: 40,
    color: cssVar.color.highlight,
  },
});
