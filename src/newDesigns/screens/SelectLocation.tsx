import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {
  fontBold,
  getWidth,
  fontRegular,
} from '../../modules/dashboard/helpers/tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputText} from '../components/InputText';
import LogoWithBack from '../components/LogoWithBack';
import Colors from '../components/Colors';
import DropdownComponent from '../components/DropdownComponent';
import {useGlobalDataContext} from '../../context';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const LocationData = [
  {label: 'London', value: 'London'},
  {label: 'Italy', value: 'Italy'},
  {label: 'France', value: 'France'},
];

const TimeZone = [
  {label: 'UTC', value: 'UTC'},
  {label: 'EST', value: 'EST'},
  {label: 'CST', value: 'CST'},
  {label: 'MST', value: 'MST'},
  {label: 'PST', value: 'PST'},
];

export default function SelectLocation() {
  const navigation = useNavigation();
  const {data, setData} = useGlobalDataContext();
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [age, setAge] = useState('');
  const [location, setLocation] = useState(null);
  const [timeZone, setTimeZone] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocationPermission = async () => {
    await Geolocation.requestAuthorization();
  };

  const getLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLat(latitude);
        setLong(longitude);
      },
      error => {
        console.log('Error in Getting Location', error.message);
        setLat(null);
        setLong(null);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const handleAgeChange = (text: string) => {
    setAge(text);
  };

  const handlePhysique = async () => {
    setIsLoading(true);
    try {
      if (!age || !location || !timeZone) {
        return;
      }

      if (Number(age) < 16 || Number(age) > 60) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
      const updateUrl = 'http://18.217.10.162/api/users/update-user';
      const headers = {
        Authorization: `${data.token}`,
        'Content-Type': 'application/json',
      };
      const updateBody = {
        location: {
          country: location,
        },
        age: age,
        timezones: {
          default: timeZone,
          fromIp: `${long} - ${lat}`,
        },
      };
      const res = await axios.put(updateUrl, updateBody, {
        headers,
      });
      console.log('Update Physique -->', res.data);
      setData(prevData => ({
        ...prevData,
        age: res.data.age,
        location: res.data.location.country,
        timeZone: res.data.timezones.default,
        userIp: res.data.timezones.fromIp,
      }));
      navigation.navigate('FinalScreen');
    } catch (err) {
      console.log('Error -->', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LogoWithBack logo={true} />
      <KeyboardAwareScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.loginText}>{'Tell us about yourself.'}</Text>
          <Text style={styles.discText}>
            {
              'We use your data to provide highly\npersonalized and highly effective plans\nand suggestions.'
            }
          </Text>

          <InputText
            containerStyle={{marginTop: getWidth(2), width: '100%'}}
            style={{color: '#AEFF03'}}
            isFloating={false}
            labelTitle="How old are you?"
            placeholder="Enter your age between 16 and 60"
            value={age}
            keyboardType="numeric"
            errorMessage="Please enter your age between 16 and 60"
            isInvalid={isError}
            onChangeText={handleAgeChange}
          />

          <DropdownComponent
            containerStyle={{marginTop: getWidth(5), width: '100%'}}
            style={{color: '#AEFF03', backgroundColor: 'black'}}
            isFloating={false}
            labelTitle="What is your location?"
            placeholder="Insert answer"
            data={LocationData}
            onSelectValue={setLocation}
          />
          <DropdownComponent
            containerStyle={{marginTop: getWidth(5), width: '100%'}}
            style={{color: '#AEFF03'}}
            isFloating={false}
            labelTitle="What is your time zone?"
            placeholder="Insert answer"
            data={TimeZone}
            onSelectValue={setTimeZone}
          />
        </View>
      </KeyboardAwareScrollView>
      <InputButton
        onPress={handlePhysique}
        textColor={Colors.gray1}
        style={[
          styles.continueBtn,
          {
            marginTop: getWidth(2),
            borderRadius: getWidth(2),
          },
        ]}
        labelTitle="Continue"
        isLoading={isLoading}
        isDisabled={
          !age ||
          !location?.length ||
          !timeZone?.length ||
          isLoading ||
          Number(age) < 16 ||
          Number(age) > 60
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(5),
    paddingVertical: getWidth(5),
    backgroundColor: '#1f1f1f',
  },
  innerContainer: {
    flex: 1,
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
    ...fontBold(6.2),
    textAlign: 'center',
  },
  discText: {
    alignSelf: 'center',
    ...fontRegular(4.4, Colors.gray3),
    textAlign: 'center',
    lineHeight: getWidth(7),
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
    borderWidth: 0,
    backgroundColor: Colors.lightGreen,
    borderRadius: getWidth(3),
  },
  imgBtn: {
    marginTop: getWidth(4),
    backgroundColor: 'rgba(255,255,552,0.2)',
  },
});
