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
  const { isPending, error, data, isFetching, isRefetching, isLoading, refetch, isSuccess } =
    useGetOrderById(order_id as string);

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
    <Page
      customStyle={{
        display: 'flex',
        flexDirection: 'row',
        opacity: 0.8,
        filter: 'grayscale(80%)',
      }}
      blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 4 }}
    >
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
      <Stack.Screen
        options={{
          title: 'Pagamento',
          headerStyle: { backgroundColor: cssVar.color.black },
          headerTitleStyle: { color: cssVar.color.highlight },
          animation: 'fade',
          headerTintColor: cssVar.color.white,
          headerShown: true,
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
