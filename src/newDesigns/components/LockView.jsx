import React from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from './InputButton';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputText} from './InputText';
import Colors from './Colors';

export default function LockView({
  isVisible,
  text,
  subText,
  btnText,
  handleBtnClick,
  isLoading,
  isDisable,
}) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.innerContainer}>
        <View
          style={{
            margin: getWidth(2),
            justifyContent: 'space-between',
            padding: getWidth(3),
            borderRadius: getWidth(2),
            backgroundColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            marginTop: getWidth(10),
          }}>
          <Image
            style={styles.image}
            source={require('../assets/images/lock.png')}
          />
          <Text style={[fontBold(5, 'white'), {marginVertical: getWidth(5)}]}>
            Team Ranking
          </Text>

          {subText ? (
            <Text
              style={[
                fontBold(4, Colors.lightGreen),
                {marginBottom: getWidth(4)},
              ]}>
              {subText}
            </Text>
          ) : null}

          {btnText ? (
            <InputButton
              onPress={handleBtnClick}
              isLoading={isLoading}
              isDisabled={isDisable}
              textColor="black"
              labelTitle={btnText}
              style={{
                backgroundColor: '#AEFF03',
                width: getWidth(70),
                borderRadius: getWidth(10),
                borderWidth: 0,
              }}
            />
          ) : null}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
  },
  image: {
    width: getWidth(10),
    height: getWidth(10),
    resizeMode: 'contain',
  },
});
