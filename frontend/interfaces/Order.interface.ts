import { ProductOrderedProps } from "./ProductOrdered.interface"

export interface OrderCreateProps {
    customer_id: string
}

export interface OrderProps {
    id: string
    created_at: string
    payment_status: string
    customer_id: string
    ordered_products: ProductOrderedProps[]
}