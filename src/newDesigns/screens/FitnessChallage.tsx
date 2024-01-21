import React, {useRef, useState} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';

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
import FitnessDetaileModal from '../components/FitnessDetaileModal';

export default function FitnessChallage() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const fitnessRef = useRef();

  return (
    <View
    style={{flex: 1}}
    >
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          backgroundColor: Colors.gray0,
          paddingHorizontal: getWidth(4),
        }}>
        <View style={styles.innerContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold(4), {}]}>Push-Up Prowess Challenge</Text>
            <View style={{flex: 1}} />
            <TouchableOpacity>
              <Image
                style={{
                  width: getWidth(6),
                  height: getWidth(6),
                  resizeMode: 'contain',
                }}
                source={require('../assets/images/cross.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: getWidth(2)}}>
            <Text
              style={[
                fontRegular(3.5, Colors.gray3),
                {lineHeight: getWidth(6)},
              ]}>
              Are you ready to embark on your journey to the Avatar State? The
              path begins with the Push-Up Prowess Challenge. This challenge is
              more than just push-ups...
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '70%',
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: getWidth(4),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={fontBold(3.5)}>July 16</Text>
                <Text style={fontRegular(3.5, Colors.gray3)}>XP Gain</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: getWidth(6),
                  backgroundColor: Colors.gray3 + '30',
                }}
              />
              <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={fontBold(3.5)}>23</Text>
                  <Image
                    style={[
                      {
                        width: getWidth(5),
                        height: getWidth(5),
                        resizeMode: 'contain',
                        marginLeft: getWidth(2),
                      },
                    ]}
                    source={require('../assets/images/tokenpound.png')}
                  />
                </View>
                <Text style={fontRegular(3.5, Colors.gray3)}>Token</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '85%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: getWidth(2),
                  backgroundColor: Colors.gray2_0,
                  paddingVertical: getWidth(6),
                  paddingHorizontal: getWidth(8),
                  borderRadius: getWidth(5),
                }}>
                <Text style={fontBold(3.5)}>Enemies</Text>
                <View style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                  {['', ''].map(() => (
                    <Image
                      style={styles.image}
                      source={require('../assets/images/img.png')}
                    />
                  ))}
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: getWidth(2),
                  backgroundColor: Colors.gray2_0,
                  paddingVertical: getWidth(6),
                  paddingHorizontal: getWidth(8),
                  borderRadius: getWidth(5),
                }}>
                <Text style={fontBold(3.5)}>Enemies</Text>
                <View style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                  {['', ''].map(() => (
                    <Image
                      style={styles.image}
                      source={require('../assets/images/img.png')}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: getWidth(5),
              height: getWidth(50),
              paddingHorizontal: getWidth(3),
              marginTop: getWidth(10),
              marginHorizontal: getWidth(1.5),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: getWidth(2),
              backgroundColor: Colors.gray2_0,
            }}>
            <Text style={[fontBold(3.5, 'white'), {elevation: 3}]}>
              {'DEMO OF CHALLENGE'}
            </Text>
          </View>
          <Text style={[fontRegular(4), {marginVertical: getWidth(3)}]}>
            Instructions:
          </Text>

          {[
            'Begin your journey by starting the challenge.',
            'With each push-up, demonstrate perfect form. Our advanced motion recognition technology will meticulously track your every move.',
            'Push yourself to perform as many correct push-ups as you can within a brief 2-minute window.',
            'Real-time feedback on your form and an accurate count of each precise push-up will guide your progress.',
            'Each push-up propels you closer to the Avatar State. Challenge Apathy and Fatigue, and discover the strength and agility within you.',
          ].map((item, index) => (
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  fontRegular(3.5, Colors.gray3),
                  {marginTop: getWidth(1), lineHeight: getWidth(5)},
                ]}>
                {++index}.{' '}
              </Text>
              <Text
                style={[
                  fontRegular(3.5, Colors.gray3),
                  {marginTop: getWidth(1), flex: 1, lineHeight: getWidth(5)},
                ]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <InputButton
          onPress={() => navigation.navigate('BodyTypeScreen')}
          style={[
            styles.continueBtn,
            {borderWidth: 0, backgroundColor: 'transparent'},
          ]}
          labelTitle="Accept Challenge"
        />

          <TouchableOpacity
           onPress={() => fitnessRef.current?.showModal(true)}
          style={[
            styles.continueBtn,
            {borderWidth: 0, backgroundColor: Colors.lightGreen, borderRadius:getWidth(3), height:getWidth(13), justifyContent:"center", alignItems:"center", flexDirection:"row"},
          ]}
          >
            <Text style={[fontBold(4, Colors.gray1),{}]}>Motion detected</Text>

            
                <View style={{flexDirection: 'row', backgroundColor:Colors.gray1, padding:getWidth(1), borderRadius:getWidth(3), marginLeft: getWidth(2),}}>
                  <Text style={fontBold(3.5)}>+23</Text>
                  <Image
                    style={[
                      {
                        width: getWidth(5),
                        height: getWidth(5),
                        resizeMode: 'contain',
                        marginLeft: getWidth(2),
                      },
                    ]}
                    source={require('../assets/images/tokenpound.png')}
                  />
                </View>
          </TouchableOpacity>
        

        <InputButton
          onPress={() => navigation.navigate('BodyTypeScreen')}
          style={[
            styles.continueBtn,
            {
              borderWidth: 0.5,
              borderColor: Colors.gray3,
              backgroundColor: 'transparent',
              marginBottom: getWidth(5),
            },
          ]}
          labelTitle="Heart rate detected"
        />
      </ScrollView>
      <FitnessDetaileModal ref={fitnessRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(8),
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.gray2,
    marginVertical: getWidth(4),
    padding: getWidth(4),
    borderRadius: getWidth(4),
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
    ...fontBold(7),
    textAlign: 'center',
  },
  discText: {
    alignSelf: 'center',
    ...fontBold(3),
    textAlign: 'center',
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
    marginTop: getWidth(5),
  },
  imgBtn: {
    marginTop: getWidth(4),
    backgroundColor: 'rgba(255,255,552,0.2)',
  },
  image: {
    width: getWidth(8),
    height: getWidth(8),
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: getWidth(10),
    borderWidth: 3,
    borderColor: Colors.gray2_0,
    marginLeft: -getWidth(1.5),
  },
});
