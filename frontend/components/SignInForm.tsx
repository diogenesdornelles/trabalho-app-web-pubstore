import { cssVar } from '@/constants/css';
import useSession from '@/hooks/useSession';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';


export const SignInForm = () => {
  const router = useRouter();
  const SignupSchema = Yup.object().shape({
    cpf: Yup.string()
      .transform((value) => value.replace(/\D/g, ''))
      .matches(/^\d{11}$/, 'CPF deve conter 11 dígitos')
      .required('Obrigatório'),
    password: Yup.string()
      .min(2, 'Muito curta!')
      .max(50, 'Muito longa!')
      .required('Obrigatório'),
  });
  const { signIn } = useSession();
  const [error, setError] = useState(false);

  const handleSignIn = (success: boolean) => {
    if (success) {
      Alert.alert(
        'Sucesso',
        'Você está logado com sucesso!',
        [{
          text: 'OK',
          onPress: () => router.push('/home'),
          style: 'cancel',
        }]
      );
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <Formik
      initialValues={{ cpf: '', password: '' }}
      onSubmit={async (values) => handleSignIn(await signIn(values.cpf, values.password))}
      validationSchema={SignupSchema}
    >
      {({
        handleChange,
        handleBlur,
        submitForm,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.form}>
          <Text style={styles.title}>Sign-in</Text>
          <Text style={styles.message}>Informe CPF e senha</Text>
          <View style={styles.inputRow}>
            <Text style={styles.label} nativeID="labelcpf">cpf</Text>
            <TextInput
              placeholder="cpf"
              onChangeText={handleChange('cpf')}
              onBlur={handleBlur('cpf')}
              value={values.cpf}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            {touched.cpf && errors.cpf && (
              <Text style={styles.errorText}>{errors.cpf}</Text>
            )}
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label} nativeID="labelPwd">Senha</Text>
            <TextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
              secureTextEntry
              placeholderTextColor="#aaa"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          {error && <Text style={styles.errorText}>CPF ou senha errados</Text>}
          <TouchableOpacity onPress={() => submitForm()} style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: cssVar.color.white,
    width: '90%',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: cssVar.color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: RFValue(24, 540),
    fontWeight: 'bold',
    marginBottom: 10,
    color: cssVar.color.gray,
  },
  message: {
    fontSize: RFValue(14, 540),
    color: cssVar.color.semiGray,
    marginBottom: 20,
  },
  inputRow: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: RFValue(14, 540),
    color: cssVar.color.gray,
    marginBottom: 5,
  },
  input: {
    backgroundColor: cssVar.color.black,
    color: cssVar.color.white,
    width: '100%',
    height: 50,
    fontSize: 18,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  errorText: {
    color: cssVar.color.red,
    marginTop: 5,
    textAlign: 'center',
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
