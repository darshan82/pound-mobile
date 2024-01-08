import React, {FC} from 'react';
import {Text, Checkbox, VStack} from 'native-base';
import {InputList} from '../../interfaces/InputFormat';

type InputSelectProps = {
  errorMessage: string;
  isInvalid: boolean;
  labelTitle: string;
  options: InputList[];
  onChange: (check: InputList) => void;
};

export const InputCheckboxList: FC<InputSelectProps> = ({
  errorMessage,
  isInvalid,
  labelTitle,
  options,
  onChange,
}) => {
  return (
    <VStack marginTop={8}>
      <Text color="white" textTransform="uppercase">
        {labelTitle}
      </Text>

      {options.map(option => (
        <Checkbox
          key={option.label + Date.now()}
          isChecked={option.checked}
          value={''}
          marginTop={8}
          backgroundColor="transparent"
          onChange={checked => onChange({...option, checked})}>
          <Text color="white">{option.label}</Text>
        </Checkbox>
      ))}

      {isInvalid && (
        <Text color="red.700" fontSize="xs" marginTop={2}>
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};
