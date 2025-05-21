import { ProductBasketProps } from '@/domain/interfaces/Product.interface';
import { BasketStateType } from './BasketState.type';

export type BasketActionType = {
  addProduct: (product: ProductBasketProps) => void;
  removeProduct: (product: ProductBasketProps) => void;
  updateCustomerId: (customer_id: BasketStateType['customer_id']) => void;
  updateProduct: (id: string, product: ProductBasketProps) => void;
  clear: () => void;
};
