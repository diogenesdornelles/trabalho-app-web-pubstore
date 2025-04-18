import { ItemInterface } from "./item.interface"


export interface BasketInterface {
    id: string
    totalValue: number
    items: ItemInterface[]
    createdAt: Date
    userId: string | null
}