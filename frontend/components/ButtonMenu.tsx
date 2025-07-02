import { cssVar } from '@/constants/css';
import { ButtonType } from '@/domain/types/Button.type';
import { ExternalPathString, Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export default function ButtonMenu({
  item,
  isDrink = false,
}: {
  item: ButtonType;
  isDrink?: boolean;
}) {
  let href: string | { pathname: ExternalPathString; params?: Record<string, any> };

  if (!isDrink) {
    href = {
      pathname: item.url as ExternalPathString,
    };
  } else {
    href = {
      pathname: '/menu/items/[type]' as ExternalPathString,
      params: { type: item.url },
    };
  }

  return (
    <Link href={href} style={styles.buttonMenuLink} asChild>
      <TouchableOpacity style={styles.buttonMenu} activeOpacity={0.7}>
        <Text style={styles.menuButtonText}>{item.text}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonMenu: {
    color: cssVar.color.white,
    fontSize: RFValue(16, 540),
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
    marginVertical: 10,
  },
  menuButtonText: {
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    textDecorationLine: 'none',
    paddingHorizontal: 40,
    color: cssVar.color.highlight,
  },
  buttonMenuLink: {
    width: 'auto',
  },
});
