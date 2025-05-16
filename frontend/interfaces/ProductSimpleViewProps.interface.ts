import { ProductProps } from "./Product.interface";


export interface ProductSimpleViewProps extends Omit<ProductProps, 'created_at' | 'total_value' | 'quantity' | 'customer_id' | 'description' > {
  additionalProperty?: string;
}
