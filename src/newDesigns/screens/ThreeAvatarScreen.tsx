import React from 'react';

import {Image, StyleSheet, View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Colors from '../components/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThreeAvatarScreen() {
  const navigation = useNavigation();

  const handleNavigation = async () => {
    await AsyncStorage.clear();
    navigation.navigate('PlayerTagScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/justLogo.png')}
          />

          <Text style={styles.loginText}>{'It’s your name.\nOwn it. '}</Text>

          <Text
            style={[
              fontRegular(4.5, Colors.gray3),
              {
                textAlign: 'center',
                marginVertical: getWidth(5),
                lineHeight: getWidth(7),
              },
            ]}>
            {'Unlock the Avatar State by\nforging a digital identity'}
          </Text>

          <Image
            style={{flex: 1, resizeMode: 'contain', width: '100%'}}
            source={require('../assets/images/3avatar.png')}
          />

          <InputButton
            onPress={handleNavigation}
            style={styles.continueBtn}
            textColor={Colors.gray1}
            labelTitle="Continue"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(5),
    paddingVertical: getWidth(2),
  },
  innerContainer: {
    flex: 1,
  },
  logoImage: {
    width: getWidth(40),
    height: getWidth(18),
    resizeMode: 'contain',
    marginBottom: getWidth(3),
    alignSelf: 'center',
  },
  infoImage: {
    width: getWidth(4),
    height: getWidth(4),
    resizeMode: 'contain',
    position: 'absolute',
    left: getWidth(18),
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
    marginTop: getWidth(2),
  },
  infoText: {
    ...fontBold(3),
    opacity: 0.6,
    marginLeft: getWidth(4),
    marginTop: getWidth(2),
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
    marginTop: getWidth(4),
    borderRadius: getWidth(3),
    borderWidth: 0,
    backgroundColor: Colors.lightGreen,
  },
  imgBtn: {
    marginTop: getWidth(4),
    backgroundColor: 'rgba(255,255,552,0.2)',
  },
});
