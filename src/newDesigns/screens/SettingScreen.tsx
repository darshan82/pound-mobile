import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const [isFirstSwitchEnabled, setIsFirstSwitchEnabled] = useState(false);
  const [isSecondSwitchEnabled, setIsSecondSwitchEnabled] = useState(false);
  const [isThirdSwitchEnabled, setIsThirdSwitchEnabled] = useState(false);

  const navigation = useNavigation();

  const toggleFirstSwitch = () => setIsFirstSwitchEnabled(previousState => !previousState);
  const toggleSecondSwitch = () => setIsSecondSwitchEnabled(previousState => !previousState);
  const toggleThirdSwitch = () => setIsThirdSwitchEnabled(previousState => !previousState);

  const handleLogout = () => {
    // Perform logout operations
    console.log('User logged out');
    // navigate to login screen or perform other operations
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Test</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isFirstSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleFirstSwitch}
          value={isFirstSwitchEnabled}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Test</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSecondSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleSecondSwitch}
          value={isSecondSwitchEnabled}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Test</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isThirdSwitchEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleThirdSwitch}
          value={isThirdSwitchEnabled}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.optionLabel}>Language</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LanguageSettings')}>
          <Text style={styles.navigateForward}>></Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  optionLabel: {
    color: '#fff',
  },
  navigateForward: {
    color: '#fff',
    fontSize: 24,
  },
  logoutButton: {
    padding: 20,
  },
  logoutText: {
    color: 'red',
  }
});

export default SettingsScreen;
