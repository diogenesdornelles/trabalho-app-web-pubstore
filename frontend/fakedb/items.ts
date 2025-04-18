import { ItemInterface } from "@/interfaces/item.interface";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

export const items: ItemInterface[] = [
    {
        id: uuidv4(),
        userId: null,
        name: "Chopp SUD PREMIUM LAGER puro malte 500ml",
        description: "A primeira Pilsen artesanal da Serra Gaúcha em embalagem família! Aroma ligeiramente adocicado, corpo leve e refrescante, amargor perene de lúpulos Alemães nobres. A cerveja clássica que carrega o espírito Sul-Riograndense.",
        alcoholContent: 5, 
        ibu: 12,
        price: 15,
        type: 'chopp',
        disponible: true,
        source: null,
        quantity: 0,
        totalPrice: 0,
        volume: 500,
        createdAt: null
    },
    {
        id: uuidv4(),
        userId: null,
        name: "Chopp SUD IPA 1L",
        description: "A SUD IPA internacionalmente premiada em uma embalagem feita para dividir, como entendiam os criadores do estilo. Aroma intenso de abacaxi, toranja e resina proveniente do blend de lúpulos americanos utilizado no Dry Hopping. Amargor marcante mas redondo, faz essa cerveja impactante e extremamente bebível. ",
        price: 17,
        type: 'chopp',
        alcoholContent: 6.4, 
        ibu: 60,
        disponible: true,
        source: null,
        quantity: 100,
        totalPrice: 0,
        volume: 1000,
        createdAt: null

    },
    {
        id: uuidv4(),
        userId: null,
        name: "Chopp SUD PREMIUM LAGER puro malte 500ml",
        description: "A primeira Pilsen artesanal da Serra Gaúcha em embalagem família! Aroma ligeiramente adocicado, corpo leve e refrescante, amargor perene de lúpulos Alemães nobres. A cerveja clássica que carrega o espírito Sul-Riograndense.",
        alcoholContent: 5, 
        ibu: 12,
        price: 15,
        type: 'chopp',
        disponible: true,
        source: null,
        quantity: 0,
        totalPrice: 0,
        volume: 500,
        createdAt: null
    },
    {
        id: uuidv4(),
        userId: null,
        name: "Chopp SUD IPA 1L",
        description: "A SUD IPA internacionalmente premiada em uma embalagem feita para dividir, como entendiam os criadores do estilo. Aroma intenso de abacaxi, toranja e resina proveniente do blend de lúpulos americanos utilizado no Dry Hopping. Amargor marcante mas redondo, faz essa cerveja impactante e extremamente bebível. ",
        price: 17,
        type: 'chopp',
        alcoholContent: 6.4, 
        ibu: 60,
        disponible: true,
        source: null,
        quantity: 100,
        totalPrice: 0,
        volume: 1000,
        createdAt: null

    }
];