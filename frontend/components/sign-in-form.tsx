import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useSession from '@/hooks/use-session';
import { useRouter } from 'expo-router';
import { RFValue } from 'react-native-responsive-fontsize';
import { cssVar } from '@/constants/css';

export const SignInForm = () => {
  const router = useRouter();
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too short!')
      .max(50, 'Too long!')
      .required('Required'),
    pwd: Yup.string()
      .min(2, 'Too short!')
      .max(50, 'Too long!')
      .required('Required'),
  });
  const { signIn } = useSession();
  const [error, setError] = useState(false);

  const handleSignIn = (success: boolean) => {
    if (success) {
      router.replace('/home');
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', pwd: '' }}
      onSubmit={(values) => handleSignIn(signIn(values.username, values.pwd))}
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
          <Text style={styles.message}>Enter username and password</Text>
          <View style={styles.inputRow}>
            <Text style={styles.label} nativeID="labelUsername">Username</Text>
            <TextInput
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label} nativeID="labelPwd">Password</Text>
            <TextInput
              placeholder="Password"
              onChangeText={handleChange('pwd')}
              onBlur={handleBlur('pwd')}
              value={values.pwd}
              style={styles.input}
              secureTextEntry
              placeholderTextColor="#aaa"
            />
            {touched.pwd && errors.pwd && (
              <Text style={styles.errorText}>{errors.pwd}</Text>
            )}
          </View>
          {error && <Text style={styles.errorText}>Wrong password or username</Text>}
          <TouchableOpacity onPress={() => submitForm()} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
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
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    // Sombreamento para iOS e Android
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
    borderRadius: 8,
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cssVar.color.gold,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFValue(16, 540),
    fontWeight: 'bold',
    color: cssVar.color.gold,
  },
});
