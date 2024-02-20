import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {fontBold, getWidth} from '../../modules/dashboard/helpers/tabs';
import Colors from '../components/Colors';
import {useGlobalDataContext} from '../../context';

export default function FirstScreen() {
  const navigation = useNavigation();
  const {data} = useGlobalDataContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.loginToken) {
        navigation.navigate('DrawerStack');
      } else {
        setIsLoading(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [data.loginToken, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.lightGreen} />
        </View>
      ) : (
        <>
          <Image
            style={{
              width: getWidth(100),
              resizeMode: 'contain',
              position: 'absolute',
            }}
            source={require('../assets/images/firstimg.png')}
          />

          <Image
            style={[styles.logoImage, {marginLeft: getWidth(8)}]}
            source={require('../assets/images/logo.png')}
          />
          <Text style={fontBold(3.5)}>Reach the Avatar State</Text>

          <View style={{flex: 1}} />

          <InputButton
            onPress={() => navigation.navigate('ThreeAvatarAfterFirst')}
            textColor={'#0B0B0B'}
            style={{
              ...styles.loginBtn,
              backgroundColor: '#AEFF03',
              borderColor: '#AEFF03',
            }}
            labelTitle="Forge my identity"
          />

          <InputButton
            onPress={() => navigation.navigate('LoginScreen')}
            // onPress={clearLS}
            style={{
              ...styles.loginBtn,
              backgroundColor: '#0B0B0B',
              borderColor: Colors.gray2_0,
            }}
            labelTitle="Player Login"
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: getWidth(2),
    paddingHorizontal: getWidth(4),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: getWidth(100),
    height: getWidth(40),
    resizeMode: 'contain',
  },
  imagePView: {},
  powerdByImage: {
    height: getWidth(8),
    resizeMode: 'contain',
    marginTop: getWidth(2),
  },
  loginBtn: {
    marginTop: getWidth(5),
    backgroundColor: '#7A7A7A',
    borderRadius: getWidth(4),
    marginHorizontal: getWidth(10),
  },
});
