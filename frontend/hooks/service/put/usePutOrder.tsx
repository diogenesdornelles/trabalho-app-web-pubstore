import { OrderUpdateProps } from '@/domain/interfaces/Order.interface';
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../useApi';

export function usePutOrder() {
  const { order } = useApi();

  return useMutation({
    mutationFn: async ({ order_id, data }: { order_id: string; data: OrderUpdateProps }) => {
      try {
        const result = await order.updateOne(order_id, data);
        return result;
      } catch (error) {
        throw error;
      }
    },
  });
}
