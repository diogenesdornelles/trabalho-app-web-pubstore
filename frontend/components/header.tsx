import { Stack } from "expo-router";
import UserIcon from "./user-icon";
import { cssVar } from "@/constants/css";


export default function Header({ title }: { title: string }) {
    return (
        <Stack.Screen
            options={{
                title: title,
                headerStyle: { backgroundColor: cssVar.color.black },
                headerTitleStyle: { color: cssVar.color.gold, },
                animation: 'fade',
                headerTintColor: cssVar.color.white,
                headerShown: true,
                contentStyle: {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    alignContent: 'center'

                },
                headerRight: () => <UserIcon />,
            }}
        />
    )
}