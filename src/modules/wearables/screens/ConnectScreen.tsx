/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import {Text, HStack, Image} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {Background} from '../../../components/layout/Background';
import {Icon} from '../../../components';
import {services} from '../helpers/services';
import {Wearables} from '../components/Wearables';
import {AppContext} from '../../../app/context/AppContext';

const available = services.filter(
  s => s.platform === Platform.OS || s.platform === 'both',
);

export const ConnectScreen = () => {
  const [reload, setReload] = useState(0);
  const navigation = useNavigation();

  const {tokens, discordID} = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setReload(prev => prev + 1);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <HStack marginLeft={3} marginTop={2}>
            <Icon name="return-up-back" color="white" size={35} />
          </HStack>
        </TouchableWithoutFeedback>

        <Text
          color="#FA00FF"
          fontSize="2xl"
          textAlign="center"
          marginBottom={6}>
          Wearables
        </Text>

        <FlatList
          data={available}
          keyExtractor={item => item.serviceName}
          renderItem={({item}) => (
            <Wearables
              {...item}
              reload={reload}
              style={styles.mb}
              onPress={async () => {
                await item.initialize(
                  tokens ? tokens.data.user_information.discord_id : discordID,
                );

                if (item.isInWebApp) {
                  navigation.navigate('ConnectSite' as never, {} as never);
                }
              }}
            />
          )}
        />

        <HStack
          justifyContent="center"
          alignItems="center"
          style={styles.bottom}>
          <Image
            source={require('../../../assets/images/footer.png')}
            alt="Pound"
          />
        </HStack>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
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
