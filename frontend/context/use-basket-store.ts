import { BasketStateType } from '@/types/basket-state.type'
import 'react-native-get-random-values'
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { ItemInterface } from '@/interfaces/item.interface';
import { BasketActionType } from '@/types/basket-action.type';

// Create your store, which includes both state and (optionally) actions
const useBasketStore = create<BasketStateType & BasketActionType>((set) => ({
    id: uuidv4(),  // id e userId são armazenados na máquina
    userId: null,
    totalValue: 0.0,
    items: [],
    createdAt: new Date(),
    addItem: (item: ItemInterface) =>
        set((state) => {
            const newItem: ItemInterface = {
                ...item,
                quantity: item.quantity ? item.quantity : 1, 
                userId: state.userId,
                createdAt: new Date(),
                totalPrice: item.price * item.quantity,
            };
            const updatedItems = [...state.items, newItem];
            const updatedTotal = updatedItems.reduce((sum, _item) => sum + _item.totalPrice, 0);
            return {
                items: updatedItems,
                totalValue: updatedTotal,
            };
        }),
    removeItem: (item: ItemInterface) =>
        set((state) => {
            const updatedItems = state.items.filter((_item) => _item.id !== item.id);
            const updatedTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
            return {
                items: updatedItems,
                totalValue: updatedTotal,
            };
        }),
    updateUserId: (userId: string | null) => set(() => ({ userId: userId })),
    updateItem: (id: string, item: ItemInterface) =>   set((state) => {
        const updatedItems = state.items.filter((_item) => {
            if (_item.id === id) {
                const newItem: ItemInterface = {
                    ...item,
                    totalPrice: item.price * item.quantity,
                };

                return {
                    ..._item,
                    ...newItem
                }
            } else return _item
        });
        const updatedTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
        return {
            items: updatedItems,
            totalValue: updatedTotal,
        };
    }),
}))



export default useBasketStore