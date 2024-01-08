import React, {FC} from 'react';
import {Input, FormControl, Text} from 'native-base';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
  StyleSheet,
} from 'react-native';

interface InputTextProps {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  autoCorrect?: boolean;
  editable?: boolean;
  errorMessage?: string;
  isInvalid?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  labelTitle?: string;
  placeholder: string;
  style?: StyleProp<TextStyle>;
  styleControl?: StyleProp<TextStyle>;
  type: 'text' | 'password';
  value: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const InputText: FC<InputTextProps> = ({
  autoCapitalize,
  autoCorrect,
  editable = true,
  errorMessage,
  isInvalid = false,
  keyboardType,
  labelTitle,
  placeholder,
  style,
  styleControl,
  type,
  value,
  onChangeText,
  onBlur,
}) => {
  return (
    <FormControl isInvalid={isInvalid} style={styleControl}>
      {labelTitle && (
        <FormControl.Label>
          <Text color="white">{labelTitle.toUpperCase()}</Text>
        </FormControl.Label>
      )}
      <Input
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        backgroundColor="white"
        editable={editable}
        fontFamily="Helvetica"
        fontWeight="bold"
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={onChangeText}
        paddingY={5}
        placeholder={placeholder.toUpperCase()}
        rounded="lg"
        size="lg"
        style={[styles.baseInput, style]}
        type={type}
        value={value}
        
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
};

const styles = StyleSheet.create({
  baseInput: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
  },
});
