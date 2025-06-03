import ButtonUser from '@/components/ButtonUser';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { ButtonType } from '@/domain/types/Button.type';
import { ExternalPathString, Link, Stack } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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

  return (
    <Page type="scrollView">
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
      {buttons.map((button, i) => {
        return (
          <Link
            href={{
              pathname: '/(app)/(items)/[type_text]' as ExternalPathString,
              params: { type_text: `${button.type}_${button.text}` },
            }}
            style={[styles.menuLink, { marginHorizontal: 'auto' }]}
            asChild
            key={`${button.text}-${i}`}
          >
            <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
              <Text style={styles.menuButtonText}>{button.text}</Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </Page>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    color: cssVar.color.white,
    fontSize: RFValue(16, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cssVar.color.background,
    padding: 8,
    textDecorationLine: 'none',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: cssVar.color.highlight,
    minWidth: 300,
    marginTop: 20,
  },
  menuButtonText: {
    fontSize: RFValue(16, 540), // vw padrão de 680
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'none',
    paddingHorizontal: 40,
    color: cssVar.color.highlight,
  },
  menuLink: {
    width: 'auto',
  },
});
