import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import ButtonMenu from '@/components/ButtonMenu';
import { cssVar } from '@/constants/css';
import { ButtonType } from '@/domain/types/Button.type';
import { Stack } from 'expo-router';
import { StatusBar, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';

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

  const screenOptions = useMemo(
    () => ({
      title: 'Menu',
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
      <FlashList
        data={buttons}
        renderItem={renderButton}
        keyExtractor={(item, index) => `${item.text}-${index}-${item.type}`}
        estimatedItemSize={80}
        contentContainerStyle={styles.menuListContent}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  menuList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  menuListContent: {
    alignItems: 'center',
    paddingVertical: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
});
