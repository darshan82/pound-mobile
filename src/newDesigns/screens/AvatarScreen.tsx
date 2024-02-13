import React, {useId, useState} from 'react';

import {Image, StyleSheet, View, Text, ActivityIndicator} from 'react-native';

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
import {useGlobalDataContext} from '../../context';

export default function AvatarScreen() {
  const navigation = useNavigation();
  const {data} = useGlobalDataContext();
  const imageId = useId();

  const imgUrl = data.avatarURL.replace('.glb', '.png');
  const NewImageUrl = `${imgUrl}?pose=power-stance&expression=happy&camera=fullbody`;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/justLogo.png')}
          />

          <Text style={styles.loginText}>{`Welcome, ${data.playerTag}`}</Text>
          <Text style={styles.discText}>
            {'You are now on a journey to reach\nthe Avatar State'}
          </Text>

          <Image
            style={styles.avatarImage}
            key={imageId}
            source={{uri: NewImageUrl + '?' + new Date()}}
          />

          <InputButton
            onPress={() => navigation.navigate('ConfirmationPass')}
            style={[styles.continueBtn]}
            labelTitle="Continue"
            textColor={Colors.gray1}
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
    height: getWidth(10),
    marginVertical: getWidth(2),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  avatarImage: {
    width: '150%',
    flex: 1,
    marginVertical: getWidth(7),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: getWidth(5),
  },
  loginText: {
    alignSelf: 'center',
    ...fontBold(6.5),
    textAlign: 'center',
    marginVertical: getWidth(1),
  },
  discText: {
    alignSelf: 'center',
    ...fontRegular(4.5, Colors.gray3),
    textAlign: 'center',
    marginTop: getWidth(3),
    lineHeight: getWidth(7),
  },
  continueBtn: {
    marginTop: getWidth(2),
    borderWidth: 0,
    backgroundColor: Colors.lightGreen,
    borderRadius: getWidth(3),
  },
});
