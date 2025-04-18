import { FlatList } from "react-native"
import Item from "@/components/Item"
import { useAssets } from 'expo-asset';
import { useLocalSearchParams } from 'expo-router';
import { items } from "@/fakedb/items";
import { ItemInterface } from "@/interfaces/item.interface";
import BasketIcon from "@/components/basket-icon";
import Container from "@/components/container";
import ImageBackground from "@/components/image-background";
import Header from "@/components/header";


export default function Items() {
  const { type } = useLocalSearchParams();
  const [assets] = useAssets([
    require('@/assets/images/chopp-card.png')
  ]);



  let filteredItems: ItemInterface[] = []
  if (typeof type === 'string') {
    filteredItems = items.filter((item) => item.type === type)
    filteredItems = filteredItems.map((item) => {
      return {
        ...item,
        source: assets ? assets[0] : null
      }
    })
  }


  return (
    <Container>
      <Header title={typeof type === 'string' ? `${type}s` : 'Drinks'} />
      <ImageBackground
        customStyle={{ opacity: .9, filter: 'grayscale(90%)' }} // Removido o "filter: 'grayscale(100%)'" pois não é suportado
        blurSettings={{ intensity: 50, tint: 'systemUltraThinMaterialDark', radius: 0 }} // Removido "radius"
      />
      <BasketIcon />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item {...item} />}
      />
    </Container>
  )
}
