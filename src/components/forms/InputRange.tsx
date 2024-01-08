import React, {FC, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import {Text, Actionsheet, HStack, VStack} from 'native-base';

type InputSelectProps = {
  errorMessage: string;
  isInvalid: boolean;
  labelTitle: string;
  range: {min: number; max: number};
  placeholder: string;
  value: number | undefined;
  onChange: (value: number) => void;
};

export const InputRange: FC<InputSelectProps> = ({
  errorMessage,
  isInvalid,
  labelTitle,
  range,
  placeholder,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || range.min);

  const sendSelectedOption = (): void => {
    setOpen(false);
    onChange(selectedValue || range.min);
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
          paddingY={17}
          borderRadius={8}>
          <Text
            color={value ? 'black' : 'gray.400'}
            fontFamily="Helvetica"
            fontSize="md"
            fontWeight="bold"
            textTransform="uppercase">
            {value || placeholder}
          </Text>
        </HStack>
      </TouchableWithoutFeedback>

      <Actionsheet
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        disableOverlay>
        <Actionsheet.Content backgroundColor="#222222" height={150}>
          <HStack
            justifyContent="space-between"
            alignItems="baseline"
            width="90%">
            <Text color="white">{range.min}</Text>

            <Text color="#FF00AA" textAlign="center" fontSize="xl">
              {selectedValue}
            </Text>
            <Text color="white">{range.max}</Text>
          </HStack>

          <VStack width={'90%'}>
            <Slider
              value={selectedValue}
              maximumValue={range.max}
              minimumValue={range.min}
              minimumTrackTintColor={'#FF00AA'}
              thumbTintColor={'#FF00AA'}
              step={1}
              onValueChange={v =>
                setSelectedValue(Array.isArray(v) ? v.pop() || range.min : v)
              }
            />
          </VStack>

          <TouchableWithoutFeedback onPress={sendSelectedOption}>
            <Text color="white" textAlign="center">
              Select
            </Text>
          </TouchableWithoutFeedback>
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
