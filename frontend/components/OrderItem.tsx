import { cssVar } from '@/constants/css';
import { OrderProps } from '@/domain/interfaces/Order.interface';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
interface OrderItemProps {
  order: OrderProps;
  index: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, index }) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId}>Pedido #{order.id.substring(0, 8)}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Items:</Text>
          <Text style={styles.value}>{totalItems}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>${totalPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.label}>Status:</Text>
          <View
            style={[
              styles.statusBadge,
              order.payment_status === 'paid' ? styles.paidStatus : styles.pendingStatus,
            ]}
          >
            <Text style={styles.statusText}>{getOrderStatus(order.payment_status)}</Text>
          </View>
        </View>
      </View>
      {order.payment_status === 'pending' && (
        <Link
          href={{
            pathname: '/(app)/(payment)/[order_id]',
            params: { order_id: order.id },
          }}
          style={[styles.link, { marginHorizontal: 'auto', marginBottom: 30 }]}
          asChild
          onPress={e => e.stopPropagation()}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  link: {
    width: '100%',
    textDecorationLine: 'none',
    padding: 15,
  },
  evenItem: {
    backgroundColor: cssVar.color.darkGray,
  },
  oddItem: {
    backgroundColor: cssVar.color.black,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: cssVar.color.highlight + '30',
    paddingBottom: 8,
  },
  orderId: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
  },
  date: {
    fontSize: RFValue(12),
    color: cssVar.color.veryLightGray,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: RFValue(14),
    color: cssVar.color.veryLightGray,
  },
  value: {
    fontSize: RFValue(14),
    color: cssVar.color.white,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  paidStatus: {
    backgroundColor: '#2E7D32',
  },
  pendingStatus: {
    backgroundColor: '#FF8F00',
  },
  statusText: {
    fontSize: RFValue(12),
    color: cssVar.color.white,
    fontWeight: 'bold',
  },
  button: {
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
  buttonText: {
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
  },
});

export default OrderItem;
