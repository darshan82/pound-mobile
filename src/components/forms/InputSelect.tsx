/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import BigList from 'react-native-big-list';
import {Actionsheet, HStack, VStack, Text} from 'native-base';

type InputSelectProps = {
  errorMessage: string;
  isInvalid: boolean;
  labelTitle: string;
  options: {label: string; value: string}[];
  placeholder: string;
  value: string | undefined;
  onChange: (value: string) => void;
};

export const InputSelect: FC<InputSelectProps> = ({
  errorMessage,
  isInvalid,
  labelTitle,
  options,
  placeholder,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const sendSelectedOption = (item: {label: string; value: string}): void => {
    setOpen(false);
    setSelectedValue(item.label);
    onChange(item.value);
  };

  return (
    <VStack>
      <Text color="white" textTransform="uppercase">
        {labelTitle}
      </Text>

      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <HStack
          width="100%"
          bg="white"
          paddingX={25}
          paddingY={13}
          borderRadius={8}>
          <Text
            color={selectedValue ? 'black' : 'gray.400'}
            fontFamily="Helvetica"
            fontSize="md"
            textTransform="uppercase"
            fontWeight="bold">
            {selectedValue || placeholder}
          </Text>
        </HStack>
      </TouchableWithoutFeedback>

      <Actionsheet
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        disableOverlay>
        <Actionsheet.Content backgroundColor="#222222" height={300}>
          <BigList
            style={{width: '90%'}}
            data={options}
            itemHeight={90}
            headerHeight={90}
            footerHeight={100}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onPress={() => sendSelectedOption(item)}>
                <HStack padding={4} marginBottom={2} rounded="lg">
                  <Text
                    color={value === (item as any).value ? '#FF00AA' : 'white'}
                    fontWeight="bold"
                    fontSize="lg"
                    style={styles.abs}
                    textTransform="uppercase">
                    {(item as any).label}
                  </Text>
                </HStack>
              </TouchableWithoutFeedback>
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>

      {isInvalid && (
        <Text color="red.700" fontSize="xs" marginTop={2}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  abs: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
  },
});
