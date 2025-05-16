import ButtonUser from "@/components/ButtonUser";
import Page from "@/components/Page";
import { cssVar } from "@/constants/css";
import { useEndSession } from "@/hooks/useEndSession";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


export default function Home() {
  const endSession = useEndSession();

  return (
    <Page customStyle={{ opacity: 1, filter: 'grayscale(30%)' }} blurSettings={{ intensity: 100, tint: 'systemUltraThinMaterialDark', radius: 0 }}>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: cssVar.color.black },
          headerTitleStyle: { color: cssVar.color.highlight, },
          animation: 'fade',
          headerTintColor: cssVar.color.white,
          headerShown: true,
          contentStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
            alignContent: 'center'

          },
          headerRight: () => <ButtonUser/>
        }}
      />
      <Text style={styles.text}>PubStore</Text>
      <Link
        href={{
          pathname: "/menu",
        }}
        style={[styles.link, { marginHorizontal: 'auto' }]}
        asChild
        key="Sign-in"
      >
        <TouchableOpacity style={styles.button} activeOpacity={.7}>
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
      </Link>
      <Text
        style={styles.signOut}
        onPress={() => endSession()}>
        Sair
      </Text>
    </Page>
  );
}


const styles = StyleSheet.create({
  text: {
    color: cssVar.color.white,
    fontSize: RFValue(30, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: cssVar.color.black,
    padding: 10,
    width: '100%'
  },
  signOut: {
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
    opacity: 1
  },
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
    marginTop: 20
  },
  link: {
  },

  buttonText: {
    fontSize: RFValue(16, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'none',
    paddingHorizontal: 40,
    color: cssVar.color.highlight,
  }
})