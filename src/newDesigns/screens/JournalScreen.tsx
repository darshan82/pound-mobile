import React, {useRef} from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
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
import {InputText} from '../components/InputText';
import Colors from '../components/Colors';
import JornalDetaileModal from '../components/JornalDetaileModal';
import LockView from '../components/LockView';

export default function RankingScreen() {
  const navigation = useNavigation();
  const jornalDetaileModalRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          style={{marginTop: getWidth(3), paddingHorizontal: getWidth(4)}}
          data={['', '', '']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => jornalDetaileModalRef.current?.showModal(true)}
                style={{
                  alignItems: 'center',
                  paddingVertical: getWidth(3),
                  paddingHorizontal: getWidth(5),
                  backgroundColor: Colors.gray2,
                  borderRadius: getWidth(4),
                  marginTop: getWidth(3),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '95%',
                    alignItems: 'center',
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={fontBold(3.3)}>July 16</Text>
                    <Text style={fontRegular(3.3)}>2023</Text>
                  </View>
                  <View
                    style={{
                      width: 1,
                      height: getWidth(6),
                      backgroundColor: Colors.gray3 + '30',
                    }}
                  />
                  <View style={{alignItems: 'center'}}>
                    <Text style={fontBold(3.3)}>146</Text>
                    <Text
                      style={[
                        fontRegular(3.3, Colors.gray3),
                        {marginTop: getWidth(1)},
                      ]}>
                      XP Gain
                    </Text>

                    <View
                      style={{
                        width: '100%',
                        borderRadius: getWidth(3),
                        alignItems: 'center',
                        marginTop: getWidth(2),
                      }}>
                      <View
                        style={{flexDirection: 'row', marginTop: getWidth(1)}}>
                        {[
                          {
                            image: require(`../assets/images/Ene1.png`),
                            color: '#80B310',
                          },
                          {image: require(`../assets/images/Ene2.png`)},
                        ].map((item, index) => (
                          <View
                            style={[
                              styles.image,
                              {
                                marginLeft: index ? -getWidth(2) : 0,
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
                              source={item.image}
                            />
                          </View>
                        ))}
                      </View>
                      <Text
                        style={[
                          fontRegular(3.3, Colors.gray3),
                          {marginTop: getWidth(1)},
                        ]}>
                        Enemies
                      </Text>
                    </View>
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
                      <Text style={fontBold(3.3)}>23</Text>
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
                    <Text style={fontRegular(3.3, Colors.gray3)}>Token</Text>
                    <View
                      style={{
                        width: '100%',
                        borderRadius: getWidth(3),
                        alignItems: 'center',
                        marginTop: getWidth(2),
                      }}>
                      <View
                        style={{flexDirection: 'row', marginTop: getWidth(1)}}>
                        {[
                          {
                            image: require(`../assets/images/INTELLECT.png`),
                            color: '#80B310',
                          },
                          {image: require(`../assets/images/STRENGTH.png`)},
                          {image: require(`../assets/images/VITALITY.png`)},
                        ].map((item, index) => (
                          <View
                            style={[
                              styles.image,
                              {
                                marginLeft: index ? -getWidth(2) : 0,
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
                              source={item.image}
                            />
                          </View>
                        ))}
                      </View>
                      <Text
                        style={[
                          fontRegular(3.3, Colors.gray3),
                          {marginTop: getWidth(1)},
                        ]}>
                        Attributes
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <LockView
      btnText="text"
      />
      <JornalDetaileModal ref={jornalDetaileModalRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray0,
  },
  innerContainer: {
    // flex:1,
    justifyContent: 'center',
  },
  image: {
    width: getWidth(7),
    height: getWidth(7),
    resizeMode: 'contain',
    backgroundColor: Colors.gray1,
    borderRadius: getWidth(10),
    borderWidth: 2,
    borderColor: Colors.gray2_0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
