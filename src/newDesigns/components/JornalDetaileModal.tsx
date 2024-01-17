import React, { forwardRef, useImperativeHandle, useState } from 'react';

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
import Colors from '../components/Colors';
import ReactNativeModal from 'react-native-modal';
import QuestionWithOptions from './QuestionWithOptions';

 const JornalDetaileModal = forwardRef(({}, ref)=> {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);


  useImperativeHandle(ref, () => ({
    showModal(value) {
        setIsVisible(value)
    },
    hideModal(value) {
        setIsVisible(value)
    },
}));

  return (
    <ReactNativeModal style={{margin: 0, padding: 0}} isVisible={isVisible}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1, backgroundColor: Colors.gray2, borderTopLeftRadius:getWidth(6), borderTopRightRadius:getWidth(6)}}>
          <View
            style={{
              alignItems: 'center',
              padding: getWidth(5),
              backgroundColor: Colors.gray2,
              borderRadius: getWidth(4),
              paddingBottom: getWidth(10),
            }}>
            <View style={{flexDirection: 'row', marginBottom:getWidth(6)}}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={{
                    width: getWidth(6),
                    height: getWidth(6),
                    resizeMode: 'contain',
                  }}
                  source={require('../../newDesigns/assets/images/leftErrow.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: getWidth(5)}}
                onPress={() => {}}>
                <Image
                  style={{
                    width: getWidth(6),
                    height: getWidth(6),
                    resizeMode: 'contain',
                  }}
                  source={require('../../newDesigns/assets/images/rightArrow.png')}
                />
              </TouchableOpacity>
              <View style={{flex: 1}} >
              <View style={{width:getWidth(20), height:getWidth(2), borderRadius:getWidth(10), backgroundColor:Colors.gray2_0, marginLeft:getWidth(20)}} />
              </View>
              <TouchableOpacity
              onPress={()=>{
                setIsVisible(false)
              }}
              >
                <Image
                  style={{
                    width: getWidth(6),
                    height: getWidth(6),
                    resizeMode: 'contain',
                  }}
                  source={require('../../newDesigns/assets/images/cross.png')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '97%',
                alignItems: 'center',
              }}>
              <View>
                <Text style={fontBold(3.5)}>July 16</Text>
                <Text style={fontBold(3.5)}>July 16</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: getWidth(6),
                  backgroundColor: Colors.gray3 + '30',
                }}
              />
              <View>
                <Text style={fontBold(3.5)}>July 16</Text>
                <Text style={fontBold(3.5)}>July 16</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: getWidth(6),
                  backgroundColor: Colors.gray3 + '30',
                }}
              />
              <View>
                <Text style={fontBold(3.5)}>July 16</Text>
                <Text style={fontBold(3.5)}>July 16</Text>
              </View>
            </View>

            <View
              style={{
                paddingVertical: getWidth(3),
                backgroundColor: Colors.gray2_0,
                width: '100%',
                borderRadius: getWidth(3),
                padding: getWidth(4),
                marginTop: getWidth(5),
                height: getWidth(23),
              }}>
              <Text style={fontBold(4)}>Enemies Defeated</Text>
              <View style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                {[
                  {
                    image: require(`../../newDesigns/assets/images/STRENGTH.png`),
                    color: '#80B310',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/DEFENSE.png`),
                    color: '#C50CCA',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/AGILITY.png`),
                    color: '#0783E9',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/VITALITY.png`),
                    color: '#D10F13',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/INTELLECT.png`),
                    color: '#C3C218',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/Luck.png`),
                    color: '#12BF89',
                  },
                ].map((item, index) => (
                  <View
                    style={[
                      styles.image,
                      {
                        marginLeft: index ? -getWidth(3.5) : 0,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      style={[
                        {width: '80%', height: '80%', resizeMode: 'contain'},
                      ]}
                      source={item.image}
                    />
                  </View>
                ))}
              </View>
            </View>

            <View
              style={{
                paddingVertical: getWidth(3),
                backgroundColor: Colors.gray2_0,
                width: '100%',
                borderRadius: getWidth(3),
                padding: getWidth(4),
                marginTop: getWidth(3),
                height: getWidth(24),
              }}>
              <Text style={fontBold(4)}>Attributes Gained</Text>
              <View style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                {[
                  {
                    image: require(`../../newDesigns/assets/images/STRENGTH.png`),
                    color: '#80B310',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/DEFENSE.png`),
                    color: '#C50CCA',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/AGILITY.png`),
                    color: '#0783E9',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/VITALITY.png`),
                    color: '#D10F13',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/INTELLECT.png`),
                    color: '#C3C218',
                  },
                  {
                    image: require(`../../newDesigns/assets/images/Luck.png`),
                    color: '#12BF89',
                  },
                ].map((item, index) => (
                  <View
                    style={[
                      styles.image,
                      {
                        marginLeft: index ? -getWidth(3.5) : 0,
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image
                      style={[
                        {width: '80%', height: '80%', resizeMode: 'contain'},
                      ]}
                      source={item.image}
                    />
                  </View>
                ))}
              </View>
            </View>
            <Text
              style={[
                fontRegular(3.5, Colors.gray3),
                {marginVertical: getWidth(8), lineHeight: getWidth(7)},
              ]}>
              Today, I took my first step toward the Avatar State by embracing
              the Push-Up Prowess Challenge. Apathy and Fatigue, like shadowy
              specters, attempted to discourage me. Yet, my resolve to prove my
              strength and commitment remained unshaken. As I performed each
              flawless push-up, I sensed my upper body and core growing more
              robust with every motion.
            </Text>

            <QuestionWithOptions
              question={
                'How would you rate the difficulty of the Push-Prowess Challenge?'
              }
              options={['Easy', 'Moderate', 'Hard']}
            />

            <QuestionWithOptions
              style={{marginTop: getWidth(5)}}
              question={
                'How would you rate the difficulty of the Push-Prowess Challenge?'
              }
              options={['Easy', 'Moderate', 'Hard']}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ReactNativeModal>
  );
});

const styles = StyleSheet.create({
  image: {
    width: getWidth(11),
    height: getWidth(11),
    resizeMode: 'contain',
    backgroundColor: Colors.gray1,
    borderRadius: getWidth(10),
    borderWidth: 3,
    borderColor: Colors.gray2_0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default JornalDetaileModal