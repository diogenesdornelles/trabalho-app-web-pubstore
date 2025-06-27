import Page from '@/components/Page';
import ButtonMenu from '@/components/ButtonMenu';
import { ButtonType } from '@/domain/types/Button.type';

import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import CustomHeader from '@/components/CustomHeader';

export default function Menu() {
  const buttons: ButtonType[] = [
    {
      text: 'Chopps',
      type: 'chopp',
    },
    {
      text: 'Cervejas',
      type: 'beer',
    },
    {
      text: 'Whiskeys',
      type: 'whiskey',
    },
    {
      text: 'Espumantes',
      type: 'sparkling',
    },
    {
      text: 'Vinhos',
      type: 'wine',
    },
  ];

  const renderButton = ({ item, index }: { item: ButtonType; index: number }) => (
    <ButtonMenu item={item} index={index} key={`${item.text}-${index}-${item.type}`} />
  );

  return (
    <Page header={<CustomHeader title="Menu" />} type="view">
      <View style={styles.menuContainer}>
        <FlashList
          data={buttons}
          renderItem={({ item, index }) => {
            return renderButton({ item, index });
          }}
          keyExtractor={(item, index) => `${item.text}-${index}-${item.type}`}
          estimatedItemSize={120}
          contentContainerStyle={styles.menuListContent}
        />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  menuListContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
