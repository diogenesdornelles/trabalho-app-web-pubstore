import { ButtonType } from "@/types/button.type";
import BasketIcon from "@/components/basket-icon";
import Button from "@/components/button";
import Page from "@/components/page";



export default function Menu() {

   const buttons: ButtonType[] = [
      {
         text: 'Chopps',
         type: 'chopp'
      },
      {
         text: 'Drinks',
         type: 'drink'
      },
      {
         text: 'Sparklings',
         type: 'sparkling'
      },
      {
         text: 'Wines',
         type: 'wine'
      },

   ]

   return (
      <Page title="Menu" type="scrollView" customStyle={{}} blurSettings={{}}>
         <BasketIcon />
         {buttons.map((button) => {
            return (
               <Button key={button.text} text={button.text} pathname='/(items)/[type]' params={{ type: button.type }} />
            )
         })}
      </Page>
   )
}
