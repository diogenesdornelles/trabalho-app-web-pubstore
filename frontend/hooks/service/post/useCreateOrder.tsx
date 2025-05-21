import { OrderCreateProps } from '@/domain/interfaces/Order.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../../useApi';

export function useCreateOrder() {
  const { order } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: OrderCreateProps) => {
      try {
        const result = await order.createOne(data);
        return result;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ['orders', 'getByCustomer', variables.customer_id],
      });

      queryClient.refetchQueries({
        queryKey: ['orders', 'getByCustomer', variables.customer_id],
      });
    },
    onError: error => {
      console.error('Error creating order:', error);
    },
  });
}
