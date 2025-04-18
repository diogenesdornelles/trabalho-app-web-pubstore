import { ItemInterface } from "./item.interface";


export interface ItemSimpleViewPropsInterface extends Omit<ItemInterface, 'createdAt' | 'totalValue' | 'quantity' | 'userId' | 'description'> {
  additionalProperty?: string;
}
