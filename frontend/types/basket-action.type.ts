import { ItemInterface } from "@/interfaces/item.interface"
import { BasketStateType } from "./basket-state.type"

export type BasketActionType = {
    addItem: (item: ItemInterface) => void
    removeItem: (item: ItemInterface) => void
    updateUserId: (userId: BasketStateType['userId']) => void
    updateItem: (id: string, item: ItemInterface) => void
  }