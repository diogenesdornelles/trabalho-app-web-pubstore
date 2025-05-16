
import ProtectedRoutes from '@/components/ProtectedRoutes';
import { cssVar } from "@/constants/css";
import useBasketStore from '@/hooks/useBasketStore';
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Tabs } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';


export default function AppLayout() {
  const quantity = useBasketStore((state) => state.products.length);

  const BasketIcon = () => (
    <View style={styles.iconContainer}>
      {quantity > 0 ? (
        <SimpleLineIcons name="basket-loaded" size={24} color={cssVar.color.highlight} />
      ) : (
        <SimpleLineIcons name="basket" size={24} color={cssVar.color.highlight} />
      )}
      {quantity > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{quantity}</Text>
        </View>
      )}
    </View>
  );
  return <ProtectedRoutes>
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'white',
      tabBarLabelStyle: { display: 'flex', fontSize: 8, padding: 3 },
      tabBarItemStyle: { backgroundColor: cssVar.color.black, padding: 0 },
      tabBarStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cssVar.color.black,
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          href: '/(app)/home',
          tabBarIcon: () => <SimpleLineIcons name="home" size={24} color={cssVar.color.highlight} />
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          headerShown: false,
          title: "Search",
          href: '/(app)/(search)/search',
          tabBarIcon: () => <AntDesign name="search1" size={24} color={cssVar.color.highlight} />
        }}
      />
      <Tabs.Screen
        name="(basket)"
        options={{
          headerShown: false,
          title: "Basket",
          href: '/(app)/(basket)/basket',
          tabBarIcon: () => <BasketIcon />
        }}
      />
      <Tabs.Screen
        name="(menu)"
        options={{
          headerShown: false,
          title: "Menu",
          href: '/(app)/(menu)/menu',
          tabBarIcon: () => <SimpleLineIcons name="menu" size={24} color={cssVar.color.highlight} />
        }}
      />

      <Tabs.Screen
        name="(orders)"
        options={{
          title: "Orders",
          headerShown: false,
          href: '/(app)/(orders)/orders',
          tabBarIcon: () => <SimpleLineIcons name="note" size={24} color={cssVar.color.highlight} />

        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          href: null,
          headerShown: false,

        }}
      />
      <Tabs.Screen
        name="(details)"
        options={{
          href: null,
          headerShown: false,

        }}
      />
      <Tabs.Screen
        name="(payment)"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(items)"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>

  </ProtectedRoutes>
}


const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
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