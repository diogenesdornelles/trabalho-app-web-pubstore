import { ProductBasketProps } from '@/interfaces/Product.interface';
import { BasketActionType } from '@/types/BasketAction.type';
import { BasketStateType } from '@/types/BasketState.type';
import 'react-native-get-random-values';
import { create } from 'zustand';

// armazena e gerencia o estado da cesta
const useBasketStore = create<BasketStateType & BasketActionType>((set) => ({
    customer_id: null,
    total_value: 0.0,
    products: [],
    addProduct: (product: ProductBasketProps) =>
        set((state) => {
            if (state.products.some((_product) => _product.id === product.id)) {
                // Se o produto já existe, atualiza a quantidade e o preço total
                const updatedProducts = state.products.map((_product) => {
                    if (_product.id === product.id) {
                        return {
                            ..._product,
                            quantity: (_product.quantity || 0) + (product.quantity || 1), // Incrementa a quantidade
                            total_price: (_product.price || 0) * ((_product.quantity || 0) + (product.quantity || 1)), // Atualiza o preço total
                        };
                    }
                    return _product;
                });
                const updatedTotal = updatedProducts.reduce((sum, _product) => sum + _product.total_price, 0);
                return {
                    products: updatedProducts,
                    total_value: updatedTotal,
                };
            }
            // Se o produto não existe, adiciona um novo produto        
            const newProduct: ProductBasketProps = {
                ...product,
                quantity: product.quantity ? product.quantity : 1, 
                customer_id: state.customer_id,
                total_price: product.price * product.quantity,
            };
            const updatedProducts = [...state.products, newProduct];
            const updatedTotal = updatedProducts.reduce((sum, _product) => sum + _product.total_price, 0);
            return {
                products: updatedProducts,
                total_value: updatedTotal,
            };
        }),
    removeProduct: (product: ProductBasketProps) =>
        set((state) => {
            const updatedProducts = state.products.filter((_product) => _product.id !== product.id);
            const updatedTotal = updatedProducts.reduce((sum, product) => sum + product.total_price, 0);
            return {
                products: updatedProducts,
                total_value: updatedTotal,
            };
        }),
    clear: () => set(() => ({ products: [], total_value: 0 })),
    updateCustomerId: (customer_id: string | null) => set(() => ({ customer_id: customer_id })),
    updateProduct: (id: string, product: ProductBasketProps) => set((state) => {
        const updatedProducts = state.products.map((_product) => {
            if (_product.id === id) {
                return {
                    ..._product,
                    ...product,
                    total_price: product.price * product.quantity,
                };
            }
            return _product;
        });
        const updatedTotal = updatedProducts.reduce((sum, product) => sum + product.total_price, 0);
        return {
            products: updatedProducts,
            total_value: updatedTotal,
        };
    }),
}))



export default useBasketStore