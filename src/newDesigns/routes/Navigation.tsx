import React, { useContext } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { AppContext } from '../../app/context';
import FirstScreen from '../screens/FirstScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmationPass from '../screens/ConfirmationPass';
import PlayerTagScreen from '../screens/PlayerTagScreen';
import BodyTypeScreen from '../screens/BodyTypeScreen';
import AvatarScreen from '../screens/AvatarScreen';
import SelectOptionScreen from '../screens/SelectOptionScreen';
import SelectWeightGender from '../screens/SelectWeightGender';
import SelectLocation from '../screens/SelectLocation';
import FinalScreen from '../screens/FinalScreen';
// import ChatScreen from '../screens/ChatScreen';
import WalletScreen from '../screens/WalletScreen';
import JournalScreen from '../screens/JournalScreen';
import ProgressScreen from '../screens/ProgressScreen';
import OracleScreen from '../screens/OracleScreen';
import { View } from 'native-base';
import { fontBold, getWidth } from '../../modules/dashboard/helpers/tabs';
import { Animated, Image, TouchableOpacity } from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import EditableAvatarScreen from '../screens/EditableAvatarScreen';
import MotionSency from '../components/MotionSency';
import Colors from '../components/Colors';

export function MyTabBar({ state, descriptors, navigation, position, isHome}) {
  return (
    <View
      style={{
        backgroundColor: Colors.gray2,
        paddingBottom: (isHome && state.index == 0) ? getWidth(7) : getWidth(3),
        borderBottomLeftRadius: (isHome && state.index == 0) ?  getWidth(8) : 0,
        borderBottomRightRadius: (isHome && state.index == 0) ?  getWidth(8) : 0,
        paddingHorizontal: getWidth(3),
      }}>
        <View style={{width:"100%", height:getWidth(12), flexDirection: 'row', borderRadius: getWidth(3),backgroundColor: 'black',padding:2, alignItems:"center"}}>
      {state.routes.map((route, index) => {
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
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1,height:"100%",  alignItems: 'center', backgroundColor:isFocused ? Colors.gray1 : "black", justifyContent:"center", borderRadius:getWidth(3)  }}>
            <Animated.Text style={[fontBold(3.5)]}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
      </View>
    </View>
  );
}


// Create bottom tab navigator
const BottomTab = createBottomTabNavigator();

// Create top tab navigator for the "Home" tab
const TopTab = createMaterialTopTabNavigator();

// Create drawer navigator
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();


function HomeScreen() {
  return (
    // Your Home screen content here
    // Include the TopTab navigator here for "journal", "progress", "oracle" tabs
    <View style={{flex:1}}>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", backgroundColor:Colors.gray2}}>
        <Image
          style={{ width: getWidth(6), height: getWidth(10), left: getWidth(3), resizeMode: "contain" , marginLeft:getWidth(6), position:"absolute"}}
          source={require('../assets/images/dp.png')}
        />
        <Image
          style={{ width: getWidth(40), height: getWidth(20), marginHorizontal: getWidth(3), resizeMode: "contain", alignSelf:"center" }}
          source={require('../assets/images/justLogo.png')}
        />
      </View>
      <View style={{flex:1}}>
      <TopTab.Navigator
      tabBar={props => <MyTabBar {...props} isHome={true} />}
        initialRouteName={"Dashboard"}
        screenOptions={{
          headerShown: false,
          tabBarIndicatorStyle: { backgroundColor: '#AEFF03' }
        }}
      >
        <TopTab.Screen name="Journal" component={JournalScreen} />
        <TopTab.Screen name="Dashboard" component={ProgressScreen} />
        <TopTab.Screen name="Oracle" component={OracleScreen} />
      </TopTab.Navigator>
      </View>
    </View>
  );
}



// Bottom tab navigation
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
    initialRouteName='Home'
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor:"#AEFF03"
    }}
    >

      <BottomTab.Screen name="Chat"
       component={ChatScreen} 
       options={{
        tabBarIcon: ({ focused, color, size }) => {
            return(
              <Image 
              style={{width:getWidth(6), height:getWidth(6), resizeMode:"contain", tintColor:color}}
              source={require('../assets/images/chat.png')}/>
            )
        },
    }}

       />
      <BottomTab.Screen name="Home" 
      options={{
        tabBarIcon: ({ focused, color, size }) => {
            return(
              <Image 
              style={{width:getWidth(6), height:getWidth(6), resizeMode:"contain", tintColor:color}}
              source={require('../assets/images/home.png')}/>
            )
        },
    }}
      component={HomeScreen} />
      <BottomTab.Screen name="Wallet" component={WalletScreen}
       options={{
        tabBarIcon: ({ focused, color, size }) => {
            return(
              <Image 
              style={{width:getWidth(6), height:getWidth(6), resizeMode:"contain", tintColor:color}}
              source={require('../assets/images/wallet.png')}/>
            )
        },
    }}
      />
    </BottomTab.Navigator>
  );
}

// App root navigator with the drawer
function DrawerStack() {
  return (
    
      <Drawer.Navigator initialRouteName="BottomTab">
        <Drawer.Screen name="BottomTab" 
        options={{
          title:"Home",
          header: ({options,navigation})=>{
            // navigation.openDrawer();
            return (
              <View style={{width:"100%", height:getWidth(13), backgroundColor:"black", justifyContent:"center", alignItems:"center"}}>
                <Image
                  style={{width:"90%", height:"40%", resizeMode:"contain"}}
                  source={require('../assets/images/smalllogo.png')}
                />
               
                <TouchableOpacity
                onPress={()=>{
                  navigation.openDrawer()
                }}
                style={{width:getWidth(15), height:getWidth(7), position:"absolute", justifyContent:"center", left:getWidth(3)}}
                >
                <Image
                  style={{width:"90%", height:"40%", resizeMode:"contain"}}
                  source={require('../assets/images/drawerIcon.png')}
                />
                </TouchableOpacity>


               

              </View>
            )
          },
      }}
        component={BottomTabNavigator} />
        {/* Add other drawer screens here */}
      </Drawer.Navigator>
  );
}



export const Navigation = () => {
  const { headerShown } = useContext(AppContext);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown,
          headerTransparent: true,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ConfirmationPass" component={ConfirmationPass} />
        <Stack.Screen name="PlayerTagScreen" component={PlayerTagScreen} />
        <Stack.Screen name="BodyTypeScreen" component={BodyTypeScreen} />
        <Stack.Screen name="AvatarScreen" component={AvatarScreen} />
        <Stack.Screen name="SelectOptionScreen" component={SelectOptionScreen} />
        <Stack.Screen name="SelectWeightGender" component={SelectWeightGender} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="FinalScreen" component={FinalScreen} />

        <Stack.Screen name="DrawerStack" component={HomeScreen} />
        <Stack.Screen name="EditableAvatarScreen" component={EditableAvatarScreen} />
        <Stack.Screen name="MotionSency" component={MotionSency} />
        <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};






