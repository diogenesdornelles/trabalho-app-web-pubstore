import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import ButtonMenu from '@/components/ButtonMenu';
import { cssVar } from '@/constants/css';
import { ButtonType } from '@/domain/types/Button.type';
import { Stack } from 'expo-router';
import { StatusBar, StyleSheet, FlatList } from 'react-native';

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
    <ButtonMenu item={item} index={index} />
  );

  return (
    <Page>
      <StatusBar
        barStyle="light-content"
        backgroundColor={cssVar.color.black}
        translucent={false}
      />
      <Stack.Screen
        options={{
          title: 'Menu',
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
          headerRight: () => <ButtonUser />,
        }}
      />
      <FlatList
        data={buttons}
        renderItem={renderButton}
        keyExtractor={(item, index) => `${item.text}-${index}`}
        style={styles.menuList}
        contentContainerStyle={styles.menuListContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
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
