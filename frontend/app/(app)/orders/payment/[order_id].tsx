import CustomBackdrop from '@/components/CustomBackdrop';
import CustomHeader from '@/components/CustomHeader';
import Page from '@/components/Page';
import { useGetOrderById } from '@/hooks/service/get/useGetOrderById';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import OrderItem from '@/components/OrderItem';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { cssVar } from '@/constants/css';
import { RFValue } from 'react-native-responsive-fontsize';
import { usePutOrder } from '@/hooks/service/put/usePutOrder';

const PaymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Número do cartão inválido')
    .required('Obrigatório'),
  brand: Yup.string().oneOf(['visa', 'master'], 'Bandeira inválida').required('Obrigatório'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato MM/AA')
    .required('Obrigatório'),
  ccv: Yup.string()
    .matches(/^\d{3}$/, 'CCV inválido')
    .required('Obrigatório'),
  holder: Yup.string().required('Obrigatório'),
});

export default function Payment() {
  const { order_id } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: orderData,
    isPending: isPendingOrder,
    error: errorOrder,
    isFetching: isFetchingOrder,
    isRefetching: isRefetchingOrder,
    isLoading: isLoadingOrder,
    refetch: refetchOrder,
  } = useGetOrderById(order_id as string);

  const { mutateAsync: putOrder, isPending: isPendingPutOrder } = usePutOrder();

  const handleSubmit = async (values: any) => {
    await putOrder(
      {
        order_id: order_id as string,
        data: { payment_status: 'paid' },
      },
      {
        onSuccess: () => {
          Alert.alert('Pagamento', 'Pagamento realizado com sucesso!', [
            {
              text: 'OK',
              onPress: () => {
                router.push('/orders');
              },
            },
          ]);
        },
        onError: (error: any) => {
          console.error('Erro ao realizar pagamento:', error);
          Alert.alert('Erro', `Falha ao realizar pagamento: ${error.message}`, [
            {
              text: 'Tentar novamente',
              onPress: () => handleSubmit(values),
            },
            {
              text: 'OK',
              style: 'cancel',
            },
          ]);
        },
      }
    );
  };

  useEffect(() => {
    if (
      errorOrder &&
      order_id &&
      !isFetchingOrder &&
      !isRefetchingOrder &&
      !isLoadingOrder &&
      !isPendingPutOrder
    ) {
      console.error('Error fetching order details:', errorOrder);
      Alert.alert('Erro', `Falha ao carregar detalhes`, [
        {
          text: 'Tentar novamente',
          onPress: () => refetchOrder(),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }
  }, [
    errorOrder,
    refetchOrder,
    isFetchingOrder,
    isRefetchingOrder,
    isLoadingOrder,
    order_id,
    isPendingPutOrder,
  ]);

  if (!order_id) {
    return null;
  }

  return (
    <Page header={<CustomHeader title="Pagamento" />} type="view">
      {(isPendingOrder ||
        isLoadingOrder ||
        isFetchingOrder ||
        isRefetchingOrder ||
        isPendingPutOrder) && <CustomBackdrop isOpen={true} />}
      <ScrollView>
        {orderData && <OrderItem order={orderData} forPay />}
        <Formik
          initialValues={{
            cardNumber: '',
            brand: '',
            expiry: '',
            ccv: '',
            holder: '',
          }}
          validationSchema={PaymentSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, submitForm, values, errors, touched, setFieldValue }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Número do cartão</Text>
              <TextInput
                placeholder="Número do cartão"
                keyboardType="numeric"
                maxLength={16}
                onChangeText={handleChange('cardNumber')}
                onBlur={handleBlur('cardNumber')}
                value={values.cardNumber}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              {touched.cardNumber && errors.cardNumber && (
                <Text style={styles.error}>{errors.cardNumber}</Text>
              )}

              <Text style={styles.label}>Bandeira</Text>
              <Picker
                selectedValue={values.brand}
                onValueChange={value => setFieldValue('brand', value)}
                style={[styles.input, { height: 60, borderRadius: 8 }]}
                dropdownIconColor={cssVar.color.white}
              >
                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Visa" value="visa" />
                <Picker.Item label="Master" value="master" />
              </Picker>
              {touched.brand && errors.brand && <Text style={styles.error}>{errors.brand}</Text>}

              <Text style={styles.label}>Validade (MM/AA)</Text>
              <TextInput
                placeholder="MM/AA"
                maxLength={5}
                onChangeText={handleChange('expiry')}
                onBlur={handleBlur('expiry')}
                value={values.expiry}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              {touched.expiry && errors.expiry && <Text style={styles.error}>{errors.expiry}</Text>}

              <Text style={styles.label}>CCV</Text>
              <TextInput
                placeholder="CCV"
                keyboardType="numeric"
                maxLength={3}
                onChangeText={handleChange('ccv')}
                onBlur={handleBlur('ccv')}
                value={values.ccv}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              {touched.ccv && errors.ccv && <Text style={styles.error}>{errors.ccv}</Text>}

              <Text style={styles.label}>Titular</Text>
              <TextInput
                placeholder="Nome do titular"
                onChangeText={handleChange('holder')}
                onBlur={handleBlur('holder')}
                value={values.holder}
                style={styles.input}
                placeholderTextColor="#aaa"
              />
              {touched.holder && errors.holder && <Text style={styles.error}>{errors.holder}</Text>}

              <TouchableOpacity
                onPress={submitForm}
                style={styles.button}
                disabled={isLoadingOrder}
              >
                {!isLoadingOrder && !isFetchingOrder && !isLoadingOrder && !isPendingPutOrder ? (
                  <Text style={styles.buttonText}>Pagar</Text>
                ) : (
                  <ActivityIndicator size="large" color={cssVar.color.highlight} animating={true} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: cssVar.color.white,
    width: '100%',
    padding: 10,
    borderRadius: 0,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: RFValue(14, 540),
    color: cssVar.color.gray,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: cssVar.color.backgroundDark,
    color: cssVar.color.white,
    width: '100%',
    height: 50,
    fontSize: 18,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  error: {
    color: cssVar.color.red,
    marginBottom: 10,
    alignSelf: 'flex-start',
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
