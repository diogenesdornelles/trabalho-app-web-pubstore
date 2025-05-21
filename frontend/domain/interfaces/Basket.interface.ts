import { ProductBasketProps } from './Product.interface';

export interface BasketProps {
  total_value: number;
  products: ProductBasketProps[];
  customer_id: string | null;
}
