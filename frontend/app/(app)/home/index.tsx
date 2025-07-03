import CustomHeader from '@/components/CustomHeader';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useEndSession } from '@/hooks/useEndSession';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Card, Text } from 'react-native-paper';

export default function Home() {
  const endSession = useEndSession();
  const router = useRouter();
  return (
    <Page header={<CustomHeader title="Home" showBackButton={false} />} type="view">
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: 20,
          width: '100%',
        }}
      >
        <Text style={styles.homeText}>PubStore</Text>
        <Card style={styles.homeLink} onPress={() => router.push('/menu')}>
          <Card.Content style={{ alignItems: 'center' }}>
            <Text variant="titleLarge">Menu</Text>
          </Card.Content>
        </Card>
        <Text style={styles.homeSignOut} onPress={() => endSession()}>
          Sair
        </Text>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  homeText: {
    color: cssVar.color.white,
    fontSize: RFValue(20, 540),
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
  homeLink: {
    backgroundColor: cssVar.color.black,
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: cssVar.color.highlight,
    elevation: 5,
    width: '90%',
  },
  homeButton: {
    color: cssVar.color.white,
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cssVar.color.black,
    padding: 8,
    textDecorationLine: 'none',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cssVar.color.highlight,
    minWidth: 300,
    marginTop: 20,
  },
  homeButtonText: {
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'none',
    paddingHorizontal: 40,
    color: cssVar.color.highlight,
  },
});
