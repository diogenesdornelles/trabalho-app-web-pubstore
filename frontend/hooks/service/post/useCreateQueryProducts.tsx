import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductQueryProps } from "@/domain/interfaces/Product.interface";
import { useApi } from "../../useApi";



// Hook para criar uma consulta via POST
export function useCreateQueryProducts() {
    const queryClient = useQueryClient();
    const { product } = useApi();
    return useMutation({
        mutationFn: (data: ProductQueryProps) => product.getMany(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products", "getAll"] });
        },
    })
}
