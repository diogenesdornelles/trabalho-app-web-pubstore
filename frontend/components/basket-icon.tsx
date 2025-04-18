import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import useBasketStore from '@/context/use-basket-store';
import { cssVar } from '@/constants/css';


export default function BasketIcon() {
    const quantity = useBasketStore((state) => state.items.length);
    return (
        <Link 
        style={styles.link}
        href="/basket"
        asChild>
            <TouchableOpacity activeOpacity={.7} style={styles.button} > 
                <Text style={styles.icon}>{quantity}</Text>
                {quantity > 0 ? <SimpleLineIcons name="basket-loaded" size={30} color="white" />
                    : <SimpleLineIcons name="basket" size={30} color="white" />}
            </TouchableOpacity>
        </Link>

    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 70,
        height: 70,
        backgroundColor: cssVar.color.black,
    },
    icon: {
        color: cssVar.color.gold,
    },
    link: {
        position: 'absolute',
        top: 30,
        right: 10,
        borderRadius: '50%',
        borderWidth: 1,
        borderColor: cssVar.color.gold,
        padding: 0,
        zIndex: 10
    }
})
