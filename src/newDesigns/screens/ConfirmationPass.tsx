import React, {useState} from 'react';

import {Image, StyleSheet, View, Text, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {
  fontBold,
  fontRegular,
  fontSemiBold,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputText} from '../components/InputText';
import Colors from '../components/Colors';
import {useGlobalDataContext} from '../../context';
import axios, {AxiosError} from 'axios';
import {isStrongPassword} from '../../app/helpers';

export default function ConfirmationPass() {
  const navigation = useNavigation();
  const {data, setData} = useGlobalDataContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (value, fieldName) => {
    switch (fieldName) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return;
    }

    if (!isStrongPassword(password)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'Password and Confirm Password do not match.',
      );
      return;
    }

    try {
      const apiUrl = 'http://18.217.10.162/api/users/update-user';
      const headers = {
        Authorization: `${data.token}`,
        'Content-Type': 'application/json',
      };
      const body = {email, password, firstName, lastName};
      const response = await axios.put(apiUrl, body, {headers});
      console.log('Register User -->:', response.data);
      setData(prevData => ({
        ...prevData,
        email: email,
      }));
      navigation.navigate('GameSelection');
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error:', axiosError);
      if (
        axiosError?.response?.data.error === 'Username or email already exists'
      ) {
        Alert.alert('Oops!', 'Email already exists');
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

          <Text style={styles.loginText}>{`Welcome, ${data.playerTag}`}</Text>

          <Text
            style={[
              fontRegular(4, Colors.gray3),
              {
                textAlign: 'center',
                marginVertical: getWidth(5),
                lineHeight: getWidth(7),
              },
            ]}>
            {'You are now on a journey to reach\nthe Avatar State'}
          </Text>

          <View style={{flexDirection: 'row', gap: 10}}>
            <InputText
              containerStyle={{marginTop: getWidth(3), width: '48%'}}
              labelTitle="First name"
              placeholder="John"
              value={firstName}
              onChangeText={text => handleInputChange(text, 'firstName')}
              errorMessage="Please enter first name"
              isInvalid={isError}
            />
            <InputText
              containerStyle={{marginTop: getWidth(3), width: '48%'}}
              labelTitle="Last name"
              placeholder="Doe"
              value={lastName}
              onChangeText={text => handleInputChange(text, 'lastName')}
              errorMessage="Please enter last name"
              isInvalid={isError}
            />
          </View>
          <InputText
            containerStyle={{marginTop: getWidth(3), width: '100%'}}
            labelTitle="Email"
            placeholder="username@hotmail.com"
            value={email}
            onChangeText={text => handleInputChange(text, 'email')}
            errorMessage="Please enter email"
            isInvalid={isError}
          />

          <InputText
            containerStyle={{marginTop: getWidth(4), width: '100%'}}
            labelTitle="Password"
            placeholder="Password123"
            isPassword={true}
            value={password}
            onChangeText={text => handleInputChange(text, 'password')}
            errorMessage="Please enter password"
            isInvalid={isError}
          />

          <InputText
            containerStyle={{marginTop: getWidth(4), width: '100%'}}
            labelTitle="Confirm Password"
            placeholder="Password123"
            isPassword={true}
            value={confirmPassword}
            onChangeText={text => handleInputChange(text, 'confirmPassword')}
            errorMessage="Please enter confirm password"
            isInvalid={isError}
          />

          {/* <Text style={styles.forgetText}>Forgot Password?</Text> */}

          <InputButton
            onPress={handleRegister}
            style={styles.continueBtn}
            labelTitle="CONTINUE"
            textColor={Colors.gray1}
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
    padding: getWidth(8),
  },
  innerContainer: {
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: getWidth(40),
    height: getWidth(18),
    resizeMode: 'contain',
    marginBottom: getWidth(3),
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
    ...fontSemiBold(3),
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
    backgroundColor: Colors.gray1,
    borderColor: Colors.gray2_0,
  },
});
