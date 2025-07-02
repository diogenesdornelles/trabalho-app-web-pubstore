import Page from '@/components/Page';
import ButtonMenu from '@/components/ButtonMenu';
import { ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { cssVar } from '@/constants/css';

export default function Menu() {
  return (
    <Page
      header={<CustomHeader title="Menu" showBasket showUser showBackButton={false} />}
      type="view"
    >
      <ScrollView style={styles.menuContainer}>
        <ButtonMenu item={{ text: 'Pesquisar', url: 'search' }} />
        <ButtonMenu item={{ text: 'Meus Pedidos', url: 'orders' }} />
        <ButtonMenu item={{ text: 'Cesta', url: 'basket' }} />
        <View
          style={{
            marginTop: 20,
            borderTopWidth: 1,
            borderColor: cssVar.color.gray,
            paddingTop: 20,
          }}
        >
          <ButtonMenu item={{ text: 'Chopps', url: 'chopp' }} isDrink={true} />
          <ButtonMenu item={{ text: 'Cervejas', url: 'beer' }} isDrink={true} />
          <ButtonMenu item={{ text: 'Whiskeys', url: 'whiskey' }} isDrink={true} />
          <ButtonMenu item={{ text: 'Espumantes', url: 'sparkling' }} isDrink={true} />
          <ButtonMenu item={{ text: 'Vinhos', url: 'wine' }} isDrink={true} />
        </View>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: cssVar.color.black,
    gap: 15,
    marginVertical: 20,
  },
});
