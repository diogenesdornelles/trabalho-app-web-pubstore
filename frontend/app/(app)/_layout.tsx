import ProtectedRoutes from '@/components/ProtectedRoutes';
import { cssVar } from '@/constants/css';
import useBasketStore from '@/hooks/useBasketStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';

export default function AppLayout() {
  const quantity = useBasketStore(state => state.products.length);

  const BasketIcon = () => (
    <View style={styles.iconContainer}>
      {quantity > 0 ? (
        <SimpleLineIcons name="basket-loaded" size={28} color={cssVar.color.highlight} />
      ) : (
        <SimpleLineIcons name="basket" size={28} color={cssVar.color.highlight} />
      )}
      {quantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{quantity}</Text>
        </View>
      )}
    </View>
  );
  return (
    <ProtectedRoutes>
      <Tabs
        backBehavior="initialRoute"
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { display: 'flex', fontSize: 10, padding: 2 },
          tabBarItemStyle: {
            backgroundColor: cssVar.color.black,
            height: 60,
            minHeight: 60,
          },
          tabBarStyle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: cssVar.color.black,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: 'Home',
            href: '/(app)/home',
            tabBarIcon: () => (
              <SimpleLineIcons name="home" size={28} color={cssVar.color.highlight} />
            ),
          }}
        />
        <Tabs.Screen
          name="(search)"
          options={{
            headerShown: false,
            title: 'Pesquisar',
            href: '/(app)/(search)/search',
            tabBarIcon: () => <AntDesign name="search1" size={28} color={cssVar.color.highlight} />,
          }}
        />
        <Tabs.Screen
          name="(basket)"
          options={{
            headerShown: false,
            title: 'Cesta',
            href: '/(app)/(basket)/basket',
            tabBarIcon: () => <BasketIcon />,
          }}
        />
        <Tabs.Screen
          name="(menu)"
          options={{
            headerShown: false,
            title: 'Menu',
            href: '/menu',
            tabBarIcon: () => (
              <SimpleLineIcons name="menu" size={28} color={cssVar.color.highlight} />
            ),
          }}
        />

        <Tabs.Screen
          name="(orders)"
          options={{
            title: 'Pedidos',
            headerShown: false,
            href: '/(app)/(orders)/orders',
            tabBarIcon: () => (
              <SimpleLineIcons name="note" size={28} color={cssVar.color.highlight} />
            ),
          }}
        />
        <Tabs.Screen
          name="(user)"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
    </ProtectedRoutes>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
