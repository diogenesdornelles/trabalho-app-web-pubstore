import { useMutation } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { ProductOrderedCreateProps } from "@/interfaces/ProductOrdered.interface";

export function useCreateProductOrdered() {
  const { productOrdered } = useApi();
  return useMutation({
    mutationFn: async (data: ProductOrderedCreateProps) => {
      try {
        const result = await productOrdered.createOne(data);
        return result;
      } catch (error) {
        throw error;
      }
    },
  });
}