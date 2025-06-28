import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../useApi';

export function useGetOrdersByCustomerId(customer_id: string, enable: boolean = true) {
  const { order } = useApi();
  return useQuery({
    queryFn: () => order.getByCustomerId(customer_id),
    queryKey: ['orders', 'getByCustomer', customer_id],
    enabled: !!customer_id,
  });
}
