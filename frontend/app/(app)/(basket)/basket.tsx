import Page from "@/components/page";
import useBasketStore from "@/context/use-basket-store";
import { Text } from "react-native";


export default function Basket() {
    const state = useBasketStore((state) => state);
    return (
        <Page title='Basket' customStyle={{ opacity: .8, filter: 'grayscale(80%)' }} blurSettings={{ intensity: 10, tint: 'systemUltraThinMaterialDark', radius: 4 }} >
            <Text>Basket</Text>
        </Page>
    );
}
