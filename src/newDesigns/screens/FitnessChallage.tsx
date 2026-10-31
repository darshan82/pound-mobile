import React, {useCallback, useEffect, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
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
import axios, {AxiosError} from 'axios';
import {isLight} from 'native-base/lib/typescript/theme/tools';
import CongratulationsModal from '../components/CongratulationsModal';
import {API_BASE_URL} from '../../app/config/api';

export default function FitnessChallage() {
  const {data} = useGlobalDataContext();
  const [showCreateScreen, setShowCreateScreen] = useState(false);
  const [userChallenges, setUserChallenges] = useState(null);
  const {loginToken} = data;
  const [isLoading, setIsLoading] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [challengeCompleteLoading, setChallengeCompleteLoading] =
    useState(false);
  const [lockViewLoading, setLockViewLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const getCurrentChallenge = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/challenges/get-current`;
      const headers = {
        Authorization: `${loginToken}`,
        'Content-Type': 'application/json',
      };
      const res = await axios.get(apiUrl, {headers});
      console.log('res from current', res.data);
      setUserChallenges(res?.data);
      if (res.data.length === 0) {
        setShowCreateScreen(true);
      } else {
        setShowCreateScreen(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log('Error getting current challenge', axiosError);
      if (axiosError.response?.data.message === 'No current challenge found') {
        setShowCreateScreen(true);
      }
    }
  };

  useEffect(() => {
    getCurrentChallenge();
  }, [loginToken, showCreateScreen, showCongratsModal]);

  const createdAtDate = new Date(userChallenges?.createdAt);

  const formattedDate = createdAtDate.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  const [monthPart] = formattedDate.split(', ');

  const completeChallenge = async id => {
    try {
      const updateUrl = `${API_BASE_URL}/challenges/${id}`;
      const headers = {
        Authorization: data.loginToken,
        'Content-Type': 'application/json',
      };
      const updateBody = {
        status: 'completed',
      };
      const response = await axios.put(updateUrl, updateBody, {headers});
      console.log(
        'response of difficulty status: ' + JSON.stringify(response.data),
      );
      setShowCongratsModal(true);
    } catch (error) {
      console.error('Error updating challenge difficulty:', error);
    }
  };

  const updateChallengeStatus = async id => {
    setChallengeCompleteLoading(true);
    try {
      const updateUrl = `${API_BASE_URL}/challenges/${id}`;
      const headers = {
        Authorization: data.loginToken,
        'Content-Type': 'application/json',
      };
      const updateBody = {
        status: 'accepted',
      };
      const response = await axios.put(updateUrl, updateBody, {headers});
      console.log(
        'response of difficulty status: ' + JSON.stringify(response.data),
      );
    } catch (error) {
      console.error('Error updating challenge difficulty:', error);
    } finally {
      setChallengeCompleteLoading(false);
      getCurrentChallenge();
    }
  };

  const createChallenge = async () => {
    console.log('funtion hit of create');
    setIsLoading(true);
    setLockViewLoading(true);
    try {
      const apiUrl = `${API_BASE_URL}/challenges/create-challenge`;
      const headers = {
        Authorization: `${loginToken}`,
        'Content-Type': 'application/json',
      };
      const body = {};
      const res = await axios.post(apiUrl, body, {headers});
      console.log('Challenge Created -->', res.data);
      getCurrentChallenge();
      setShowCreateScreen(false);
    } catch (error) {
      console.error('Error creating challenge:', error);
    } finally {
      setIsLoading(false);
      setLockViewLoading(false);
    }
  };

  if (showCongratsModal) {
    return (
      <CongratulationsModal
        userChallenges={userChallenges}
        setShowCongratsModal={setShowCongratsModal}
        createChallenge={createChallenge}
      />
    );
  }

  if (showCreateScreen) {
    return (
      <LockView
        text="Need a Challenge?"
        btnText="Generate Challenge"
        isLoading={isLoading || lockViewLoading}
        isDisable={isLoading}
        handleBtnClick={createChallenge}
      />
    );
  }

  // console.log('userChallenges yt', userChallenges.demoUrl);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.lightGreen} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          backgroundColor: '#1f1f1f',
          paddingHorizontal: getWidth(4),
        }}>
        <View style={styles.innerContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[fontBold(4), {}]}>
              {userChallenges?.ChallengeName}
            </Text>
            <View style={{flex: 1}} />
            <TouchableOpacity
              onPress={createChallenge}
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
              {userChallenges?.ChallangeDescription}
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
                  <Text style={fontBold(3.5)}> {userChallenges?.Token}</Text>
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
                <View style={{flexDirection: 'row', marginTop: getWidth(2)}}>
                  {userChallenges?.EnemiesList?.map((item, index) => (
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
                        source={enemyImage[item as keyof typeof enemyImage]}
                      />
                    </View>
                  ))}
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
                  {userChallenges?.AttributesList?.map((item, index) => (
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
                          attributeImages[item as keyof typeof attributeImages]
                        }
                      />
                    </View>
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
            <View>
              <YoutubePlayer
                play={playing}
                videoId={'hIkeJVV-Djk'}
                onChangeState={onStateChange}
              />
              <Text
                style={{
                  width: getWidth(80),
                  borderRadius: 10,
                  color: Colors.gray2,
                }}>
                {playing ? 'pause' : 'play'}
              </Text>
            </View>
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
        {userChallenges?.status === 'created' ? (
          <InputButton
            onPress={() => updateChallengeStatus(userChallenges?._id)}
            isLoading={challengeCompleteLoading}
            isDisabled={challengeCompleteLoading}
            style={[
              {
                borderWidth: 0,
                backgroundColor: 'transparent',
                height: getWidth(5),
              },
            ]}
            labelTitle="Accept Challenge"
          />
        ) : null}

        <TouchableOpacity
          onPress={() => completeChallenge(userChallenges?._id)}
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
          <Text style={[fontBold(4, Colors.gray1), {}]}>Motion detected</Text>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.gray1,
              padding: getWidth(1),
              paddingHorizontal: getWidth(2),
              borderRadius: getWidth(3),
              marginLeft: getWidth(2),
            }}>
            <Text style={fontBold(3)}>{`+ ${userChallenges?.Token}`}</Text>
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
          style={[
            styles.continueBtn,
            {
              borderWidth: 0.5,
              borderColor: Colors.gray3,
              backgroundColor: 'transparent',
              marginBottom: getWidth(5),
              height: getWidth(10),
            },
          ]}
          onPress={() => completeChallenge(userChallenges?._id)}
          labelTitle="Heart rate detected"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(8),
  },
  submitBtn: {
    marginLeft: 20,
    width: '90%',
    borderRadius: getWidth(3),
    borderWidth: 1,
    borderColor: '#3f3f3f',
    backgroundColor: 'transparent',
    color: 'white',
  },
  innerContainer: {
    // flex: 1,
    backgroundColor: Colors.gray2,
    marginVertical: getWidth(4),
    padding: getWidth(4),
    borderRadius: getWidth(4),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
