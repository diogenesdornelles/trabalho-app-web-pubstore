import { LoginProps } from "@/domain/interfaces/Login.interface";
import { OrderCreateProps, OrderProps } from "@/domain/interfaces/Order.interface";
import { ProductProps, ProductQueryProps } from "@/domain/interfaces/Product.interface";
import { ProductOrderedCreateProps, ProductOrderedProps } from "@/domain/interfaces/ProductOrdered.interface";
import { TokenProps } from "@/domain/interfaces/Token.interface";
import useClients from "@/hooks/useClients";
import { useMemo } from "react";

export function useApi() {
  const { restClient } = useClients();

  const order = useMemo(() => ({
    getOne: async (id: string): Promise<OrderProps> => {
      const { data } = await restClient.get(`orders/get_one/${id}`);
      return data;
    },

    getByCustomerId: async (customer_id: string): Promise<OrderProps[]> => {
      const { data } = await restClient.get(`orders/get_by_customer_id/${customer_id}`);
      return data;
    },

    createOne: async (order: OrderCreateProps): Promise<OrderProps> => {
      const { data } = await restClient.post("orders", order);
      return data;
    }

  }), [restClient]);


  const productOrdered = useMemo(() => ({

    createOne: async (product_ordered: ProductOrderedCreateProps): Promise<ProductOrderedProps> => {
      const { data } = await restClient.post("products_ordered", product_ordered);
      return data;
    }

  }), [restClient]);

  const product = useMemo(() => ({
    getAll: async (): Promise<ProductProps[]> => {
      const { data } = await restClient.get("products");
      return data;
    },
    getOne: async (id: string): Promise<ProductProps> => {
      const { data } = await restClient.get(`products/get_one/${id}`);
      return data;
    },
    getMany: async (product: ProductQueryProps): Promise<ProductProps[]> => {
      console.log(restClient.defaults.baseURL);
      const { data } = await restClient.get("products/many", { params: product });
      return data;
    },
  }), [restClient]);

  const login = useMemo(() => async ({ cpf, password }: LoginProps): Promise<TokenProps> => {
    try {
      const response = await restClient.post("login", { cpf, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [restClient]);

  return useMemo(() => ({ product, order, productOrdered, login }), [product, order, productOrdered, login]);
}