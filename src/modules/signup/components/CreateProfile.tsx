import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {StyleSheet} from 'react-native';
import {Box, Text} from 'native-base';
import {Show} from 'react-haiku';
import countryList from 'react-select-country-list';

// components
import {InputText} from '../../../components/forms/InputText';

// utils
import {InputButton, InputSelect, InputDate} from '../../../components';
import dayjs from 'dayjs';
import {useProfileInputs} from '../hooks';
import {InputOption} from '../../../interfaces/InputFormat';
import {Profile} from '../controllers/ProfileController';

type CreateProfileProps = {
  gendersOptions: InputOption[];
  isLoading: boolean;
  sendData: (data: Profile) => void;
};

export const CreateProfile: FC<CreateProfileProps> = ({
  gendersOptions,
  isLoading,
  sendData,
}) => {
  const {profileInputs} = useProfileInputs({gendersOptions});

  const {touched, errors, values, setFieldValue, handleSubmit} = useFormik({
    initialValues: profileInputs.reduce((previous, current) => {
      previous = {
        ...previous,
        [current.name]: current.initialValue,
      };
      return previous;
    }, {}),
    validationSchema: Yup.object().shape(
      profileInputs.reduce((previous, current) => {
        if (current.validation) {
          previous = {
            ...previous,
            [current.name]: current.validation,
          };
        }
        return previous;
      }, {}),
    ),
    onSubmit: ({firstName, lastName, birthday, gender, country}: any) => {
      const formatted = dayjs(birthday).format('MM/DD/YYYY');

      sendData({
        first_name: firstName,
        last_name: lastName,
        birthday: formatted,
        gender,
        country: countryList().getLabel(country),
      });
    },
  });

  return (
    <Box marginTop={2} style={styles.spacing}>
      {profileInputs.map((input, index) => (
        <Box marginTop={index !== 0 ? 4 : 0} key={input.key}>
          <Show>
            <Show.When isTrue={['text', 'password'].includes(input.type)}>
              <InputText
                labelTitle={input.labelTitle}
                type={input.type === 'text' ? 'text' : 'password'}
                isInvalid={
                  !!errors[input.name as keyof typeof errors] &&
                  touched[input.name as keyof typeof touched]
                }
                errorMessage={input.errorMessage}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType={
                  input.keyboardType === 'email-address'
                    ? 'email-address'
                    : 'default'
                }
                placeholder={input.placeHolder}
                onChangeText={text => setFieldValue(input.name, text)}
                value={`${values[input.name as keyof typeof values]}`}
              />
            </Show.When>

            <Show.When isTrue={input.type === 'date'}>
              <InputDate
                title={input.labelTitle}
                placeholder={
                  !(values as any)[input.name]
                    ? input.placeHolder
                    : dayjs((values as any)[input.name]).format('MM/DD/YYYY')
                }
                textColor={!(values as any)[input.name] ? 'gray.400' : 'black'}
                value={new Date()}
                error={input.errorMessage}
                isInvalid={
                  !!errors[input.name as keyof typeof errors] &&
                  touched[input.name as keyof typeof touched]
                }
                onConfirm={date => {
                  // setFieldTouched(input.name, true);
                  setFieldValue(input.name, date);
                }}
              />
            </Show.When>

            <Show.When isTrue={input.type === 'picker'}>
              <InputSelect
                placeholder={input.placeHolder}
                value={(values as any)[input.name]}
                isInvalid={
                  !!errors[input.name as keyof typeof errors] &&
                  touched[input.name as keyof typeof touched]
                }
                labelTitle={input.labelTitle}
                errorMessage={input.errorMessage || ''}
                options={input.options || []}
                onChange={option => {
                  // setFieldTouched(input.name, true);
                  setFieldValue(input.name, option);
                }}
              />
            </Show.When>
          </Show>
        </Box>
      ))}

      <Box marginTop={10}>
        <InputButton isLoading={isLoading} onPress={handleSubmit}>
          <Text color="black" fontSize="lg" textTransform="uppercase">
            Create Account
          </Text>
        </InputButton>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  spacing: {
    marginHorizontal: '5%',
  },
});
