import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { OrderCreateProps } from "@/interfaces/Order.interface";


export function useCreateOrder() {
  const { order } = useApi();
  return useMutation({
    mutationFn: async (data: OrderCreateProps) => {
      try {
        const result = await order.createOne(data);
        return result;
      } catch (error) {
        throw error;
      }
    }, onSuccess: (data, vars, ctx) => {
      // Aqui você pode adicionar lógica de sucesso, como atualizar o cache ou exibir uma mensagem
      console.log("Order created successfully:", data);
    }, onError: (error) => {
      // Aqui você pode adicionar lógica de erro, como exibir uma mensagem de erro
      console.error("Error creating order:", error);
    }
  });
}

export function useGetOrdersById(customer_id: string) {
    const { order  } = useApi();
    return useQuery({
      queryFn: () => order.getByCustomerId(customer_id), 
      queryKey: ["product", "get", customer_id], 
    });
  }