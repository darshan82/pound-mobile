import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback, StyleSheet, SafeAreaView} from 'react-native';
import {HStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {Background} from '../../../components/layout/Background';
import {Icon} from '../../../components';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ConnectionSite = () => {
  const navigation = useNavigation();

  const [link, setLink] = useState('');

  useEffect(() => {
    if (!link) {
      AsyncStorage.getItem('rookConnectLink').then(value => {
        if (value) {
          setLink(value);
        }
      });
    }
  }, [link]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <HStack marginLeft={3} marginTop={2}>
            <Icon name="return-up-back" color="white" size={35} />
          </HStack>
        </TouchableWithoutFeedback>

        {link && <WebView source={{uri: link}} />}
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mb: {
    marginVertical: 8,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});
