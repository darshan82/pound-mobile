import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  BackHandler,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  fontBold,
  fontSemiBold,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {RoundProgress} from '../components/RoundProgress';
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import Colors from '../components/Colors';
import {useGlobalDataContext} from '../../context';
import axios from 'axios';

const ProgressBar = ({
  progress = 0.1,
  style,
  progressHeight = getWidth(2),
  toColor = '#AEFF03',
}) => {
  return (
    <View
      style={[
        {
          marginTop: getWidth(1),
          overflow: 'hidden',
        },
        style,
      ]}>
      <Image
        style={{position: 'absolute'}}
        source={require('../assets/images/progressBG.png')}
      />
      <SimpleGradientProgressbarView
        style={{width: '100%', height: progressHeight}}
        fromColor="#FFFFFF"
        toColor={toColor}
        progress={progress}
        maskedCorners={[1, 1, 1, 1]}
        cornerRadius={7.0}
      />
      <Image
        style={{
          position: 'absolute',
          width: `${progress * 100}%`,
          height: '100%',
          resizeMode: 'repeat',
        }}
        source={require('../assets/images/progeessStep.png')}
      />
    </View>
  );
};

type UserData = {
  totalTokens: number;
  Energy: number;
  HRV: number;
  Recovery: number;
  Strain: number;
  __v: number;
  _id: string;
  age: number;
  avatar: string;
  email: string;
  fitnessTracking: {
    heartRateDetection: string;
    motionDetection: boolean;
    stepCounting: boolean;
  };
  gamesToplay: string[];
  isVerified: boolean;
  language: string;
  level: number;
  location: {
    country: string;
  };
  notification: boolean;
  physicalAttributes: {
    gender: string;
    height: number;
    weight: number;
  };
  physiqueGoal: string;
  poundScore: number;
  ranking: number;
  Steps: number;
  sleepingMode: boolean;
  sound: boolean;
  streaks: number;
  timezones: {
    default: string;
    fromIp: string;
  };
  username: string;
  weightGoal: string;
};

