/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Image, HStack, Text, Box } from 'native-base';
import { SafeAreaView, StyleSheet, ScrollView, Platform, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, InputButton, ProgressBar } from '../../../components';

import { Wearables } from '../components/Wearables';
import { services } from '../helpers/services';
import { usePreventBack } from '../../../hooks';
import shortid from 'shortid';
import { AppContext } from '../../../app/context';
import { Icon } from '../../../components';

const available = services.filter(
  s => s.platform === Platform.OS || s.platform === 'both',
);

export const ConnectionsOnBoarding = () => {
  usePreventBack({ disableBack: true });
  const [reload, setReload] = useState(0);

  const { discordID } = useContext(AppContext);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setReload(prev => prev + 1);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <Background>
      <SafeAreaView>
        {/* @ts-ignore */}
        {navigation.toggleDrawer && <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.toggleDrawer()}
        >
          <Image
            alt="avatar"
            style={{
              width: 18,
              height: 9,
              marginHorizontal: 17,
              marginTop: 10,
              marginBottom: -5,
            }}
            source={require("../../../assets/images/menu.png")}
          />
        </TouchableOpacity>}

        <ScrollView style={styles.container}>
          <HStack justifyContent="center">
            <Image
              source={require('../../../assets/images/logo.png')}
              alt="Pound"
              size="lg"
              resizeMode="contain"
              marginBottom={-4}
            />
          </HStack>

          {/* <Message content={'Almost done!\nLet\'s get you connected'} /> */}
          {/* <Text
            color="white"
            textAlign="center"
            textTransform="uppercase"
            fontSize="xl"
            marginTop={5}>
            Almost done!
          </Text> */}

          {/* <Text
            color="white"
            textAlign="center"
            textTransform="uppercase"
            fontSize="xl"
            marginY={5}>
            Let's get you connected
          </Text> */}

          <Box style={styles.spacing}>
            {available.map(service => (
              <Wearables
                {...service}
                reload={reload}
                key={shortid.generate()}
                style={styles.mb}
                onPress={async () => {
                  await service.initialize(discordID);

                  if (service.isInWebApp) {
                    navigation.navigate('ConnectSite' as never, {} as never);
                  }
                }}
              />
            ))}
          </Box>
        </ScrollView>
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
  mb: {
    marginVertical: 8,
  },
});
