import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import { ProductQueryProps } from "@/interfaces/Product.interface";
import { useApi } from "./useApi";

// Hook para buscar todos os produtos
export function useGetAllProducts() {
  const { product  } = useApi();
  return useQuery({
    queryFn: () => product.getAll(), 
    queryKey: ["product", "getAll"],   
  });
}

// Hook para criar uma consulta via POST
export function useQueryProducts() {
    const queryClient = useQueryClient();
    const { product  } = useApi();
    return useMutation({
      mutationFn: (data: ProductQueryProps) => product.getMany(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["product", "getMany"], exact: false });
      },
  })}

// Hook para buscar um produto específico pelo ID
export function useGetProduct(id: string) {
    const { product  } = useApi();
    return useQuery({
      queryFn: () => product.getOne(id), 
      queryKey: ["product", "get", id], 
    });
  }