export default function ProgressScreen() {
  const navigation = useNavigation();

  const [isColored, setIsColor] = useState(true);
  const {data} = useGlobalDataContext();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const userToken = data.loginToken;
        const apiUrl = 'http://18.217.10.162/api/users/profile';
        const headers = {
          Authorization: `${userToken}`,
          'Content-Type': 'application/json',
        };
        const res = await axios.get(apiUrl, {headers});
        console.log('res get profile -->', res.data);
        setUserData(res.data);
      } catch (e) {
        console.log('Error -->', e);
      }
    };
    getData();
  }, [data.loginToken]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.gray2,
          width: '100%',
          borderBottomLeftRadius: getWidth(8),
          borderBottomRightRadius: getWidth(8),
          paddingHorizontal: getWidth(5),
          paddingBottom: getWidth(6),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[fontBold(5), {flex: 1}]}>
            {userData && userData?.username ? userData?.username : 'Guest'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: getWidth(3),
              padding: getWidth(1),
              backgroundColor: Colors.gray2_0,
              alignItems: 'center',
              paddingRight: getWidth(4),
            }}>
            <Image
              style={{
                width: getWidth(5),
                height: getWidth(5),
                resizeMode: 'contain',
              }}
              source={require('../assets/images/tokenpound.png')}
            />
            <Text style={[fontBold(3.5), {marginLeft: getWidth(2)}]}>
              {userData && userData?.totalTokens ? userData?.totalTokens : 0}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[fontBold(3.2), {marginVertical: getWidth(1)}]}>
                LEVEL
              </Text>

              <Text style={[fontBold(3.2), {marginVertical: getWidth(1)}]}>
                {userData?.level ? userData?.level : 0}
              </Text>
            </View>

            <ProgressBar
              progress={userData ? userData.level / 10 : 0}
              progressHeight={getWidth(1.5)}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: getWidth(2),
              }}>
              <Text style={[fontBold(3.2), {marginVertical: getWidth(1)}]}>
                STREAK
              </Text>

              <Text style={[fontBold(3.2), {marginVertical: getWidth(1)}]}>
                {`${
                  userData && userData?.streaks ? userData?.streaks : 0
                } Days`}
              </Text>
            </View>
            <ProgressBar
              progress={userData ? userData?.streaks / 10 : 0}
              progressHeight={getWidth(1.5)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LeaderboardScreen');
            }}
            style={{
              height: getWidth(21),
              backgroundColor: Colors.gray2_0,
              padding: getWidth(3),
              marginLeft: getWidth(4),
              borderRadius: getWidth(3),
              alignItems: 'center',
              marginTop: getWidth(4),
            }}>
            <Image
              style={{
                width: getWidth(8),
                height: getWidth(6),
                resizeMode: 'contain',
              }}
              source={require('../assets/images/trophy.png')}
            />
            <Text style={[fontSemiBold(2.8), {marginVertical: getWidth(2)}]}>
              Ranking
            </Text>

            <View
              style={{
                backgroundColor: Colors.lightGreen,
                paddingHorizontal: getWidth(2),
                paddingVertical: getWidth(1),
                borderRadius: getWidth(5),
                alignItems: 'center',
                borderWidth: 3,
                borderColor: Colors.gray1,
              }}>
              <Text style={[fontBold(2.6, Colors.gray1)]}>
                {' '}
                {`#${userData?.ranking ? userData?.ranking : 0}`}{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{flex: 1, flexDirection: 'row', paddingHorizontal: getWidth(5)}}>
        <View
          style={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'space-around',
            paddingTop: getWidth(3),
          }}>
          <RoundProgress
            size={getWidth(20)}
            progress={userData ? userData?.Steps / 100 : 0}
            progressText={25}
            color={'#FA00FF'}
            centerImg={require('../assets/images/img5.png')}
            isloacked={false}
          />

          <RoundProgress
            size={getWidth(20)}
            progress={userData ? 25 : 0}
            progressText={25}
            color={'#2450FD'}
            centerImg={require('../assets/images/img4.png')}
            isloacked={false}
          />

          <RoundProgress
            size={getWidth(20)}
            progress={userData ? userData?.Strain : 0}
            progressText={25}
            color={'#F82003'}
            centerImg={require('../assets/images/img3.png')}
            isloacked={false}
          />

          <RoundProgress
            size={getWidth(20)}
            progress={userData ? userData.Recovery : 0}
            progressText={25}
            color={'#AEFF03'}
            centerImg={require('../assets/images/img2.png')}
            isloacked={false}
          />

          <RoundProgress
            size={getWidth(20)}
            progress={userData ? userData.Energy : 0}
            progressText={25}
            color={'#FFC700'}
            centerImg={require('../assets/images/img1.png')}
            isloacked={false}
          />
        </View>

        <TouchableOpacity
          style={{
            width: '87%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={1}>
          <Image
            style={styles.avatarImage}
            source={
              isColored
                ? require('../assets/images/CapsuleColor.png')
                : require('../assets/images/Capsule.png')
            }
          />
          <Image
            style={{
              position: 'absolute',
              width: '90%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={{
              uri: `${
                userData?.avatar.includes('glb')
                  ? userData?.avatar.replace('glb', 'png')
                  : userData?.avatar
              }?pose=relaxed&expression=happy&camera=fullbody`,
            }}
            // onError={error => console.log('Error loading image:', error)}
            onLoad={() => console.log('Image loaded successfully')}
          />

          <FlatList
            style={{
              position: 'absolute',
              width: getWidth(32),
              height: getWidth(19),
              bottom: getWidth(9),
              right: getWidth(25),
              backgroundColor: 'black',
              padding: getWidth(1),
              paddingRight: getWidth(2),
            }}
            data={[
              {
                image: require('../assets/images/STRENGTH.png'),
                color: '#80B310',
              },
              {
                image: require('../assets/images/DEFENSE.png'),
                color: '#C50CCA',
              },
              {
                image: require('../assets/images/AGILITY.png'),
                color: '#0783E9',
              },
              {
                image: require('../assets/images/VITALITY.png'),
                color: '#D10F13',
              },
              {
                image: require('../assets/images/INTELLECT.png'),
                color: '#C3C218',
              },
              {image: require('../assets/images/Luck.png'), color: '#12BF89'},
            ]}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: getWidth(2.7),
                      height: getWidth(2.7),
                      resizeMode: 'contain',
                    }}
                    source={item.image}
                  />
                  <View style={{flex: 1, width: '100%'}}>
                    <ProgressBar
                      progress={0.5}
                      progressHeight={getWidth(1)}
                      toColor={item.color}
                      style={{
                        borderWidth: 1,
                        borderColor: item.color,
                        borderRadius: getWidth(2),
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: getWidth(28),
            height: getWidth(12),
            backgroundColor: 'black',
            position: 'absolute',
            right: getWidth(24),
            top: getWidth(6),
            alignItems: 'center',
            justifyContent: 'center',
            borderTopWidth: 1,
            borderTopColor: Colors.gray2_0,
          }}>
          <Text
            style={{
              color: Colors.white,
              ...fontSemiBold(1.8),
              letterSpacing: getWidth(0.5),
            }}>
            POUND SCORE
          </Text>
          <Text
            style={{
              color: Colors.lightGreen,
              fontSize: getWidth(4),
              fontFamily: 'CursedTimerULiL',
              marginTop: getWidth(1),
            }}>
            {userData ? userData?.poundScore : 0}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
