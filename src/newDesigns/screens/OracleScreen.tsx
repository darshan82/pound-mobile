import React, {useEffect, useRef, useState} from 'react';

import {StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {fontBold, getWidth} from '../../modules/dashboard/helpers/tabs';
import OracleScreenChild from './OracleScreenChild';
import Colors from '../components/Colors';
import FitnessChallage from './FitnessChallage';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const ref = useRef();

  // useEffect(() => {
  //   ref?.current?.scrollToIndex({
  //     animated: true,
  //     index: state.index,
  //     viewOffset: getWidth(30),
  //   });
  // }, [state.index]);

  return (
    <View
      style={{
        justifyContent: 'center',
        paddingHorizontal: getWidth(3),
        backgroundColor: Colors.gray2,
        paddingBottom: getWidth(3),
        borderBottomLeftRadius: getWidth(8),
        borderBottomRightRadius: getWidth(8),
      }}>
      <FlatList
        ref={ref}
        style={{}}
        data={state.routes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          const route = item;
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                backgroundColor: isFocused
                  ? Colors.lightGreen + '30'
                  : Colors.gray2_0,
                height: getWidth(9),
                paddingHorizontal: getWidth(3),
                marginHorizontal: getWidth(1.5),
                justifyContent: 'center',
                borderRadius: getWidth(2),
                borderWidth: 1,
                borderColor: isFocused ? Colors.lightGreen : Colors.gray2_0,
              }}>
              <Text style={[fontBold(3.3, 'white'), {elevation: 3}]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default function OracleScreen() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      // style={{marginTop:-getWidth(10)}}
      backBehavior="none"
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Fitness Challenges"
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
      <Tab.Screen name={'Game Quests'} component={OracleScreenChild} />

      <Tab.Screen name={'Fitness Challenges'} component={FitnessChallage} />

      <Tab.Screen name={'Bonus'} component={OracleScreenChild} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  logoImage: {
    width: getWidth(100),
    height: getWidth(40),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
