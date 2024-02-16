import React, {useState} from 'react';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
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
  const {data, setData} = useGlobalDataContext();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        'Missing Information',
        'Please enter both email and password.',
      );
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
      console.log('Login API Response:', response.data);
      setData(prevData => ({
        ...prevData,
        email: email,
      }));
      setEmail('');
      setPassword('');
      navigation.navigate('DrawerStack');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error:', axiosError);
      if (axiosError.response && axiosError.response.status === 401) {
        Alert.alert('Oops!', 'Email or password incorrect');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={{flex: 1, height: '100%'}}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/justLogo.png')}
          />

          <Text style={styles.loginText}>Sign In</Text>

          <InputText
            containerStyle={{marginTop: getWidth(6), width: '100%'}}
            labelTitle="Email Address"
            placeholder="username@hotmail.com"
            value={email}
            onChangeText={setEmail}
          />

          <InputText
            containerStyle={{marginTop: getWidth(4), width: '100%'}}
            labelTitle="Password"
            placeholder="Password123"
            isPassword={true}
            value={password}
            onChangeText={setPassword}
          />

          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ConfirmationPass')}>
              <Text style={styles.forgetText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <InputButton
            onPress={handleLogin}
            style={[styles.continueBtn, {marginTop: getWidth(7)}]}
            labelTitle="Continue"
            textColor={Colors.gray1}
          />

          <InputButton style={styles.imgBtn} labelTitle="Forge my identity" />

          <InputButton
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
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(3),
    paddingHorizontal:50,

  },
  innerContainer: {
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:50,

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
    marginTop: getWidth(6),
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
