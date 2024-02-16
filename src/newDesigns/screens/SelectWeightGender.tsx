import React, {useState} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

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

export default function SelectWeightGender() {
  const navigation = useNavigation();
  const [gender, setGender] = useState('male');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>

      <LogoWithBack />
        <KeyboardAwareScrollView 
        
        >
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
            />

            <InputText
              containerStyle={{marginTop: getWidth(10), width: '100%'}}
              style={{color: '#AEFF03'}}
              isFloating={false}
              labelTitle="How much do you weight?"
              placeholder="Insert answer"
            />

            <Text style={[fontBold(4), {marginTop: getWidth(8)}]}>
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
                onPress={() => setGender('fe-male')}
                style={[
                  styles.continueBtn,
                  {
                    width: '48%',
                    marginLeft: '4%',
                    backgroundColor: Colors.gray2,
                  },
                  gender == 'fe-male'
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
          onPress={() => navigation.navigate('SelectLocation')}
          textColor={Colors.gray1}
          style={[
            styles.continueBtn,
            {
              marginTop: getWidth(5),
              borderRadius: getWidth(2),
            },
          ]}
          labelTitle="CONTINUE"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(4),
    paddingVertical: getWidth(4)
  },
  innerContainer: {
    flex: 1
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
