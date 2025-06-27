import CustomBackdrop from '@/components/CustomBackdrop';
import CustomHeader from '@/components/CustomHeader';
import Page from '@/components/Page';
import { useGetOrderById } from '@/hooks/service/get/useGetOrderById';
import { useLocalSearchParams } from 'expo-router';
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
    <Page header={<CustomHeader title="Detalhes" />} type="view">
      {(isPending || isLoading || isFetching || isRefetching) && <CustomBackdrop isOpen={true} />}
    </Page>
  );
}
