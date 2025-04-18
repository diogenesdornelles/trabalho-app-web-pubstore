import { Asset } from "expo-asset";

export interface ItemInterface {
    id: string;
    userId: string | null;
    name: string;
    description: string;
    price: number;
    alcoholContent: number, 
    ibu: number,
    type: 'chopp' | 'wine' | 'drink' | 'sparkling';
    disponible: boolean;
    quantity: number;
    totalPrice: number;
    volume: number;
    createdAt: Date | null;
    source: Asset | null
}