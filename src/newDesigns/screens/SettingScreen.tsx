import React, {useState} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LogoWithBack from '../components/LogoWithBack';
import {getWidth} from '../../modules/dashboard/helpers/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalDataContext} from '../../context';
import axios from 'axios';
import LoginScreen from './LoginScreen';

const BottomBorder = () => {
  return <View style={styles.bottomBorder} />;
};

const SettingsScreen = () => {
  const [isFirstSwitchEnabled, setIsFirstSwitchEnabled] = useState(false);
  const [isSecondSwitchEnabled, setIsSecondSwitchEnabled] = useState(false);
  const [isThirdSwitchEnabled, setIsThirdSwitchEnabled] = useState(false);
  const {data} = useGlobalDataContext();

  const navigation = useNavigation();

  const toggleFirstSwitch = () => {
    setIsFirstSwitchEnabled(previousState => !previousState);
    updateUserSettings(
      !isFirstSwitchEnabled,
      isSecondSwitchEnabled,
      isThirdSwitchEnabled,
    );
  };

  const toggleSecondSwitch = () => {
    setIsSecondSwitchEnabled(previousState => !previousState);
    updateUserSettings(
      isFirstSwitchEnabled,
      !isSecondSwitchEnabled,
      isThirdSwitchEnabled,
    );
  };

  const toggleThirdSwitch = () => {
    setIsThirdSwitchEnabled(previousState => !previousState);
    updateUserSettings(
      isFirstSwitchEnabled,
      isSecondSwitchEnabled,
      !isThirdSwitchEnabled,
    );
  };

  const handleLogout = async () => {
    console.log('User logged out');
    await AsyncStorage.clear();
    navigation.navigate('LoginScreen');
  };

  const updateUserSettings = async (
    sleepingMode: boolean,
    notification: boolean,
    sound: boolean,
  ) => {
    try {
      const updateUrl = 'http://18.217.10.162/api/users/update-user';
      const headers = {
        Authorization: `${data.loginToken}`,
        'Content-Type': 'application/json',
      };
      const updateBody = {
        sleepingMode: sleepingMode,
        notification: notification,
        sound: sound,
      };
      console.log('update body: ', JSON.stringify(updateBody));
      const res = await axios.put(updateUrl, updateBody, {
        headers,
      });
      console.log('Update Setting -->', res.data);
      // setData(prevData => ({
      //   ...prevData,
      //   gender: res.data.physicalAttributes.gender,
      // }));
      // navigation.navigate('AvatarScreen');
    } catch (err) {
      console.log('Error -->', err);
    }
  };

  const SettingOption = ({icon, label, switchValue, onToggle}) => (
    <View style={styles.settingOption}>
      <View style={styles.optionContent}>
        <Image style={styles.icon} source={icon} />
        <Text style={styles.optionLabel}>{label}</Text>
      </View>
      <Switch
        trackColor={{false: 'black', true: '#AEFF03'}}
        thumbColor={switchValue ? 'white' : '#3B3B3B'}
        onValueChange={onToggle}
        value={switchValue}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LogoWithBack title="Settings" />
      <View style={styles.settingsContainer}>
        <SettingOption
          icon={require('../assets/images/moon.png')}
          label="Sleep"
          switchValue={isFirstSwitchEnabled}
          onToggle={toggleFirstSwitch}
        />
        <BottomBorder />
        <SettingOption
          icon={require('../assets/images/notification.png')}
          label="Notification"
          switchValue={isSecondSwitchEnabled}
          onToggle={toggleSecondSwitch}
        />
        <BottomBorder />
        <SettingOption
          icon={require('../assets/images/speaker.png')}
          label="Sound"
          switchValue={isThirdSwitchEnabled}
          onToggle={toggleThirdSwitch}
        />
        <BottomBorder />
        <TouchableOpacity>
          <View style={styles.settingOption}>
            <View style={styles.optionContent}>
              <Image
                style={styles.icon}
                source={require('../assets/images/world.png')}
              />
              <Text style={styles.optionLabel}>Language</Text>
            </View>
            <Text style={styles.navigateForward}>{'>'}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <View style={styles.settingOption}>
          <View style={styles.optionContent}>
            <Image
              style={styles.icon}
              source={require('../assets/images/rightArrow2.png')}
            />
            <Text style={styles.optionLabel}>Logout</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: 52,
  },
  container: {
    flex: 1,
    padding: getWidth(5),
    backgroundColor: '#1f1f1f',
  },
  settingsContainer: {
    backgroundColor: '#2c2c2c',
    marginTop: 30,
    borderRadius: 20,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    color: '#fff',
    marginLeft: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  navigateForward: {
    color: '#fff',
    fontSize: 34,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#2c2c2c',
    marginTop: 20,
    borderRadius: 20,
    padding: 15,
  },
});

export default SettingsScreen;
