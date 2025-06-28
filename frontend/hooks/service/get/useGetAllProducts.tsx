import { useQuery } from '@tanstack/react-query';

import { useApi } from '../../useApi';

// Hook para buscar todos os produtos
export function useGetAllProducts(enable: boolean = true) {
  const { product } = useApi();
  return useQuery({
    queryFn: () => product.getAll(),
    queryKey: ['products', 'getAll'],
    enabled: enable,
  });
}
