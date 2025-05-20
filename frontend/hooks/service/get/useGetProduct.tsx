import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../useApi";


// Hook para buscar um produto específico pelo ID
export function useGetProduct(id: string) {
    const { product  } = useApi();
    return useQuery({
      queryFn: () => product.getOne(id), 
      queryKey: ["product", "get", id], 
    });
  }