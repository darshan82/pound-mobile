import React, {useEffect, useState} from 'react';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

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

import {InputButton} from '../components/InputButton';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import Colors from '../components/Colors';
import LockView from '../components/LockView';
import {useGlobalDataContext} from '../../context';
import axios from 'axios';

export default function FitnessChallage() {
  const {data} = useGlobalDataContext();
  const [showCreateScreen, setShowCreateScreen] = useState(false);
  const [userChallenges, setUserChallenges] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {userId, loginToken} = data;

  const reloadChallenge = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % userChallenges.length);
  };

  useEffect(() => {
    const checkUserId = async () => {
      try {
        const apiUrl = 'http://18.217.10.162/api/challenges';
        const headers = {
          Authorization: `${loginToken}`,
          'Content-Type': 'application/json',
        };
        const res = await axios.get(apiUrl, {headers});
        setUserChallenges(res.data);

        const hasUserId = res.data.some(
          challenge => challenge.userId === userId,
        );

        if (hasUserId) {
          setShowCreateScreen(true);
        } else {
          setShowCreateScreen(false);
        }
      } catch (error) {
        console.error('Error fetching challenge data:', error);
      }
    };

    checkUserId();
  }, [loginToken, userId, showCreateScreen]);

  const createdAtDate = new Date(userChallenges[currentIndex]?.createdAt);

  const formattedDate = createdAtDate.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  const [monthPart] = formattedDate.split(', ');

  const createChallenge = async () => {
    try {
      const apiUrl = 'http://18.217.10.162/api/challenges/create-challenge';
      const headers = {
        Authorization: `${loginToken}`,
        'Content-Type': 'application/json',
      };
      const body = {};
      const res = await axios.post(apiUrl, body, {headers});
      console.log('Challenge Created -->', res.data);
      setShowCreateScreen(true);
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  const completeChallenge = async id => {
    try {
      const apiUrl = `http://18.217.10.162/api/challenges/complete-challenge/${id}`;
      console.log({apiUrl});
      const headers = {
        Authorization: `${loginToken}`,
        'Content-Type': 'application/json',
      };

      const res = await axios.put(apiUrl, {}, {headers});
      console.log('Challenge Completed -->', res.data);
    } catch (error) {
      console.error('Error Completed challenge:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {!showCreateScreen ? (
        <LockView
          text="Need a Challenge?"
          subText=""
          btnText="Generate Challenge"
          handleBtnClick={createChallenge}
        />
      ) : (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            backgroundColor: Colors.gray0,
            paddingHorizontal: getWidth(4),
          }}>
          {userChallenges.length > 0 ? (
            <>
              <View style={styles.innerContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[fontBold(4), {}]}>
                    {userChallenges[currentIndex].ChallengeName}
                  </Text>
                  <View style={{flex: 1}} />
                  <TouchableOpacity
                    onPress={reloadChallenge}
                    style={{
                      backgroundColor: Colors.gray3 + 30,
                      paddingHorizontal: getWidth(3),
                      paddingVertical: getWidth(1),
                      borderRadius: getWidth(4),
                    }}>
                    <Image
                      style={{
                        width: getWidth(6),
                        height: getWidth(6),
                        resizeMode: 'contain',
                      }}
                      source={require('../assets/images/reload.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: getWidth(2)}}>
                  <Text
                    style={[
                      fontRegular(3.5, Colors.gray3),
                      {lineHeight: getWidth(6)},
                    ]}>
                    {userChallenges[currentIndex].ChallangeDescription}
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
                      <Text style={fontBold(3.5)}>{monthPart}</Text>
                      <Text style={fontRegular(3.5, Colors.gray3)}>
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
                          {' '}
                          {userChallenges[currentIndex].Token}
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
                      <View
                        style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                        {userChallenges[currentIndex]?.EnemiesList?.map(
                          (item, index) => (
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
                                source={
                                  enemyImage[item as keyof typeof enemyImage]
                                }
                              />
                            </View>
                          ),
                        )}
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
                      <View
                        style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                        {userChallenges[currentIndex]?.AttributesList?.map(
                          (item, index) => (
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
                                source={
                                  attributeImages[
                                    item as keyof typeof attributeImages
                                  ]
                                }
                              />
                            </View>
                          ),
                        )}
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
                        {
                          marginTop: getWidth(1),
                          flex: 1,
                          lineHeight: getWidth(5.5),
                          letterSpacing: getWidth(0.3),
                        },
                      ]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>

              <InputButton
                onPress={() => {}}
                style={[
                  {
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    height: getWidth(5),
                  },
                ]}
                labelTitle="Accept Challenge"
              />

              <TouchableOpacity
                onPress={() =>
                  completeChallenge(userChallenges[currentIndex]._id)
                }
                style={[
                  styles.continueBtn,
                  {
                    borderWidth: 0,
                    backgroundColor: Colors.lightGreen,
                    borderRadius: getWidth(3),
                    height: getWidth(13),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}>
                <Text style={[fontBold(4, Colors.gray1), {}]}>
                  Motion detected
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: Colors.gray1,
                    padding: getWidth(1),
                    paddingHorizontal: getWidth(2),
                    borderRadius: getWidth(3),
                    marginLeft: getWidth(2),
                  }}>
                  <Text
                    style={fontBold(
                      3,
                    )}>{`+ ${userChallenges[currentIndex].Token}`}</Text>
                  <Image
                    style={[
                      {
                        width: getWidth(4.5),
                        height: getWidth(4.5),
                        resizeMode: 'contain',
                        marginLeft: getWidth(2),
                      },
                    ]}
                    source={require('../assets/images/tokenpound.png')}
                  />
                </View>
              </TouchableOpacity>

              <InputButton
                onPress={() =>
                  completeChallenge(userChallenges[currentIndex]._id)
                }
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
            </>
          ) : null}
        </ScrollView>
      )}
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
