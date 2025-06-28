import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../useApi';

// Hook para buscar um produto específico pelo ID
export function useGetProductById(product_id: string) {
  const { product } = useApi();
  return useQuery({
    queryFn: () => product.getOne(product_id),
    queryKey: ['product', 'get', product_id],
    enabled: !!product_id,
  });
}
