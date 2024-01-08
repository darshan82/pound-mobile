/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useMachine } from '@xstate/react';
import { Box, Text } from 'native-base';
import { Linking, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

// Controller
import { EmailValidationController } from '../controllers';

// Components
import { InputButton, InfoModal, InputText } from '../../../components';

//utils
import Colors from '../../../theme/colors';
import { AppContext } from '../../../app/context';

export const Form = () => {
  const navigation = useNavigation();
  const [machine, send] = useMachine(EmailValidationController);

  const { setDiscordID, setBoardingData } = useContext(AppContext);

  useEffect(() => {
    if (machine.matches('completed')) {
      if (machine.context.discordID) {
        setDiscordID(machine.context.discordID);
      }

      if (machine.context.data) {
        setBoardingData(machine.context.data);
      }

      navigation.navigate(machine.context.screen as never, {} as never);
    }
  }, [machine.value]);

  const {
    errors,
    touched,
    values,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Ingresa un email válido')
        .required('Ingresa un email válido'),
    }),
    onSubmit: ({ email }) => {
      send({ type: 'VERIFY', email });
    },
  });

  const checkDiscordChannel = async (): Promise<void> => {
    const url = 'https://discord.com/invite/thecompound';

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    }
  };

  return (
    <>
      <InfoModal
        iconName={'alert-circle-outline'}
        iconColor={Colors.error}
        title="Access Denied"
        buttonTitle={'Join Beta Team'}
        onButtonPress={() => {
          send({ type: 'RETRY' });
          checkDiscordChannel();
        }}
        onRequestClose={() => send({ type: 'RETRY' })}
        visible={machine.matches('unauthorized')}
      />

      <Box style={styles.form}>
        <InputText
          type="text"
          isInvalid={!!errors.email && touched.email}
          errorMessage="Enter a valid email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="ENTER EMAIL ADDRESS"
          onChangeText={text => setFieldValue('email', text)}
          onBlur={() => setFieldTouched('email', true)}
          value={values.email}
          style={{
            textAlign: 'center'
          }}
        />

        <InputButton
          style={styles.mt}
          isLoading={
            machine.matches('verifying') || machine.matches('fetching')
          }
          onPress={handleSubmit}>
          <Text style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }} >
            VALIDATE
          </Text>
        </InputButton>
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
    marginTop: 26,
  },
});
