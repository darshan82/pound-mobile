import React from 'react';

import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getWidth } from '../../modules/dashboard/helpers/tabs';

export default function LogoWithBack({ title, logo = false }) {
  const navigation = useNavigation();

  return (
    <View style={styles.innerContainer}>

      {title && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.logoImage}>{title}</Text>
        </View>
      )}

      <View style={{ marginBottom: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.leftErrow}
            source={require('../assets/images/arrow_left.png')}
          />
        </TouchableOpacity>
        {logo && <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            style={styles.poundlogoImage}
            source={require('../assets/images/justLogo.png')}
          />
        </View>}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  poundlogoImage: {
    width: getWidth(40),
    height: getWidth(20),
    resizeMode: 'contain',
  },
  leftErrow: {
    width: getWidth(7),
    height: getWidth(7),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    marginBottom: getWidth(3),
  },
  logoImage: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
  },
  logoImageWithoutText: {
    width: '100%',
    height: getWidth(8.5),
    marginVertical: getWidth(2),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
