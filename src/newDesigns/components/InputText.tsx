import React, {FC} from 'react';
import {Input, FormControl, Text, View} from 'native-base';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { getWidth } from '../../modules/dashboard/helpers/tabs';

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
  containerStyle?: StyleProp<ViewStyle>;
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
  labelTitle = "",
  placeholder,
  style,
  styleControl,
  type,
  value,
  containerStyle,
  onChangeText,
  onBlur,
}) => {
  return (
    <View style={containerStyle}>
      <FormControl isInvalid={isInvalid} style={styleControl}>
        {labelTitle && (
          <FormControl.Label>
            <Text style={{ fontWeight: "bold" }} color="white">{labelTitle}</Text>
          </FormControl.Label>
        )}
        <Input
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          backgroundColor="white"
          editable={editable}
          fontFamily="Helvetica"
          keyboardType={keyboardType}
          onBlur={onBlur}
          onChangeText={onChangeText}
          paddingY={5}
          placeholder={placeholder}
          rounded="lg"
          size="lg"
          style={[styles.baseInput, style]}
          type={type}
          value={value}

        />
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  baseInput: {
    paddingTop: getWidth(2),
    paddingBottom:getWidth(2),
    paddingLeft: getWidth(5),
    paddingRight: getWidth(5),
    backgroundColor:'black',
    fontSize:getWidth(3.2),
    color:"white"
  },
});
