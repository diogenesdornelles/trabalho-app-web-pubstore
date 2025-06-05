import { OrderCreateProps } from '@/domain/interfaces/Order.interface';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../useApi';

export function useCreateOrder() {
  const { order } = useApi();

  return useMutation({
    mutationFn: async (data: OrderCreateProps) => {
      try {
        const result = await order.createOne(data);
        return result;
      } catch (error) {
        throw error;
      }
    },
  });
}
