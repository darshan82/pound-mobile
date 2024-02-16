import React, {FC, useEffect, useState} from 'react';
import {FormControl, Text, View} from 'native-base';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Colors from './Colors';
import {useIsFocused} from '@react-navigation/native';

interface InputTextProps {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean;
  editable?: boolean;
  errorMessage?: string;
  isInvalid?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  labelTitle?: string;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  styleControl?: StyleProp<TextStyle>;
  type?: 'text' | 'password';
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  isPassword?: boolean;
  isFloating?: boolean;
  showError?: boolean;
}

export const InputText: FC<InputTextProps> = ({
  errorMessage,
  isInvalid = false,
  keyboardType,
  labelTitle = '',
  placeholder,
  style,
  styleControl,
  value = '',
  containerStyle,
  onChangeText = () => {},
  isPassword,
  isFloating = true,
  showError = false,
}) => {
  const [valueInput, setValue] = useState('');
  const [isError, setIsError] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setValue('');
    }
  }, [isFocused]);

  const handleInputChange = (text: string) => {
    setValue(text);
    setIsError(false);
    onChangeText(text);
  };

  return (
    <View style={containerStyle}>
      <FormControl isInvalid={isError || isInvalid} style={styleControl}>
        {labelTitle && !isFloating ? (
          <FormControl.Label>
            <Text
              style={[fontBold(4), {marginBottom: getWidth(2)}]}
              color="white">
              {labelTitle}
            </Text>
          </FormControl.Label>
        ) : null}

        <FloatingLabelInput
          staticLabel={!isFloating}
          label={isFloating ? labelTitle : ''}
          hintTextColor={'#aaa'}
          hint={placeholder}
          keyboardType={keyboardType}
          containerStyles={[styles.baseInput, style]}
          value={valueInput}
          labelStyles={{
            ...fontRegular(3.2),
            color: 'white',
            marginBottom: getWidth(2),
          }}
          isPassword={isPassword}
          placeholderTextColor={Colors.gray3}
          customLabelStyles={{
            colorFocused: Colors.gray3,
            colorBlurred: Colors.gray3,
          }}
          inputStyles={{
            ...fontRegular(4.5),
            color: 'white',
          }}
          onChangeText={handleInputChange}
        />
        {showError && (isError || isInvalid) ? (
          <Text style={{color: 'red', marginTop: 5, paddingHorizontal: 5}}>
            {errorMessage}
          </Text>
        ) : null}
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  baseInput: {
    height: getWidth(13),
    paddingLeft: getWidth(3),
    paddingRight: getWidth(3),
    backgroundColor: Colors.gray2,
    borderRadius: getWidth(2.5),
    ...fontRegular(3.2),
    color: 'white',
    borderWidth: 0,
    borderColor: Colors.gray2,
  },
});
