import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';
import { cssVar } from '@/constants/css';

export default function CustomBackdrop({ isOpen }: { isOpen: boolean }) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={isOpen}
        >
            <View style={styles.backdrop}>
                <ActivityIndicator size="large" color={cssVar.color.white} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});