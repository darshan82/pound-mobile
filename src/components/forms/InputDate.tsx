import React, {FC, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {HStack, VStack, Text} from 'native-base';
import DatePicker from 'react-native-date-picker';
import {ColorType} from 'native-base/lib/typescript/components/types';

type InputDateProps = {
  error?: string;
  isInvalid?: boolean;
  placeholder: string;
  textColor?: ColorType;
  title: string;
  value: Date;
  onConfirm: (value: Date) => void;
};

export const InputDate: FC<InputDateProps> = ({
  error,
  isInvalid = false,
  placeholder,
  textColor = 'gray.400',
  title,
  value,
  onConfirm,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <VStack>
      <Text color="white" textTransform="uppercase">
        {title}
      </Text>

      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <HStack
          bg="white"
          borderRadius={8}
          paddingX={25}
          paddingY={17}
          width="100%">
          <Text
            color={textColor}
            fontFamily="Helvetica"
            fontSize="md"
            fontWeight="bold"
            textTransform="uppercase">
            {placeholder}
          </Text>
        </HStack>
      </TouchableWithoutFeedback>

      <DatePicker
        modal
        mode="date"
        theme="dark"
        open={open}
        date={value}
        onConfirm={date => {
          setOpen(false);
          onConfirm(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      {isInvalid && (
        <Text color="red.700" fontSize="xs" marginTop={2}>
          {error}
        </Text>
      )}
    </VStack>
  );
};
