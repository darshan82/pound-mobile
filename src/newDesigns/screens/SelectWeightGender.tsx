import React, {useState} from 'react';

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
import {useGlobalDataContext} from '../../context';
import axios from 'axios';

export default function SelectWeightGender() {
  const navigation = useNavigation();
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const {data, setData} = useGlobalDataContext();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value, fieldName) => {
    switch (fieldName) {
      case 'height':
        setHeight(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      default:
        break;
    }
  };

  const handlePhysique = async () => {
    setIsLoading(true);
    try {
      if (!gender || !height.length || !weight.length) {
        setError('Please fill all the fields');
        return;
      }
      const updateUrl = 'http://18.217.10.162/api/users/update-user';
      const headers = {
        Authorization: `${data.token}`,
        'Content-Type': 'application/json',
      };
      const updateBody = {
        physicalAttributes: {
          gender: gender,
          height: height,
          weight: weight,
        },
      };
      const res = await axios.put(updateUrl, updateBody, {
        headers,
      });
      console.log('Update Physique -->', res.data);
      setData(prevData => ({
        ...prevData,
        gender: res.data.physicalAttributes.gender,
        height: res.data.physicalAttributes.height,
        weight: res.data.physicalAttributes.weight,
      }));
      navigation.navigate('SelectLocation');
    } catch (err) {
      console.log('Error -->', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <LogoWithBack logo={true}/>
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
              labelTitle="How tall are you?"
              placeholder="Insert answer"
              value={height}
              onChangeText={text => handleInputChange(text, 'height')}
              keyboardType="numeric"
              errorMessage="Please enter your height"
              showError={error !== ''}
            />

            <InputText
              containerStyle={{marginTop: getWidth(5), width: '100%'}}
              style={{color: '#AEFF03'}}
              isFloating={false}
              labelTitle="How much do you weight?"
              placeholder="Insert answer"
              value={weight}
              onChangeText={text => handleInputChange(text, 'weight')}
              keyboardType="numeric"
              errorMessage="Please enter your weight"
              isInvalid={isError}
            />

            <Text style={[fontBold(4), {marginTop: getWidth(5)}]}>
              {'What is your gender?'}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <InputButton
                onPress={() => setGender('male')}
                style={[
                  styles.continueBtn,
                  {width: '48%', backgroundColor: Colors.gray2},
                  gender == 'male'
                    ? {
                        backgroundColor: Colors.lightGreen + '30',
                        borderWidth: 2,
                        borderColor: Colors.lightGreen,
                      }
                    : null,
                ]}
                textColor={gender == 'male' ? Colors.lightGreen : Colors.white}
                labelTitle="Male"
              />
              <InputButton
                onPress={() => setGender('female')}
                style={[
                  styles.continueBtn,
                  {
                    width: '48%',
                    marginLeft: '4%',
                    backgroundColor: Colors.gray2,
                  },
                  gender == 'female'
                    ? {
                        backgroundColor: Colors.lightGreen + '30',
                        borderWidth: 2,
                        borderColor: Colors.lightGreen,
                      }
                    : null,
                ]}
                textColor={gender == 'fe-male' ? Colors.lightGreen : Colors.white}
                labelTitle="Female"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <InputButton
          onPress={handlePhysique}
          textColor={Colors.gray1}
          style={[
            styles.continueBtn,
            {
              marginTop: getWidth(5),
              borderRadius: getWidth(2),
            },
          ]}
          labelTitle="CONTINUE"
          isLoading={isLoading}
          isDisabled={isLoading || !height.length || !weight.length}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(4),
    paddingVertical: getWidth(4),
    backgroundColor: "#1f1f1f",

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
    ...fontBold(6.3),
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
