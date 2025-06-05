import Page from '@/components/Page';
import ButtonMenu from '@/components/ButtonMenu';
import { cssVar } from '@/constants/css';
import { ButtonType } from '@/domain/types/Button.type';
import { Stack } from 'expo-router';
import { StatusBar, StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useDefaultScreenOptions } from '@/hooks/useDefaultScreenOptions';

export default function Menu() {
  const screenOptions = useDefaultScreenOptions({
    title: 'Menu',
  });
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
    <Page>
      <StatusBar
        barStyle="light-content"
        backgroundColor={cssVar.color.black}
        translucent={false}
      />
      <Stack.Screen options={screenOptions} />
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
