export interface ProductOrderedCreateProps {
    quantity: number
    product_id: string 
    order_id: string
}


export interface ProductOrderedProps {
    id: string
    created_at: string
    name: string
    description: string
    price: number
    type: string
    quantity: number
    product_id: string 
    order_id: string
}