import { cssVar } from '@/constants/css';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';

export const MenuIcon = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/menu');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
      <MaterialCommunityIcons name="menu" size={28} color={cssVar.color.highlight} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
