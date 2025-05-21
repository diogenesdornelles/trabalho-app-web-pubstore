import { useQuery } from '@tanstack/react-query';

import { useApi } from '../../useApi';

// Hook para buscar todos os produtos
export function useGetAllProducts() {
  const { product } = useApi();
  return useQuery({
    queryFn: () => product.getAll(),
    queryKey: ['products', 'getAll'],
  });
}
