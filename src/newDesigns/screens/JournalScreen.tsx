import React, {useRef, useState, useEffect} from 'react';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import Colors from '../components/Colors';
import JornalDetaileModal from '../components/JornalDetaileModal';
import {useGlobalDataContext} from '../../context';
import axios from 'axios';

interface Journal {
  attributes: string[];
  date: string;
  enemies: string[];
  totalTokens: number;
  totalXps: number;
}

const attributeImages = {
  Strength: require('../assets/images/STRENGTH.png'),
  Luck: require('../assets/images/Luck.png'),
  Defense: require('../assets/images/DEFENSE.png'),
  Vitality: require('../assets/images/VITALITY.png'),
  Intellect: require('../assets/images/INTELLECT.png'),
  Agility: require('../assets/images/AGILITY.png'),
};

const enemyImage = {
  Apathy: require('../assets/images/Ene1.png'),
  Fatigue: require('../assets/images/Ene2.png'),
  Procrastination: require('../assets/images/Ene3.png'),
  Stress: require('../assets/images/Ene4.png'),
  Inconsistency: require('../assets/images/Ene5.png'),
  Injury: require('../assets/images/Ene6.png'),
  Plateaus: require('../assets/images/Ene7.png'),
};

export default function RankingScreen() {
  const jornalDetaileModalRef = useRef();
  const {data} = useGlobalDataContext();
  const [journalData, setJournalData] = useState<Journal[]>([]);

  useEffect(() => {
    const getJournalData = async () => {
      const apiUrl =
        'http://18.217.10.162/api/challenges/user-challenges-bydate';
      const headers = {
        Authorization: `${data.loginToken}`,
        'Content-Type': 'application/json',
      };
      const res = await axios.get(apiUrl, {headers});
      setJournalData(res.data);
      console.log('Response Of Journal API -->', res.data);
    };

    getJournalData();
  }, [data.loginToken]);

  console.log('date -->', journalData[0]?.date);

  const formattedDate = new Date(journalData[0]?.date).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
  );

  const [monthPart, yearPart] = formattedDate.split(', ');

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          style={{marginTop: getWidth(3), paddingHorizontal: getWidth(4)}}
          data={journalData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => jornalDetaileModalRef.current?.showModal(true)}
                style={{
                  alignItems: 'center',
                  padding: getWidth(5),
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
                    <Text style={fontBold(3.5)}>{monthPart}</Text>
                    <Text style={fontRegular(3.5)}>{yearPart}</Text>
                  </View>
                  <View
                    style={{
                      width: 1,
                      height: getWidth(6),
                      backgroundColor: Colors.gray3 + '30',
                    }}
                  />
                  <View style={{alignItems: 'center'}}>
                    <Text style={fontBold(3.5)}>{item.totalXps}</Text>
                    <Text
                      style={[
                        fontRegular(3.5, Colors.gray3),
                        {marginTop: getWidth(1)},
                      ]}>
                      XP Gain
                    </Text>

                    <View
                      style={{
                        width: '100%',
                        borderRadius: getWidth(3),
                        alignItems: 'center',
                        marginTop: getWidth(3),
                      }}>
                      <View
                        style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                        {item.enemies.slice(0, 3).map((enemy, index) => (
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
                              source={
                                enemyImage[enemy as keyof typeof enemyImage]
                              }
                            />
                          </View>
                        ))}
                      </View>
                      <Text
                        style={[
                          fontRegular(3.5, Colors.gray3),
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
                      <Text style={fontBold(3.5)}>{item.totalTokens}</Text>
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
                    <View
                      style={{
                        width: '100%',
                        borderRadius: getWidth(3),
                        alignItems: 'center',
                        marginTop: getWidth(3),
                      }}>
                      <View
                        style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                        {item.attributes.slice(0, 3).map((attribute, index) => (
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
                              style={[
                                {
                                  width: '70%',
                                  height: '70%',
                                  resizeMode: 'contain',
                                },
                              ]}
                              source={
                                attributeImages[
                                  attribute as keyof typeof attributeImages
                                ]
                              }
                            />
                          </View>
                        ))}
                      </View>
                      <Text
                        style={[
                          fontRegular(3.5, Colors.gray3),
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
      {/* <LockView
      btnText="text"
      /> */}
      <JornalDetaileModal
        journalData={journalData}
        monthPart={monthPart}
        attributeImages={attributeImages}
        enemyImage={enemyImage}
        yearPart={yearPart}
        ref={jornalDetaileModalRef}
      />
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
    width: getWidth(10),
    height: getWidth(10),
    resizeMode: 'contain',
    backgroundColor: Colors.gray1,
    borderRadius: getWidth(10),
    borderWidth: 4,
    borderColor: Colors.gray2_0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
