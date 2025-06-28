import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

import ProtectedRoutes from '@/components/ProtectedRoutes';
import { cssVar } from '@/constants/css';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { BasketIcon } from '@/components/BasketIcon';

export default function AppLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(cssVar.color.black);

      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  return (
    <ProtectedRoutes>
      <Tabs
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
            href: '/home',
            tabBarIcon: () => (
              <SimpleLineIcons name="home" size={28} color={cssVar.color.highlight} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: 'Pesquisar',
            href: '/search',
            tabBarIcon: () => <AntDesign name="search1" size={28} color={cssVar.color.highlight} />,
          }}
        />
        <Tabs.Screen
          name="basket"
          options={{
            headerShown: false,
            title: 'Cesta',
            href: '/basket',
            tabBarIcon: () => <BasketIcon />,
          }}
        />
        <Tabs.Screen
          name="menu"
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
          name="orders"
          options={{
            title: 'Pedidos',
            headerShown: false,
            href: '/orders',
            tabBarIcon: () => (
              <SimpleLineIcons name="note" size={28} color={cssVar.color.highlight} />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
    </ProtectedRoutes>
  );
}
