import CustomHeader from '@/components/CustomHeader';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useEndSession } from '@/hooks/useEndSession';
import useSession from '@/hooks/useSession';
import { StyleSheet, View } from 'react-native';
import { Card, List, Button, Avatar } from 'react-native-paper';

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
    <Page header={<CustomHeader title="Conta" showMenu />} type="view">
      <View style={styles.container}>
        <Avatar.Icon
          icon="account-circle"
          size={80}
          style={{ backgroundColor: cssVar.color.backgroundDark, marginBottom: 16 }}
          color={cssVar.color.highlight}
        />
        <Card style={styles.card}>
          <Card.Title
            title={name || 'Usuário'}
            subtitle={email}
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
            left={props => <Avatar.Text {...props} label={name ? name[0] : '?'} />}
          />
          <Card.Content>
            <List.Section>
              {id && (
                <List.Item
                  title="ID"
                  description={id}
                  left={props => <List.Icon {...props} icon="identifier" />}
                />
              )}
              {cpf && (
                <List.Item
                  title="CPF"
                  description={cpf}
                  left={props => <List.Icon {...props} icon="card-account-details" />}
                />
              )}
              {address && (
                <List.Item
                  title="Endereço"
                  description={address}
                  left={props => <List.Icon {...props} icon="home" />}
                />
              )}
              {loggedAt && (
                <List.Item
                  title="Logado em"
                  description={new Date(loggedAt).toLocaleDateString()}
                  left={props => <List.Icon {...props} icon="calendar-check" />}
                />
              )}
            </List.Section>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={endSession}
          style={styles.signOutButton}
          labelStyle={styles.signOutLabel}
          buttonColor={cssVar.color.red}
        >
          Sair
        </Button>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginVertical: 30,
  },
  card: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: cssVar.color.greenDark,
    borderRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    color: cssVar.color.highlight,
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: cssVar.color.gray,
    fontSize: 16,
  },
  signOutButton: {
    width: '100%',
    borderRadius: 8,
    marginTop: 10,
  },
  signOutLabel: {
    color: cssVar.color.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
