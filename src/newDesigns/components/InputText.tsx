import React, {FC, useEffect, useState} from 'react';
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
import { fontBold, getWidth } from '../../modules/dashboard/helpers/tabs';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Colors from './Colors';

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
  isPassword: boolean;
  isFloating: boolean;
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
  onChangeText = ()=>{},
  isPassword,
  onBlur,
  isFloating = true
}) => {
  const [valueInput, setValue] = useState(value ?? "")
  return (
    <View style={containerStyle}>
      <FormControl isInvalid={isInvalid} style={styleControl}>

      {labelTitle && !isFloating ? (
          <FormControl.Label>
            <Text style={[fontBold(4) ,{marginBottom:getWidth(2)}]} color="white">
              {labelTitle}
            </Text>
          </FormControl.Label>
        ) : null}

      <FloatingLabelInput
      staticLabel={!isFloating}
        label={isFloating ? labelTitle : ''}
        hintTextColor={'#aaa'}
       hint={placeholder}
        containerStyles={[
          styles.baseInput,
          style
        ]}
        value={valueInput}
        labelStyles={{
          color:"white",
          marginBottom: getWidth(2)
        }}
        placeholderTextColor={Colors.gray3}
        customLabelStyles={{
          colorFocused: Colors.gray3,
          colorBlurred:Colors.gray3
        }}
        inputStyles={{
          fontSize:getWidth(3.2),
          color:"white",
        }}
        onChangeText={value => {
          setValue(value)
          onChangeText(value)
        }}
      />

        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  baseInput: {
    height:getWidth(13),
    paddingLeft: getWidth(3),
    paddingRight: getWidth(3),
    backgroundColor:Colors.gray2,
    borderRadius:getWidth(2.5),
    fontSize:getWidth(3.2),
    color:"white",
    borderWidth:0,
    borderColor:Colors.gray2
  },
});
