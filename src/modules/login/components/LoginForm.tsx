/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { Box, Text } from 'native-base';
import { StyleSheet, Linking, TouchableWithoutFeedback, Platform } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useMachine } from '@xstate/react';

// Components
import { InputText } from '../../../components/forms/InputText';
import { InfoModal, InputButton } from '../../../components';
import { LoginController } from '../controllers/LoginController';
import Colors from '../../../theme/colors';
import { AppContext } from '../../../app/context';

export const LoginForm = () => {
  const navigation = useNavigation();

  const { setTokens } = useContext(AppContext);
  const [showAlert, setShowAlert] = useState(false);
  const [machine, send] = useMachine(LoginController, {
    actions: {
      showAlert: () => {
        setShowAlert(true);
      },
    },
  });

  useEffect(() => {
    if (machine.done) {
      if (machine.matches('authenticated')) {
        setTokens(machine.context.tokens);
        navigation.navigate('Dashboard' as never, {} as never);
      }
    }
  }, [machine.done]);

  const {
    errors,
    values,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required('password'),
    }),
    onSubmit: ({ password }) => {
      send({ type: 'AUTHENTICATE', password });
    },
  });

  const tryAgain = (): void => {
    setShowAlert(false);
    send({ type: 'RETRY' });
  };

  const changePassword = async (): Promise<void> => {
    const url =
      'https://blockpound-app.auth.us-east-2.amazoncognito.com/forgotPassword?client_id=3ub30dhehghcetit9l30mqo5iq&response_type=code&scope=email+openid&redirect_uri=https://www.blockpound.com/';

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    }
  };

  return (
    <>
      <InfoModal
        onRequestClose={tryAgain}
        iconName={'alert-circle-outline'}
        iconColor={Colors.error}
        title="Incorrect password or username"
        buttonTitle={'Retry'}
        onButtonPress={tryAgain}
        visible={showAlert}
      />

      <Box style={styles.form}>
        <Box width="100%">
          <InputText
            value={values.password}
            type="password"
            isInvalid={!!errors.password && touched.password}
            errorMessage="The password is required"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Enter your password"
            onChangeText={text => setFieldValue('password', text)}
            onBlur={() => setFieldTouched('password', true)}
            style={{
              textAlign: 'center'
            }}
          />
        </Box>

        <InputButton
          style={styles.mt}
          isLoading={machine.matches('authenticating')}
          onPress={handleSubmit}>
          <Text style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}>
            CONTINUE
          </Text>
        </InputButton>
        <TouchableWithoutFeedback
        onPress={changePassword}
      >
        <Text color="gray.500" textAlign="center">
          Forgot password
        </Text>
      </TouchableWithoutFeedback>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  mt: {
    marginTop: 17,
  },
});
