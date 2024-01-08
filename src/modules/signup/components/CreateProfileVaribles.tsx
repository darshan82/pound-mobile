/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {StyleSheet} from 'react-native';
import {Box, HStack, Text} from 'native-base';
import {Show} from 'react-haiku';
import dayjs from 'dayjs';

// components
import {
  InputButton,
  InputSelect,
  InputDate,
  InputRange,
  InputCheckboxList,
  InputText,
} from '../../../components';

// utils
import {
  InputFormat,
  InputList,
  InputOption,
} from '../../../interfaces/InputFormat';
import {useKnowBetterInputs} from '../hooks/useKnowBetterInputs';
import {AdditionalData} from '../controllers/KnowBetterController';

type CPVProps = {
  commitments: InputOption[];
  goals: InputOption[];
  identities: InputList[];
  isLoading: boolean;
  updateIdentities: (list: InputList[]) => void;
  sendVariables: (data: AdditionalData) => void;
};

export const CreateProfileVariables: FC<CPVProps> = ({
  commitments,
  goals,
  identities,
  isLoading,
  updateIdentities,
  sendVariables,
}) => {
  const {knowBetterInputs} = useKnowBetterInputs({
    commitments,
    goals,
    identities,
  });

  const {
    touched,
    errors,
    values,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = useFormik({
    initialValues: knowBetterInputs.reduce((previous, current) => {
      if (!current.rowInputs) {
        previous = {
          ...previous,
          [current.name]: current.initialValue,
        };
      } else {
        const rowValues = current.rowInputs.reduce((acc, row) => {
          acc = {
            ...acc,
            [row.name]: row.initialValue,
          };

          return acc;
        }, {});

        previous = {
          ...previous,
          ...rowValues,
        };
      }
      return previous;
    }, {}),
    validationSchema: Yup.object().shape(
      knowBetterInputs.reduce((previous, current) => {
        if (current.validation) {
          previous = {
            ...previous,
            [current.name]: current.validation,
          };
        }

        if (current.rowInputs) {
          const rowValidation = current.rowInputs.reduce((p, c) => {
            if (c.validation) {
              p = {
                ...p,
                [c.name]: c.validation,
              };
            }

            return p;
          }, {});

          previous = {
            ...previous,
            ...rowValidation,
          };
        }

        return previous;
      }, {}),
    ),
    onSubmit: ({feet, inches, weight, want, commitment, apply}: any) => {
      const list = apply.reduce(
        (acc: any, c: InputList) => ({
          ...acc,
          [c.label]: true,
        }),
        {},
      );

      sendVariables({
        height_ft: feet,
        height_in: inches,
        weight,
        goal: want,
        commitment,
        ...list,
      });
    },
  });

  const selectedListOption = (input: InputFormat, option: InputList): void => {
    const list = input.list?.map(l => (l.label === option.label ? option : l));

    updateIdentities(list || []);

    setFieldTouched(input.name, true);
    setFieldValue(
      input.name,
      list?.filter(l => l.checked),
    );
  };

  return (
    <Box marginTop={2} style={styles.spacing}>
      {knowBetterInputs.map((input, index) => (
        <Box marginTop={index !== 0 ? 4 : 0} key={input.key}>
          <Show>
            <Show.When isTrue={input.type === 'row'}>
              <HStack justifyContent="space-between" space={2}>
                {input.rowInputs &&
                  input.rowInputs.map(e => (
                    <InputText
                      key={e.key}
                      labelTitle={e.labelTitle}
                      type={e.type === 'text' ? 'text' : 'password'}
                      isInvalid={
                        !!errors[e.name as keyof typeof errors] &&
                        touched[e.name as keyof typeof touched]
                      }
                      errorMessage={errors[e.name as keyof typeof errors]}
                      autoCorrect={false}
                      autoCapitalize="none"
                      keyboardType={e.keyboardType}
                      placeholder={e.placeHolder}
                      onChangeText={text => setFieldValue(e.name, text)}
                      value={`${values[e.name as keyof typeof values]}`}
                      styleControl={{width: '48%'}}
                    />
                  ))}
              </HStack>
            </Show.When>

            <Show.When isTrue={['text', 'password'].includes(input.type)}>
              <InputText
                labelTitle={input.labelTitle}
                type={input.type === 'text' ? 'text' : 'password'}
                isInvalid={
                  !!errors[input.name as keyof typeof errors] &&
                  touched[input.name as keyof typeof touched]
                }
                errorMessage={errors[input.name as keyof typeof errors]}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType={input.keyboardType}
                placeholder={input.placeHolder}
                onChangeText={text => setFieldValue(input.name, text)}
                value={`${values[input.name as keyof typeof values]}`}
              />
            </Show.When>

            <Show.When isTrue={input.type === 'range'}>
              <InputRange
                labelTitle={input.labelTitle}
                isInvalid={
                  !!errors[input.name as keyof typeof errors] &&
                  touched[input.name as keyof typeof touched]
                }
                errorMessage={input.errorMessage || ''}
                placeholder={input.placeHolder}
                onChange={value => {
                  setFieldValue(input.name, value);
                }}
                range={input.range ? input.range : {min: 0, max: 1}}
                value={(values as any)[input.name]}
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
                  setFieldValue(input.name, option);
                }}
              />
            </Show.When>

            <Show.When isTrue={input.type === 'list'}>
              <InputCheckboxList
                errorMessage={input.errorMessage || ''}
                isInvalid={
                  !!errors[input.name as keyof typeof errors] &&
                  touched[input.name as keyof typeof touched]
                }
                labelTitle={input.labelTitle}
                options={input.list || []}
                onChange={option => selectedListOption(input, option)}
              />
            </Show.When>
          </Show>
        </Box>
      ))}

      <Box marginTop={10}>
        <InputButton isLoading={isLoading} onPress={handleSubmit}>
          <Text color="black" fontSize="lg" textTransform="uppercase">
            Continue
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
