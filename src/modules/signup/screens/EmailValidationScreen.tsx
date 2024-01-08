import React from 'react';

// Dependencies
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import { Image, Text, Box } from 'native-base';

// Components
import { Background } from '../../../components/layout/Background';
import { Form } from '../components';
import { useAuthControl } from '../../../hooks/useAuthControl';
import { LoadingSpinner } from '../../../components/layout/Spinner';

export const EmailValidationScreen = () => {
  const { isLoading } = useAuthControl();

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box justifyContent="space-between" style={styles.grow}>
          <View style={{
            alignItems: 'center',
            marginTop: 160,
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
          <Form />
          <View style={styles.bottom}>
            <Image
              source={require('../../../assets/images/footer.png')}
              alt="Pound"
            />
          </View>
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
    marginTop: 60,
    marginHorizontal: '5%',
  },
  text: {
    color: 'white',
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15
  },
  loginButton: {
    width: '100%',
    display: 'flex',
    backgroundColor: 'red',
    alignItems: 'center',
  },
});
