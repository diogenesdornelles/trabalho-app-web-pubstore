import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import { cssVar } from '@/constants/css';
import { useGetOrderById } from '@/hooks/service/get/useGetOrderById';
import { useDefaultScreenOptions } from '@/hooks/useDefaultScreenOptions';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StatusBar } from 'react-native';

export default function Payment() {
  const { order_id } = useLocalSearchParams();
  const { isPending, error, isFetching, isRefetching, isLoading, refetch } = useGetOrderById(
    order_id as string
  );
  const screenOptions = useDefaultScreenOptions({
    title: 'Pagamento',
  });

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
