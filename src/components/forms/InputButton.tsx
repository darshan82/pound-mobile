import React, {FC, ReactNode} from 'react';
import {StyleSheet, StyleProp, TextStyle} from 'react-native';
import {Button, Spinner} from 'native-base';
import {If} from 'react-haiku';

type InputButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  style?: StyleProp<TextStyle>;
  onPress: () => void;
};

export const InputButton: FC<InputButtonProps> = ({
  children,
  isLoading = false,
  style,
  onPress,
}) => {
  return (
    <Button
      size="lg"
      width="100%"
      marginBottom={16}
      style={[styles.acid, style]}
      onPress={() => !isLoading && onPress()}>
      <If isTrue={isLoading}>
        {/* @ts-ignore */}
        <Spinner color={style?.loading || "black"} size="lg" />
      </If>

      <If isTrue={!isLoading}>{children}</If>
    </Button>
  );
};

const styles = StyleSheet.create({
  acid: {
    backgroundColor: '#ADFF00',
    borderRadius: 8,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
