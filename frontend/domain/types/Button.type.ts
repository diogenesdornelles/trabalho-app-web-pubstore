import { ProductBasketProps } from '@/domain/interfaces/Product.interface';

export type ButtonType = {
  text: string;
  url: ProductBasketProps['type'] | 'home' | 'orders' | 'basket' | 'search';
};
