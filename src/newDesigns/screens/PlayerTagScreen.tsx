import React, {useEffect, useId, useState} from 'react';

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
import {InputText} from '../components/InputText';
import Colors from '../components/Colors';
import {useGlobalDataContext} from '../../context';
import axios, {AxiosError} from 'axios';
import {API_BASE_URL} from '../../app/config/api';

export default function PlayerTagScreen() {
  const navigation = useNavigation();
  const [isError, setIsError] = useState(false);
  const {data, setData} = useGlobalDataContext();
  const [playerTag, setPlayerTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const imageId = useId();
  const [imageLoading, setLoadingImage] = useState(true);
  const [isPlayerTagValid, setIsPlayerTagValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingImage(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (text: string) => {
    setPlayerTag(text);
    setIsError(false);
    setError('');
    const alphanumericRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{5,15}$/;
    setIsPlayerTagValid(alphanumericRegex.test(text));
  };

  console.log({isPlayerTagValid});

  const handleSaveName = async () => {
    try {
      setIsLoading(true);
      setError('');
      if (!playerTag.length) {
        setError('Player tag required!');
        setIsLoading(false);
        return;
      }

      if (!isPlayerTagValid) {
        setError(
          'Player tag must contain between 5 and 15 alphanumeric characters',
        );
        setIsLoading(false);
        return;
      } else {
        const userName = {userName: playerTag};
        const apiUrl = `${API_BASE_URL}/users/check-username`;
        const headers = {
          Authorization: `${data.token}`,
          'Content-Type': 'application/json',
        };
        const res = await axios.post(apiUrl, userName, {headers});

        if (res.data.isAvailable && isError === false) {
          try {
            const updateUrl = `${API_BASE_URL}/users/update-user`;
            const updateBody = {username: playerTag};
            const updateResponse = await axios.put(updateUrl, updateBody, {
              headers,
            });
            console.log('Player Tag Response:', updateResponse.data);
            setData(prevData => ({
              ...prevData,
              playerTag: playerTag,
            }));

            navigation.navigate('AvatarScreen');
          } catch (updateError) {
            console.error('Error:', updateError);
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError?.response?.status === 409) {
          setIsError(true);
          setError('Player tag already taken');
        } else {
          console.log('Error -->', axiosError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const imgUrl = data.avatarURL.replace('.glb', '.png');
  const NewImageUrl = `${imgUrl}?pose=thumbs-up&expression=happy&camera=fullbody`;

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

          <InputText
            containerStyle={{marginTop: getWidth(3), width: '100%'}}
            labelTitle="Player Tag"
            placeholder="JohnDoe123"
            value={playerTag}
            onChangeText={handleInputChange}
            errorMessage="Player tag already taken"
            showError={error !== ''}
            isInvalid={error.length !== 0}
          />
          <Text style={styles.infoText}>
            {'Must contain between 5 & 15 alphanumeric characters'}
          </Text>

          {imageLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.lightGreen} />
            </View>
          ) : (
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                width: '110%',
                marginVertical: getWidth(5),
              }}
              key={imageId}
              source={{uri: NewImageUrl + '?' + new Date()}}
            />
          )}

          <InputButton
            onPress={handleSaveName}
            style={styles.continueBtn}
            textColor={Colors.gray1}
            isLoading={isLoading}
            labelTitle="CONTINUE"
            isDisabled={!isPlayerTagValid || isLoading}
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
    backgroundColor: '#1f1f1f',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    ...fontBold(2.8),
    opacity: 0.5,
    marginLeft: getWidth(1),
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
