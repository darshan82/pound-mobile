import React, { FC, ReactNode } from 'react';
import { StyleSheet, StyleProp, TextStyle, Image, ImageSourcePropType, ViewStyle } from 'react-native';
import { Button, Spinner, Text, View } from 'native-base';
import { If } from 'react-haiku';
import { getWidth } from '../../modules/dashboard/helpers/tabs';

type InputButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  labelTitle: string,
  image: ImageSourcePropType,
  textColor:string
};

export const InputButton: FC<InputButtonProps> = ({
  children,
  isLoading = false,
  style,
  labelTitle = "",
  onPress = () => { },
  image,
  textColor
}) => {
  return (
    <Button
      size="lg"
      width="100%"
      style={[styles.acid, style]}
      onPress={() => !isLoading && onPress()}>

      <View style={styles.view}>

        <If isTrue={image ? true : false}>
          <Image
            style={styles.logoImage}
            source={image}
          />
        </If>

        <Text style={styles.text} color={textColor ? textColor : "white"}
        >
          {labelTitle}
        </Text>
        <If isTrue={isLoading}>
          {/* @ts-ignore */}
          <Spinner color={style?.loading || "black"} size="lg" />
        </If>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  acid: {
    backgroundColor: '#588200',
    borderRadius: getWidth(2),
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    marginHorizontal: getWidth(3),
    fontWeight: "bold",
    textShadowColor: 'black', 
        textShadowOffset: { width: -1, height: 0 },
  },
  view: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    height:getWidth(6),
  },
  logoImage: {
    width: getWidth(12),
    height: getWidth(12),
    resizeMode: "contain"
  }
});
