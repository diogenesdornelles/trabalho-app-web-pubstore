import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useEndSession } from '@/hooks/useEndSession';
import useSession from '@/hooks/useSession';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Account() {
  const { authSession } = useSession();
  const endSession = useEndSession();
  let name: string | undefined;
  let id: string | undefined;
  let loggedAt: string | undefined;
  let cpf: string | undefined;
  let address: string | undefined;
  let email: string | undefined;

  if (authSession) {
    ({ name, id, loggedAt, cpf, address, email } = authSession);
  }

  return (
    <Page>
      <Stack.Screen
        options={{
          title: 'Cliente',
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
        }}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userText}>Informações do usuário: </Text>
        {name && <Text style={styles.userText}>Nome: {name}</Text>}
        {id && <Text style={styles.userText}>ID: {id}</Text>}
        {cpf && <Text style={styles.userText}>CPF: {cpf}</Text>}
        {address && <Text style={styles.userText}>Endereço: {address}</Text>}
        {email && <Text style={styles.userText}>E-mail: {email}</Text>}
        {loggedAt && (
          <Text style={styles.userText}>Logado em: {new Date(loggedAt).toLocaleDateString()}</Text>
        )}
      </View>
      <Text style={styles.userSignOut} onPress={() => endSession()}>
        Sair
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: cssVar.color.black,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderTopColor: cssVar.color.highlight,
    borderBottomColor: cssVar.color.highlight,
    shadowColor: cssVar.color.highlight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  userTitle: {
    color: cssVar.color.highlight,
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  userText: {
    color: cssVar.color.white,
    fontSize: 18,
    marginVertical: 4,
  },
  userSignOut: {
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
});
