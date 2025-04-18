import { View, ScrollView, StyleSheet } from "react-native";


export default function Container({ children, type = 'view', onLayoutRootView }: { children: React.ReactNode, type?: 'view' | 'scrollView', onLayoutRootView?: () => void }) {

    if (type === 'view') {
        return (
            <View style={styles.container} onLayout={onLayoutRootView}>
                {children}
            </View>
        );
    } else {
        return (
            <ScrollView contentContainerStyle={styles.container} onLayout={onLayoutRootView}>
                {children}
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    }
})