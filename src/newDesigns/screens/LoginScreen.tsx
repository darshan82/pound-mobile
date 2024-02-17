import React, {useEffect, useState} from 'react';

import {Image, StyleSheet, View, Text} from 'react-native';

import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {
  fontBold,
  fontSemiBold,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputText} from '../components/InputText';
import Colors from '../components/Colors';
import axios, {AxiosError} from 'axios';
import {useGlobalDataContext} from '../../context';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {data, setData} = useGlobalDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const [key, setKey] = useState(0);

  const handleLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }
    try {
      const apiUrl = 'http://18.217.10.162/api/users/login';
      const headers = {
        Authorization: `${data.token}`,
        'Content-Type': 'application/json',
      };
      const body = {email, password};
      const response = await axios.post(apiUrl, body, {headers});
      setData(prevData => ({
        ...prevData,
        email: email,
        loginToken: response.data.token,
        userId: response.data.user._id,
      }));
      setEmail('');
      setPassword('');
      setError('');
      navigation.navigate('DrawerStack');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error:', axiosError);
      if (axiosError.response && axiosError.response.status === 401) {
        setError('Email or password incorrect');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={{flex: 1, height: '100%'}}>
        <View key={key} style={styles.innerContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/justLogo.png')}
          />

          <Text style={styles.loginText}>Log In</Text>

          <InputText
            containerStyle={{marginTop: getWidth(6), width: '100%'}}
            labelTitle="Email Address"
            placeholder="username@hotmail.com"
            value={email}
            onChangeText={setEmail}
            errorMessage="Email a required field"
            showError={error !== ''}
          />

          <InputText
            containerStyle={{marginTop: getWidth(6), width: '100%'}}
            labelTitle="Password"
            placeholder="Password123"
            isPassword={true}
            value={password}
            onChangeText={setPassword}
            errorMessage="Password is a required field"
            showError={error !== ''}
          />

          {error ? (
            <Text
              style={{
                color: 'red',
                fontWeight: '700',
                fontSize: 16,
                marginTop: 5,
                marginBottom: 4,
              }}>
              {error}
            </Text>
          ) : null}

          <Text style={styles.forgetText}>Forgot Password?</Text>

          <InputButton
            onPress={handleLogin}
            style={[styles.continueBtn]}
            labelTitle="Continue"
            textColor={Colors.gray1}
            isLoading={isLoading}
            isDisabled={
              email.length === 0 || password.length === 0 || isLoading
            }
          />

          <InputButton
            onPress={() => navigation.navigate('ThreeAvatarAfterFirst')}
            style={styles.imgBtn}
            labelTitle="Forge my identity"
          />

          {/* <InputButton
            imageStyle={{height: getWidth(7)}}
            image={require('../assets/images/discord.png')}
            style={styles.imgBtn}
            labelTitle="Discord"
          />

          <InputButton
            imageStyle={{height: getWidth(7)}}
            image={require('../assets/images/twter.png')}
            style={styles.imgBtn}
            labelTitle="Twitter"
          />

          <InputButton
            imageStyle={{height: getWidth(7)}}
            image={require('../assets/images/google.png')}
            style={styles.imgBtn}
            labelTitle="Google"
          /> */}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: getWidth(40),
    height: getWidth(20),
    resizeMode: 'contain',
  },
  powerdByImage: {
    width: '100%',
    height: getWidth(8),
    resizeMode: 'contain',
    marginTop: getWidth(10),
  },
  loginText: {
    alignSelf: 'center',
    ...fontBold(6),
  },
  forgetText: {
    alignSelf: 'center',
    ...fontSemiBold(4),
    opacity: 0.6,
    marginTop: getWidth(2),
    textDecorationLine: 'underline',
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
    backgroundColor: Colors.transparent,
    borderColor: Colors.gray2_0,
  },
});
