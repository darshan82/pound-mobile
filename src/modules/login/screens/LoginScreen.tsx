import React from 'react';

// Dependencies
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Image, Box, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Components
import { Background } from '../../../components/layout/Background';
import { LoginForm } from '../components';
import { Icon } from '../../../components';

export const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <HStack marginTop={10} marginLeft={4}>
          <Icon name="return-up-back" color="white" size={35} />
        </HStack>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box justifyContent="space-between" style={styles.grow}>
          <Box style={styles.container}>
            <Image
              source={require('../../../assets/images/logo.png')}
              alt="Pound"
            />
            <Image
              source={require('../../../assets/images/slogan.png')}
              alt="Pound"
            />
          </Box>

          {/* <LoginForm /> */}

          <Box style={styles.bottom}>
            <Image
              source={require('../../../assets/images/footer.png')}
              alt="Pound"
            />
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Background>
  );
};

const styles = StyleSheet.create({
  grow: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    marginTop: 80,
    marginHorizontal: '5%',
  },
  text: {
    color: 'white',
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    marginTop: 53,
    marginBottom: 15
  },
  loginButton: {
    width: '100%',
    display: 'flex',
    backgroundColor: 'red',
    alignItems: 'center',
  },
});
