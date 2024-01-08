import React from 'react';
import { Image, HStack, View } from 'native-base';
import { Background } from '../../../components';
import { SafeAreaView, StyleSheet } from 'react-native';
import { CreateAccount } from '../components/CreateAccount';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePreventBack } from '../../../hooks/usePreventBack';

export const SignUpScreen = () => {
  usePreventBack({ disableBack: true });

  return (
    <Background>
      <SafeAreaView>
        <KeyboardAwareScrollView style={styles.container}>
          <HStack justifyContent="center">
            <View style={{
              alignItems: 'center',
              marginTop: 60,
              marginHorizontal: '5%',
            }}>
              <Image
                source={require('../../../assets/images/logo.png')}
                alt="Pound"
              />
              <Image
                source={require('../../../assets/images/slogan.png')}
                alt="Pound"
              />
            </View>
          </HStack>

          <CreateAccount />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  spacing: {
    marginHorizontal: '5%',
  },
});
