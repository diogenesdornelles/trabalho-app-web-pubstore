import CustomBackdrop from '@/components/CustomBackdrop';
import Page from '@/components/Page';
import Product from '@/components/Product';
import { cssVar } from '@/constants/css';
import { ProductQueryProps } from '@/domain/interfaces/Product.interface';
import { useCreateQueryProducts } from '@/hooks/service/post/useCreateQueryProducts';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import { FlashList } from '@shopify/flash-list';
import CustomHeader from '@/components/CustomHeader';

const SearchSchema = Yup.object().shape({
  name: Yup.string().notRequired(),
  brand: Yup.string().notRequired(),
  description: Yup.string().notRequired(),
  min_price: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, 'Deve ser um número com até 2 casas decimais')
    .notRequired(),
  max_price: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, 'Deve ser um número com até 2 casas decimais')
    .notRequired(),
  product_type: Yup.string()
    .oneOf(['chopp', 'wine', 'beer', 'sparkling', 'whiskey'], 'Tipo inválido')
    .notRequired(),
});

type SearchSchemaType = Yup.InferType<typeof SearchSchema>;

export default function Search() {
  const router = useRouter();
  const {
    data,
    isPending,
    isError,
    mutateAsync: queryProducts,
    reset: resetSearch,
  } = useCreateQueryProducts();

  useEffect(() => {
    if (isError) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar produtos', [
        { text: 'OK', style: 'cancel', onPress: () => router.push('/home') },
      ]);
    }
  }, [isError, router]);

  const handleSearch = async (values: SearchSchemaType) => {
    const searchParams = {
      ...values,
      min_price: values.min_price ? parseFloat(values.min_price) : undefined,
      max_price: values.max_price ? parseFloat(values.max_price) : undefined,
    };

    const filteredParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value !== undefined && value !== '')
    );

    await queryProducts(filteredParams as ProductQueryProps);
  };

  return (
    <Page header={<CustomHeader title="Pesquisar" />} type="view">
      {isPending && <CustomBackdrop isOpen={true} />}
      {data && (
        <>
          <View style={styles.searchClear}>
            <TouchableOpacity activeOpacity={0.7} onPress={resetSearch}>
              <MaterialIcons name="clear" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {data.length === 0 ? (
            <Text style={styles.searchTitle}>Nenhum produto encontrado</Text>
          ) : (
            <FlashList
              data={data}
              keyExtractor={(product, index) => `${product.id}-${index}-${product.price}`}
              renderItem={({ item }) => <Product {...item} />}
              estimatedItemSize={200}
              contentContainerStyle={styles.searchListContent}
            />
          )}
        </>
      )}

      {!data && (
        <Formik
          initialValues={{
            name: '',
            brand: '',
            description: '',
            min_price: '',
            max_price: '',
            product_type: undefined,
          }}
          onSubmit={handleSearch}
          validationSchema={SearchSchema}
        >
          {({ handleChange, handleBlur, submitForm, values, errors, touched, setFieldValue }) => (
            <View style={styles.searchForm}>
              <Text style={styles.searchTitle}>Buscar Produtos</Text>

              <View style={styles.searchInputRow}>
                <Text style={styles.searchLabel}>Nome</Text>
                <TextInput
                  placeholder="Nome"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.searchInput}
                  placeholderTextColor="#aaa"
                />
                {touched.name && errors.name && (
                  <Text style={styles.searchErrorText}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.searchInputRow}>
                <Text style={styles.searchLabel}>Descrição</Text>
                <TextInput
                  placeholder="Descrição"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  style={styles.searchInput}
                  placeholderTextColor="#aaa"
                />
                {touched.description && errors.description && (
                  <Text style={styles.searchErrorText}>{errors.description}</Text>
                )}
              </View>

              <View style={styles.searchInputRow}>
                <Text style={styles.searchLabel}>Preço mínimo</Text>
                <TextInput
                  placeholder="Preço mínimo"
                  keyboardType="numeric"
                  onChangeText={handleChange('min_price')}
                  onBlur={handleBlur('min_price')}
                  value={values.min_price}
                  style={styles.searchInput}
                  placeholderTextColor="#aaa"
                />
                {touched.min_price && errors.min_price && (
                  <Text style={styles.searchErrorText}>{errors.min_price}</Text>
                )}
              </View>

              <View style={styles.searchInputRow}>
                <Text style={styles.searchLabel}>Preço máximo</Text>
                <TextInput
                  placeholder="Preço máximo"
                  keyboardType="numeric"
                  onChangeText={handleChange('max_price')}
                  onBlur={handleBlur('max_price')}
                  value={values.max_price}
                  style={styles.searchInput}
                  placeholderTextColor="#aaa"
                />
                {touched.max_price && errors.max_price && (
                  <Text style={styles.searchErrorText}>{errors.max_price}</Text>
                )}
              </View>

              <View style={styles.searchInputRow}>
                <Text style={styles.searchLabel}>Tipo de Produto</Text>
                <Picker
                  selectedValue={values.product_type}
                  onValueChange={value => setFieldValue('product_type', value)}
                  style={[styles.searchInput, { height: 60, borderRadius: 8 }]}
                  dropdownIconColor={cssVar.color.white}
                >
                  <Picker.Item label="Todos" value={undefined} />
                  <Picker.Item label="Chopp" value="chopp" />
                  <Picker.Item label="Vinho" value="wine" />
                  <Picker.Item label="Cerveja" value="beer" />
                  <Picker.Item label="Espumante" value="sparkling" />
                  <Picker.Item label="Whiskey" value="whiskey" />
                </Picker>
                {touched.product_type && errors.product_type && (
                  <Text style={styles.searchErrorText}>{errors.product_type}</Text>
                )}
              </View>
              <TouchableOpacity onPress={submitForm} style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Buscar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  searchForm: {
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
  searchClear: {
    position: 'absolute',
    top: 60,
    left: 10,
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: cssVar.color.highlight,
    padding: 18,
    zIndex: 10,
    backgroundColor: cssVar.color.black,
    marginTop: 20,
    alignItems: 'center',
  },
  searchListContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchTitle: {
    fontSize: RFValue(24, 540),
    fontWeight: 'bold',
    marginBottom: 10,
    color: cssVar.color.gray,
  },
  searchInputRow: {
    width: '100%',
    marginBottom: 15,
  },
  searchLabel: {
    fontSize: RFValue(14, 540),
    color: cssVar.color.gray,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: cssVar.color.backgroundDark,
    color: cssVar.color.white,
    width: '100%',
    height: 50,
    fontSize: 18,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchErrorText: {
    color: cssVar.color.red,
    marginTop: 5,
    textAlign: 'center',
  },
  searchButton: {
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
  searchButtonText: {
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    color: cssVar.color.highlight,
  },
  searchButtonHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 0,
  },
  searchTextHeader: {
    color: cssVar.color.white,
    fontSize: 20,
  },
  searchLinkHeader: {
    width: 'auto',
  },
});
