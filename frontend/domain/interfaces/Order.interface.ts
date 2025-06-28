import { ProductOrderedProps } from './ProductOrdered.interface';
export type OrderPaymentStatus = 'paid' | 'pending' | 'cancelled' | 'refunded' | 'chargeback';

export interface OrderCreateProps {
  customer_id: string;
}

export interface OrderUpdateProps {
  payment_status: OrderPaymentStatus;
}

export interface OrderProps {
  id: string;
  created_at: string;
  payment_status: OrderPaymentStatus;
  customer_id: string;
  ordered_products: ProductOrderedProps[];
}
