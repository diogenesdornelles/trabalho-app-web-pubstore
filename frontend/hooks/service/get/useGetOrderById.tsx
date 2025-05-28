import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../useApi';

export function useGetOrderById(id: string) {
  const { order } = useApi();
  return useQuery({
    queryFn: () => order.getOne(id),
    queryKey: ['order', 'getOne', id],
  });
}
