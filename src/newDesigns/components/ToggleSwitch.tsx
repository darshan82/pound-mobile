import React, {FC, useState} from 'react';

import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {fontBold, getWidth} from '../../modules/dashboard/helpers/tabs';
import Colors from './Colors';
// import { CircularProgress } from 'react-native-progress-circle-gradient';

interface ToggleSwitchProps {
  style?: StyleProp<ViewStyle>;
  onToggleChange: (isOn: boolean) => void;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  style,
  onToggleChange = () => {},
}) => {
  const navigation = useNavigation();
  const [isOn, setIsOn] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        {
          backgroundColor: Colors.gray1,
          width: getWidth(13),
          borderRadius: getWidth(5),
          height: getWidth(7.6),
          paddingHorizontal: getWidth(1),
          paddingVertical: getWidth(1),
          justifyContent: 'center',
          alignItems: isOn ? 'flex-end' : 'flex-start',
        },
        isOn
          ? {
              backgroundColor: Colors.lightGreen + 30,
              borderWidth: 1,
              borderColor: Colors.lightGreen,
            }
          : {},
        style,
      ]}
      onPress={() => {
        setIsOn(p => {
          onToggleChange(!p);
          return !p;
        });
      }}>
      <View
        style={{
          backgroundColor: isOn ? 'white' : Colors.gray2,
          width: getWidth(5),
          height: getWidth(5),
          borderRadius: getWidth(6),
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(8),
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoImage: {
    width: getWidth(18),
    height: getWidth(18),
    marginVertical: getWidth(5),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  powerdByImage: {
    width: '100%',
    height: getWidth(8),
    resizeMode: 'contain',
    marginTop: getWidth(10),
  },
  loginText: {
    alignSelf: 'center',
    ...fontBold(7),
    textAlign: 'center',
  },
  discText: {
    alignSelf: 'center',
    ...fontBold(3),
    textAlign: 'center',
    marginVertical: getWidth(5),
  },
  infoText: {
    alignSelf: 'center',
    ...fontBold(2.5),
    textAlign: 'center',
    opacity: 0.6,
  },
  forgetText: {
    alignSelf: 'center',
    ...fontBold(3),
    opacity: 0.6,
    marginTop: getWidth(5),
  },
  orText: {
    alignSelf: 'center',
    ...fontBold(4),
    marginTop: getWidth(3),
  },
  continueBtn: {
    marginTop: getWidth(2),
  },
  imgBtn: {
    marginTop: getWidth(4),
    backgroundColor: 'rgba(255,255,552,0.2)',
  },
});
