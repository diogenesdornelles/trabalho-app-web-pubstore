import ButtonUser from '@/components/ButtonUser';
import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useGetOrderById } from '@/hooks/service/get/useGetOrderById';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';

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

  return (
    <Page>
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <Stack.Screen
        options={{
          title: 'Pagamento',
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
    </Page>
  );
}
