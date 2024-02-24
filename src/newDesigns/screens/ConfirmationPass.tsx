import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputButton } from '../components/InputButton';
import {
  fontBold,
  fontRegular,
  getWidth,
  fontSemiBold
} from '../../modules/dashboard/helpers/tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { InputText } from '../components/InputText';
import Colors from '../components/Colors';
import { useGlobalDataContext } from '../../context';
import axios, { AxiosError } from 'axios';
import { Formik } from 'formik';
import { isStrongPassword } from '../../app/helpers';
import { ScrollView } from 'native-base';
import { Dimensions } from 'react-native';

export default function ConfirmationPass() {
  const navigation = useNavigation();
  const { data, setData } = useGlobalDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const registerUser = async (values, actions) => {
    setIsLoading(true);
    const apiUrl = 'http://18.217.10.162/api/users/update-user';
    const headers = {
      Authorization: `${data.token}`,
      'Content-Type': 'application/json',
    };
    const body = { ...values };
    try {
      console.log({ body });
      const response = await axios.put(apiUrl, body, { headers });
      console.log('Register User -->:', response.data);
      setData(prevData => ({
        ...prevData,
        email: values.email,
      }));
      actions.resetForm();
      navigation.navigate('GameSelection');
    } catch (error) {
      console.log({ error });
      const axiosError = error as AxiosError;
      console.error('Error While Registering User:', axiosError);
      if (axiosError.response && axiosError.response.status === 400) {
        console.log('Email Exist');
        actions.setFieldError('email', 'Email Already Exists!');
      }
      actions.setSubmitting(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, height: '100%' }}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/justLogo.png')}
          />
          <Text style={styles.loginText}>{`Welcome, ${data.playerTag}`}</Text>
          <Text
            style={[
              fontRegular(4, Colors.gray3),
              {
                textAlign: 'center',
                marginVertical: getWidth(5),
                lineHeight: getWidth(7),
              },
            ]}>
            {'You are now on a journey to reach\nthe Avatar State'}
          </Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              confirmPassword: '',
            }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              registerUser(values, actions);
            }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Password is required';
              } else if (!isStrongPassword(values.password)) {
                errors.password =
                  'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character';
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm Password is required';
              } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords do not match';
              }
              if (!values.firstName) {
                errors.firstName = 'First Name is required';
              }
              if (!values.lastName) {
                errors.lastName = 'Last Name is required';
              }
              return errors;
            }}>
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={{ flex: 1, width: '100%' }}>
                <ScrollView showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  style={{ height: windowHeight - 370 }}>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <InputText
                      containerStyle={{ marginTop: getWidth(3), width: '48%' }}
                      labelTitle="First name"
                      placeholder="John"
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      errorMessage={touched.firstName && errors.firstName}
                      showError={touched.firstName || errors.firstName}
                      isInvalid={touched.firstName && errors.firstName}
                    />
                    <InputText
                      containerStyle={{ marginTop: getWidth(3), width: '48%' }}
                      labelTitle="Last name"
                      placeholder="Doe"
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      errorMessage={touched.lastName && errors.lastName}
                      showError={touched.lastName || errors.lastName}
                      isInvalid={touched.lastName && errors.lastName}
                    />
                  </View>
                  <InputText
                    containerStyle={{ marginTop: getWidth(3), width: '100%' }}
                    labelTitle="Email"
                    placeholder="username@hotmail.com"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    errorMessage={touched.email && errors.email}
                    showError={touched.email || errors.email}
                    isInvalid={touched.email && errors.email}
                  />
                  <InputText
                    containerStyle={{ marginTop: getWidth(4), width: '100%' }}
                    labelTitle="Password"
                    placeholder="Password123"
                    isPassword={true}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    errorMessage={touched.password && errors.password}
                    showError={touched.password || errors.password}
                    isInvalid={touched.password && errors.password}
                  />
                  <InputText
                    containerStyle={{ marginTop: getWidth(4), width: '100%' }}
                    labelTitle="Confirm Password"
                    placeholder="Password123"
                    isPassword={true}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    errorMessage={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    showError={touched.confirmPassword || errors.confirmPassword}
                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                    <TouchableOpacity
                      onPress={() => { }}>
                      <Text style={styles.forgetText}>Forgot Password?</Text>

                    </TouchableOpacity>
                  </View>
                </ScrollView>
                <InputButton
                  onPress={handleSubmit}
                  style={styles.continueBtn}
                  labelTitle="CONTINUE"
                  textColor={Colors.gray1}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(8),
    backgroundColor: "#1f1f1f",

  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: getWidth(40),
    height: getWidth(18),
    resizeMode: 'contain',
    marginBottom: getWidth(3),
  },
  loginText: {
    alignSelf: 'center',
    ...fontBold(6),
  },
  continueBtn: {
    marginTop: getWidth(4),
    borderRadius: getWidth(3),
    borderWidth: 0,
    backgroundColor: Colors.lightGreen,
  },
  forgetText: {
    alignSelf: 'center',
    ...fontSemiBold(4),
    opacity: 0.6,
    marginTop: getWidth(6),
    textDecorationLine: 'underline',
  },
});
