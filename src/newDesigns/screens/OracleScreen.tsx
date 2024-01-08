import React, { useEffect, useRef, useState } from 'react';

import {
    Dimensions,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fontBold, getWidth } from '../../modules/dashboard/helpers/tabs';
import RankingScreen from './RankingScreen';
import OracleScreenChild from './OracleScreenChild';

  const Tab = createMaterialTopTabNavigator();
  

  function MyTabBar({ state, descriptors, navigation }) {
    const ref = useRef();
  
    useEffect(() => {
      ref?.current?.scrollToIndex({
        animated: true,
        index: state.index,
        viewOffset: getWidth(30),
      });
    }, [state.index]);
  
    return (
      <View
        style={{
          height: getWidth(10),
          justifyContent: 'center',
          marginTop: getWidth(3),
          paddingHorizontal: getWidth(3),
        }}
      >
        <FlatList
          ref={ref}
          style={{}}
          data={state.routes}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            const route = item;
            const { options } = descriptors[route.key];
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
                navigation.navigate({ name: route.name, merge: true });
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
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  backgroundColor: isFocused
                    ? "#588200"
                    : "#7A7A7A",
                  height: getWidth(9),
                  paddingHorizontal: getWidth(3),
                  marginHorizontal: getWidth(1.5),
                  justifyContent: 'center',
                  borderRadius: getWidth(2),
                  borderWidth:1,
                  borderColor:"white"
                }}
              >
                <Text style={[fontBold(3.5, "white"),{elevation:3}]}>{label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }


export default function FinalScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >
          
                <View
                    style={styles.innerContainer}
                >

                <Image
                    style={styles.logoImage}
                    source={require('../assets/images/img.png')}
                />


                    <Tab.Navigator
                        backBehavior="none"
                        tabBar={(props) => <MyTabBar {...props} />}
                        screenOptions={{
                            tabBarActiveTintColor: "#AEFF03",
                            tabBarInactiveTintColor: 'white',
                            tabBarIndicatorStyle: {
                                backgroundColor: "#AEFF03",
                            },
                            lazy: true,
                            lazyPreloadDistance: 0,
                            tabBarLabelStyle: {
                                fontSize: getWidth(3.5),
                                padding: 0,
                                margin: 0,
                                textTransform: 'none',
                            },
                        }}
                    >
                    <Tab.Screen
                        name={"ALL"}
                        component={OracleScreenChild}
                    />

                    <Tab.Screen
                        name={"Game Quests"}
                        component={OracleScreenChild}
                    />

                    <Tab.Screen
                        name={"Fitness Challenges"}
                        component={OracleScreenChild}
                    />

                    <Tab.Screen
                        name={"Bonus"}
                        component={OracleScreenChild}
                    />

                    </Tab.Navigator>


                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: "black",
    },
    logoImage: {
        getWidth: getWidth(100),
        height: getWidth(40),
        resizeMode: "contain",
        alignSelf: "center"
    }
});