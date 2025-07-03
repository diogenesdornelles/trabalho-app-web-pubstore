import Page from '@/components/Page';
import { ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { cssVar } from '@/constants/css';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Menu() {
  const router = useRouter();
  return (
    <Page
      header={<CustomHeader title="Menu" showBasket showUser showBackButton={false} />}
      type="view"
    >
      <ScrollView style={styles.menuContainer}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '2%' }}>
          <Card style={{ flex: 1 }} onPress={() => router.push('/search')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="search-web" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Pesquisar</Text>
            </Card.Content>
          </Card>

          <Card style={{ flex: 1 }} onPress={() => router.push('/orders')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="note" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Pedidos</Text>
            </Card.Content>
          </Card>

          <Card style={{ flex: 1 }} onPress={() => router.push('/basket')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="basket" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Cesta</Text>
            </Card.Content>
          </Card>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '2%',
            marginTop: 20,
            paddingTop: 20,
          }}
        >
          <Card style={{ width: '49%' }} onPress={() => router.push('/menu/items/chopp')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="cup-water" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Chopps</Text>
            </Card.Content>
          </Card>
          <Card style={{ width: '49%' }} onPress={() => router.push('/menu/items/whiskey')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="cup" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Whiskeys</Text>
            </Card.Content>
          </Card>

          <Card style={{ width: '49%' }} onPress={() => router.push('/menu/items/sparkling')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="glass-tulip" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Espumantes</Text>
            </Card.Content>
          </Card>

          <Card style={{ width: '49%' }} onPress={() => router.push('/menu/items/wine')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="glass-wine" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Vinhos</Text>
            </Card.Content>
          </Card>

          <Card style={{ width: '49%' }} onPress={() => router.push('/menu/items/beer')}>
            <Card.Content style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="beer" size={32} color={cssVar.color.highlight} />
              <Text variant="titleMedium">Cervejas</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: cssVar.color.black,
    marginVertical: 30,
  },
});
