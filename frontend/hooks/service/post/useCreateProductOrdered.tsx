import { ProductOrderedCreateProps } from "@/domain/interfaces/ProductOrdered.interface";
import { useMutation } from "@tanstack/react-query";
import { useApi } from "../../useApi";

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