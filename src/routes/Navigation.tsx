import React, { useContext } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AppContext } from '../app/context';
import { ConnectScreen } from '../modules/wearables/screens/ConnectScreen';

// Screens
import {
  EmailValidationScreen,
  SignUpScreen,
  LoginScreen,
  ProfileScreen,
  KnowBetterScreen,
  ConnectionsOnBoarding,
  DashboardScreen,
  ConnectionSite,
  ChatScreen,
  WalletScreen,
  ConnectionsOnBoarding2,
  LiveScreen,
} from '../modules';
import ScreenOne from '../modules/signup/screens/ScreenOne';
import ScreenTwo from '../modules/signup/screens/ScreenTwo';

const Stack = createNativeStackNavigator();

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
        <Stack.Screen
          name="EmailValidation"
          component={EmailValidationScreen}
        />
        <Stack.Screen name="ScreenOne" component={ScreenOne} />
        <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ProfileCreation" component={ProfileScreen} />
        <Stack.Screen name="KnowBetter" component={KnowBetterScreen} />

        <Stack.Screen name="WearablesBoarding" component={ConnectionsOnBoarding} />
        <Stack.Screen name="WearablesBoarding2" component={ConnectionsOnBoarding2} />

        <Stack.Screen name="Dashboard" component={MyDrawer} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Live" component={LiveScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Connect" component={ConnectScreen} />
        <Stack.Screen name="ConnectSite" component={ConnectionSite} />

        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName='Dashboard' screenOptions={{
      // headerStyle: {
      //   backgroundColor: '#000',
      // },
      headerShown: false,
      drawerStyle: {
        backgroundColor: '#000',
        borderWidth: 0,
        borderColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 20,
      },
      drawerLabelStyle: {
        fontSize: 16,
        fontWeight: "700",
        color: '#fff'
      },
      drawerActiveBackgroundColor: "#000"
    }}>
      <Drawer.Screen name="Home" component={DashboardScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Wallet" component={WalletScreen} />
      {/* <Drawer.Screen name="Live" component={LiveScreen} /> */}
      <Drawer.Screen name="Enable step counting" component={DashboardScreen} />
      <Drawer.Screen name="My Avatars" component={DashboardScreen} />

      <Drawer.Screen
        name="Connect Wearables"
        component={ConnectionsOnBoarding}
      />
    </Drawer.Navigator>
  );
}