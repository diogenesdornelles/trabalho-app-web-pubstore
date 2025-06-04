import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useGetOrderById } from '@/hooks/service/get/useGetOrderById';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { Alert, StatusBar } from 'react-native';

export default function Payment() {
  const { order_id } = useLocalSearchParams();
  const { isPending, error, isFetching, isRefetching, isLoading, refetch } = useGetOrderById(
    order_id as string
  );

  useEffect(() => {
    if (error) {
      console.error('Error fetching order details:', error);
      Alert.alert('Erro', `Falha ao carregar detalhes`, [
        {
          text: 'Tentar novamente',
          onPress: () => refetch(),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }
  }, [error, refetch]);

  const screenOptions = useMemo(
    () => ({
      title: 'Pagamento',
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

  return (
    <Page>
      <StatusBar
        barStyle="light-content"
        backgroundColor={cssVar.color.black}
        translucent={false}
      />
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <Stack.Screen options={screenOptions} />
    </Page>
  );
}
