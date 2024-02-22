import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from './Colors';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {InputButton} from './InputButton';
import {useNavigation} from '@react-navigation/native';

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

const CongratulationsModal = ({
  userChallenges,
  setShowCongratsModal,
  createChallenge,
}) => {
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  const handleOperation = async () => {
    if (!userChallenges.length) {
      await createChallenge();
      setShowCongratsModal(false);
    } else {
      setShowCongratsModal(false);
    }
  };

  return (
    <>
      <View style={{height: windowHeight - 270}}>
        <View style={[styles.innerContainer, {marginHorizontal: 20}]}>
          <TouchableOpacity onPress={handleOperation}>
            <Text
              style={{
                color: '#818181',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'right',
              }}>
              X
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={[
                fontBold(4),
                {
                  marginTop: 10,
                  lineHeight: 30,
                  textAlign: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                },
              ]}>
              {` Congratulations, you successfully completed the ${userChallenges?.ChallengeName}
              Challenge`}
            </Text>
          </View>

          <View style={{marginTop: getWidth(2)}}>
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
                <Text style={fontBold(3.5)}>{userChallenges?.xp}</Text>
                <Text style={fontRegular(3.5, Colors.gray3)}>XP Gain</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: getWidth(6),
                  backgroundColor: Colors.gray3 + '30',
                }}
              />
              <View style={{}}>
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
                  marginRight: 40,
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
        </View>
      </View>
      <InputButton
        onPress={() => navigation.navigate('Journal')}
        style={styles.submitBtn}
        textColor={'white'}
        labelTitle="Go To Journal"
      />
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    // flex: 1,
    backgroundColor: Colors.gray2,
    marginVertical: getWidth(4),
    padding: getWidth(4),
    borderRadius: getWidth(4),
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

export default CongratulationsModal;
