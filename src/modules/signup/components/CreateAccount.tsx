/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, TouchableWithoutFeedback, Linking } from 'react-native';
import { Box, Text, Checkbox } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useMachine } from '@xstate/react';

// Controller
import { SignUpController } from '../controllers';

// components
import { InputText } from '../../../components/forms/InputText';

// utils
import Colors from '../../../theme/colors';
import { inputs } from '../helpers/signupInputs';
import { InputButton } from '../../../components/forms/InputButton';
import { InfoModal } from '../../../components';
import { AppContext } from '../../../app/context';

export const CreateAccount = () => {
  const navigation = useNavigation();

  const { boardingData, setDiscordID } = useContext(AppContext);

  const [showAlert, setShowAlert] = useState(false);
  const [machine, send] = useMachine(SignUpController);

  useEffect(() => {
    if (machine.done) {
      if (machine.matches('complete')) {
        setDiscordID(machine.context.discordID);
        navigation.navigate('Dashboard' as never, {} as never);
      }

      if (machine.matches('unrecognized')) {
        setShowAlert(true);
      }
    }
  }, [machine.done]);

  const { touched, errors, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      confirmPassword: '',
      name: '',
      password: '',
      agreed: false,
    },
    validationSchema: Yup.object().shape({
      agreed: Yup.boolean().oneOf([true], 'as'),
      name: Yup.string().required().min(1, 'The username is required'),
      password: Yup.string()
        .required('The password is required')
        .min(6, 'The password must have at least 6 characters'),
      confirmPassword: Yup.string()
        .required('The password confirmation is required')
        .oneOf([Yup.ref('password'), null], 'The passwords must match'),
    }),
    onSubmit: ({ name, password }) => {
      send({
        type: 'INITIALIZE',
        data: {
          nickname: name,
          password,
        },
      });
    },
  });

  useEffect(() => {
    if (boardingData) {
      setFieldValue('name', boardingData.username);
    }
  }, [boardingData]);

  const checkTerms = async (): Promise<void> => {
    const url = 'http://www.blockpound.com/pound-terms-of-use';

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    }
  };

  const checkPolicy = async (): Promise<void> => {
    const url = 'https://www.blockpound.com/pound-privacy-policy';

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    }
  };

  return (
    <>
      <InfoModal
        onRequestClose={() => setShowAlert(false)}
        iconName={'alert-circle-outline'}
        iconColor={Colors.error}
        title="An Error occurs, try again please"
        buttonTitle={'Retry'}
        onButtonPress={() => {
          setShowAlert(false);
          navigation.navigate('EmailValidation' as never, {} as never);
        }}
        visible={showAlert}
      />

      <Box marginTop={2} style={styles.spacing}>
        {inputs.map((input, index) => (
          <Box marginTop={0} key={input.key}>
            <InputText
              value={`${values[input.name as keyof typeof values]}`}
              labelTitle={""}
              type={input.type === 'text' ? 'text' : 'password'}
              isInvalid={
                !!errors[input.name as keyof typeof errors] &&
                touched[input.name as keyof typeof touched]
              }
              errorMessage={errors[input.name as keyof typeof errors]}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType={
                input.keyboardType === 'email-address'
                  ? 'email-address'
                  : 'default'
              }
              placeholder={input.placeHolder}
              onChangeText={text => setFieldValue(input.name, text)}
              editable={input.editable}
              style={{
                textAlign: 'center'
              }}
            />
          </Box>
        ))}

        <Checkbox
          isChecked={values.agreed}
          value={'Finish list Screen'}
          marginTop={6}
          backgroundColor="transparent"
          onChange={isSelected => setFieldValue('agreed', isSelected)}>
          <Text color="gray.500" style={styles.xs}>
            I agree to{' '}
            <TouchableWithoutFeedback onPress={checkTerms}>
              <Text color="white">POUND's Terms </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={checkPolicy}>
              <Text color="white">{' & Privacy Policy'}</Text>
            </TouchableWithoutFeedback>
          </Text>
        </Checkbox>

        {!!errors.agreed && touched.agreed && (
          <Text color="red.600" marginTop={2} fontSize="xs">
            You must accept the Terms & Privacy Policy
          </Text>
        )}

        <Box marginTop={10}>
          <InputButton
            isLoading={machine.matches('initializing')}
            onPress={handleSubmit}>
            <Text style={{
              color: "black",
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
            }}>
              CONTINUE
            </Text>
          </InputButton>
        </Box>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  spacing: {
    marginHorizontal: '5%',
  },
  xs: {
    fontSize: 12,
  },
});
