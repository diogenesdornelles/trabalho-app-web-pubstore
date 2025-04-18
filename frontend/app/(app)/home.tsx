import { Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "@/components/button";
import useSession from "@/hooks/use-session";
import { useRouter } from "expo-router";
import Page from "@/components/page";
import { cssVar } from "@/constants/css";


export default function App() {
  const { signOut } = useSession();
  const router = useRouter();

  return (
    <Page title="Home" customStyle={{ opacity: 1, filter: 'grayscale(30%)' }} blurSettings={{ intensity: 100, tint: 'systemUltraThinMaterialDark', radius: 0 }}>
      <Text style={styles.text}>My PubStore</Text>
      <Button text="Menu" pathname="/menu" />
      <Text
        style={styles.signOut}
        onPress={() => {
          signOut();
          router.replace('/sign-in')
        }}>
        Sign Out
      </Text>
    </Page>
  );
}


const styles = StyleSheet.create({
  text: {
    color: cssVar.color.white,
    fontSize: RFValue(22, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: cssVar.color.black,
    padding: 10,
    width: '100%'
  },
  signOut: {
    fontSize: 26,
    color: cssVar.color.white,
    marginTop: 30,
    textShadowColor: cssVar.color.black,
    backgroundColor: cssVar.color.black,
    padding: 15,
    width: '100%',
    textAlign: 'center',
    opacity: .9
  }
})