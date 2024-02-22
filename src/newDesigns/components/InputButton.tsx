import React, {FC, ReactNode} from 'react';
import {
  StyleSheet,
  StyleProp,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {Button, Spinner, Text, View} from 'native-base';
import {If} from 'react-haiku';
import {fontSemiBold, getWidth} from '../../modules/dashboard/helpers/tabs';
import Colors from './Colors';

type InputButtonProps = {
  children?: ReactNode;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  labelTitle?: string;
  image?: ImageSourcePropType;
  textColor?: string;
  isDisabled?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
};

export const InputButton: FC<InputButtonProps> = ({
  isLoading = false,
  style,
  labelTitle = '',
  onPress = () => {},
  image,
  isDisabled = false,
  textColor,
  imageStyle,
}) => {
  return (
    <Button
      size="lg"
      width="100%"
      disabled={isDisabled}
      style={[styles.acid, style, isDisabled ? styles.disabledStyle : null]}
      onPress={() => !isLoading && onPress()}>
      <View style={styles.view}>
        <If isTrue={image ? true : false}>
          <Image style={[styles.logoImage, imageStyle]} source={image} />
        </If>

        <Text style={[styles.text, {color: textColor ? textColor : 'white'}]}>
          {labelTitle}
        </Text>
        <If isTrue={isLoading}>
          {/* @ts-ignore */}
          <Spinner color={style?.loading || 'black'} size="lg" />
        </If>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  disabledStyle: {
    opacity: 0.5,
  },
  acid: {
    backgroundColor: '#588200',
    borderRadius: getWidth(2),
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    ...fontSemiBold(4, Colors.gray1),
    marginHorizontal: getWidth(3),
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 0},
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: getWidth(6),
  },
  logoImage: {
    width: getWidth(12),
    height: getWidth(12),
    resizeMode: 'contain',
  },
});
