import React from 'react';

import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fontBold, getWidth } from '../../modules/dashboard/helpers/tabs';
import RankingScreen from './RankingScreen';
import LogoWithBack from '../components/LogoWithBack';
import { MyTabBar } from '../routes/Navigation';
import Colors from '../components/Colors';
import TeamRankingScreen from './TeamRankingScreen';

const Tab = createMaterialTopTabNavigator();

export default function LeaderboardScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.innerContainer}>
          <View
            style={{
              backgroundColor: Colors.gray2,
              paddingHorizontal: getWidth(4),
            }}>
            <LogoWithBack logo={true} />
          </View>

          <Tab.Navigator
            tabBar={props => <MyTabBar {...props} isHome={true} />}
            backBehavior="none"
            screenOptions={{
              tabBarActiveTintColor: '#AEFF03',
              tabBarInactiveTintColor: 'white',
              tabBarIndicatorStyle: {
                backgroundColor: '#AEFF03',
              },
              lazy: true,
              lazyPreloadDistance: 0,
              tabBarLabelStyle: {
                fontSize: getWidth(3.5),
                padding: 0,
                margin: 0,
                textTransform: 'none',
              },
            }}>
            <Tab.Screen name={'Player Ranking'} component={RankingScreen} />

            <Tab.Screen name={'Team Ranking'} component={TeamRankingScreen} />
          </Tab.Navigator>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.gray0,
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
    marginVertical: getWidth(2),
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
    marginTop: getWidth(2),
  },
  imgBtn: {
    marginTop: getWidth(4),
    backgroundColor: 'rgba(255,255,552,0.2)',
  },
});
