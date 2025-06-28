import { cssVar } from '@/constants/css';
import { OrderProps } from '@/domain/interfaces/Order.interface';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDeleteOrder } from '@/hooks/service/delete/useDeleteOrder';
interface OrderItemProps {
  order: OrderProps;
  forPay?: boolean;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, forPay = false }) => {
  const { mutate, isPending, isSuccess, isError } = useDeleteOrder();
  const totalItems = order.ordered_products.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = order.ordered_products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const formattedDate = new Date(order.created_at).toLocaleDateString('pt-BR');

  const getOrderStatus = (sts: string) => {
    switch (sts) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      default:
        return 'Cancelado';
    }
  };

  useEffect(() => {
    if (isError) {
      Alert.alert('Erro', `Ocorreu um erro ao deletar seu pedido`, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }
  }, [isError]);

  useEffect(() => {
    if (isPending) {
      Alert.alert('Processando', 'Deletando pedido. Por favor, aguarde.');
    }
  }, [isPending]);

  useEffect(() => {
    if (isSuccess) {
      Alert.alert('Sucesso', 'Seu pedido foi deletado.');
    }
  }, [isSuccess]);

  const handleRemove = () => {
    Alert.alert('Remover Produto', `Deseja remover Pedido n. ${order.id.substring(0, 8)}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Deletar',
        onPress: () => mutate(order.id),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.orderItemContainer}>
      <View style={styles.orderItemHeader}>
        <Text style={styles.orderItemOrderId}>Pedido #{order.id.substring(0, 8)}</Text>
        <Text style={styles.orderItemDate}>{formattedDate}</Text>
        {!forPay && order.payment_status !== 'paid' && (
          <TouchableOpacity onPress={handleRemove} style={styles.orderItemRemoveButton}>
            <Ionicons name="trash" size={24} color={cssVar.color.red} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.orderItemDetails}>
        <View style={styles.orderItemDetailRow}>
          <Text style={styles.orderItemLabel}>Items:</Text>
          <Text style={styles.orderItemValue}>{totalItems}</Text>
        </View>

        <View style={styles.orderItemDetailRow}>
          <Text style={styles.orderItemLabel}>Total:</Text>
          <Text style={styles.orderItemValue}>${totalPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.orderItemStatusContainer}>
          <Text style={styles.orderItemLabel}>Status:</Text>
          <View
            style={[
              styles.orderItemStatusBadge,
              order.payment_status === 'paid'
                ? styles.orderItemPaidStatus
                : styles.orderItemPendingStatus,
            ]}
          >
            <Text style={styles.orderItemStatusText}>{getOrderStatus(order.payment_status)}</Text>
          </View>
        </View>
      </View>
      {order.payment_status === 'pending' && !forPay && (
        <Link
          href={{
            pathname: '/orders/payment/[order_id]',
            params: { order_id: order.id },
          }}
          style={[styles.orderItemLink, { marginHorizontal: 'auto', marginBottom: 30 }]}
          asChild
          onPress={e => e.stopPropagation()}
        >
          <TouchableOpacity style={styles.orderItemButton}>
            <Text style={styles.orderItemButtonText}>Pagar</Text>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItemContainer: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
    padding: 16,
    backgroundColor: cssVar.color.darkGray,
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderItemLink: {
    width: '100%',
    textDecorationLine: 'none',
    padding: 15,
  },
  orderItemEvenItem: {
    backgroundColor: cssVar.color.darkGray,
  },
  orderItemOddItem: {
    backgroundColor: cssVar.color.black,
  },
  orderItemHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: cssVar.color.highlight + '30',
    paddingBottom: 8,
  },
  orderItemOrderId: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
  },
  orderItemDate: {
    fontSize: RFValue(12),
    color: cssVar.color.veryLightGray,
  },
  orderItemDetails: {
    gap: 8,
  },
  orderItemDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderItemLabel: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
  },
  orderItemValue: {
    fontSize: RFValue(14),
    color: cssVar.color.white,
    fontWeight: '600',
  },
  orderItemStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  orderItemStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  orderItemPaidStatus: {
    backgroundColor: '#2E7D32',
  },
  orderItemPendingStatus: {
    backgroundColor: '#FF8F00',
  },
  orderItemStatusText: {
    fontSize: RFValue(12),
    color: cssVar.color.white,
    fontWeight: 'bold',
  },
  orderItemButton: {
    backgroundColor: cssVar.color.black,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: cssVar.color.highlight,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  orderItemButtonText: {
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
  },
  orderItemRemoveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: RFValue(4),
    borderRadius: RFValue(4),
  },
});

export default OrderItem;
