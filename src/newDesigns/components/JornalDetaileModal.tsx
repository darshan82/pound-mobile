import React, {forwardRef, useImperativeHandle, useState} from 'react';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import Colors from '../components/Colors';
import ReactNativeModal from 'react-native-modal';
import QuestionWithOptions from './QuestionWithOptions';

const JornalDetaileModal = forwardRef(
  ({journalData, monthPart, yearPart, enemyImage, attributeImages}, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const enemies = journalData[0]?.enemies;
    const attributes = journalData[0]?.attributes;

    useImperativeHandle(ref, () => ({
      showModal(value) {
        setIsVisible(value);
      },
      hideModal(value) {
        setIsVisible(value);
      },
    }));

    return (
      <ReactNativeModal style={{margin: 0, padding: 0}} isVisible={isVisible}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: Colors.gray2,
              borderTopLeftRadius: getWidth(6),
              borderTopRightRadius: getWidth(6),
            }}>
            <View
              style={{
                alignItems: 'center',
                padding: getWidth(5),
                backgroundColor: Colors.gray2,
                borderRadius: getWidth(4),
                paddingBottom: getWidth(10),
              }}>
              <View style={{flexDirection: 'row', marginBottom: getWidth(6)}}>
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
                <View style={{flex: 1}}>
                  <View
                    style={{
                      width: getWidth(20),
                      height: getWidth(2),
                      borderRadius: getWidth(10),
                      backgroundColor: Colors.gray2_0,
                      marginLeft: getWidth(20),
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                  }}>
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
                  width: '75%',
                  alignItems: 'center',
                  marginTop: getWidth(4),
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text style={fontBold(3.5)}>
                    {monthPart ? monthPart : '16 Jan'}
                  </Text>
                  <Text style={fontRegular(3.5)}>
                    {yearPart ? yearPart : '2024'}
                  </Text>
                </View>
                <View
                  style={{
                    width: 1,
                    height: getWidth(6),
                    backgroundColor: Colors.gray3 + '30',
                  }}
                />
                <View style={{alignItems: 'center'}}>
                  <Text style={fontBold(3.5)}>{journalData[0]?.totalXps}</Text>
                  <Text
                    style={[
                      fontRegular(3.5, Colors.gray3),
                      {marginTop: getWidth(1)},
                    ]}>
                    XP Gain
                  </Text>
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
                    <Text style={fontBold(3.5)}>
                      {journalData[0]?.totalTokens}
                    </Text>
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
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: getWidth(10),
                }}>
                <View
                  style={{
                    borderRadius: getWidth(3),
                    alignItems: 'center',
                    marginTop: getWidth(3),
                    backgroundColor: Colors.gray2_0,
                    padding: getWidth(3),
                  }}>
                  <Text
                    style={[
                      fontRegular(3.5, Colors.white),
                      {marginTop: getWidth(1)},
                    ]}>
                    Enemies
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                    {enemies?.map((enemy, index) => {
                      return (
                        <View
                          key={index}
                          style={[
                            styles.image,
                            {
                              marginLeft: index ? -getWidth(3) : 0,
                              overflow: 'hidden',
                            },
                          ]}>
                          <Image
                            style={{
                              width: '70%',
                              height: '70%',
                              resizeMode: 'contain',
                            }}
                            source={enemyImage[enemy]}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>

                <View
                  style={{
                    borderRadius: getWidth(3),
                    alignItems: 'center',
                    marginTop: getWidth(3),
                    backgroundColor: Colors.gray2_0,
                    padding: getWidth(3),
                    marginLeft: getWidth(10),
                  }}>
                  <Text
                    style={[
                      fontRegular(3.5, Colors.white),
                      {marginTop: getWidth(1)},
                    ]}>
                    Attributes
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                    {attributes?.map((attribute, index) => (
                      <View
                        style={[
                          styles.image,
                          {
                            marginLeft: index ? -getWidth(3) : 0,
                            overflow: 'hidden',
                          },
                        ]}>
                        <Image
                          style={[
                            {
                              width: '70%',
                              height: '70%',
                              resizeMode: 'contain',
                            },
                          ]}
                          source={attributeImages[attribute]}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <Text
                style={[
                  fontRegular(3.5, Colors.gray3),
                  {marginVertical: getWidth(8), lineHeight: getWidth(7)},
                ]}>
                Today, I took my first step toward the Avatar State by embracing
                the Push-Up Prowess Challenge. Apathy and Fatigue, like shadowy
                specters, attempted to discourage me. Yet, my resolve to prove
                my strength and commitment remained unshaken. As I performed
                each flawless push-up, I sensed my upper body and core growing
                more robust with every motion.
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
  },
);

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

export default JornalDetaileModal;
