import { useMutation, useQueryClient } from '@tanstack/react-query';

import useBasketStore from '@/hooks/useBasketStore';
import { useApi } from '@/hooks/useApi';

export function useDeleteOrder() {
  const state = useBasketStore(state => state);
  const { order } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order_id: string) => {
      try {
        const result = await order.deleteOne(order_id);
        return result;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders', 'getByCustomer', state.customer_id],
        exact: false,
      });

      queryClient.refetchQueries({
        queryKey: ['orders', 'getByCustomer', state.customer_id],
      });
    },
    onError: error => {
      console.error('Error creating order:', error);
    },
  });
}
