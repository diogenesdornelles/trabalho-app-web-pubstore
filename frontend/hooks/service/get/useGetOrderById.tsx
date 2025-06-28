import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../useApi';

export function useGetOrderById(order_id: string) {
  const { order } = useApi();
  return useQuery({
    queryFn: () => order.getOne(order_id),
    queryKey: ['order', 'getOne', order_id],
    enabled: !!order_id,
  });
}
