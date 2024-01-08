import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Dimensions, TouchableOpacity, Text, Platform, Keyboard } from 'react-native';
import { useMachine } from '@xstate/react';

import { Footer } from '../../../components';
import { ChatController } from '../controllers/ChatController';
import { LoadingSpinner } from '../../../components/layout/Spinner';
import { Send } from '../components/';
import { Image, View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import { oracleClient } from '../../../app/config';
import { MessageType } from '../interfaces/MessageType';
import { Messages } from '../components/Messages';

export const ChatScreen = () => {
  const [machine, send] = useMachine(ChatController);

  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(0);
  const [messages, setMessages] = useState(machine.context.messages);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (x) => {

        setKeyboardVisible(x.endCoordinates.height); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(0); // or some other action
      }
    );

    const messagesInterval = setInterval(() => {
      oracleClient.get<MessageType[]>(
        `/messages`,
      ).then(data => {
        machine.context.messages = data.data.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(machine.context.messages);
      });
    }, 3000);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      clearInterval(messagesInterval);
    };
  }, []);

  return(
    <SafeAreaView>
      <View style={{
        marginBottom: -isKeyboardVisible * 10

      }}>
        <VStack style={{
          height: useSafeAreaFrame().height - 208 + (Platform.OS === 'ios' ? 10 : 70),
          backgroundColor: "#000000",
        }}>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.toggleDrawer()}
            style={styles.menuBar}
          >
            <Image
              alt="avatar"
              style={styles.menuIcon}
              source={require("../../../assets/images/menu.png")}
            />
            <Text style={styles.menuText}># | 🇺🇸-chat</Text>
          </TouchableOpacity>
          <Messages messages={messages} />
        </VStack>
        <VStack style={{
          height: 90,
        }}>
          <Send id={machine.context?.profile?.id} avatar={machine.context.profile.avatar} />
        </VStack>
        <Footer />
      </View>
    </SafeAreaView >
    )
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  menuIcon: {
    width: 21,
    height: 12,
    marginHorizontal: 17,
    marginTop: 10
  },
  menuBar: {
    backgroundColor: "#000000",
    height: 35,
    display: "flex",
    flexDirection: 'row',
    borderBottomColor: "#ffffff44",
    borderWidth: 0.2
  },
  menuText: {
    fontSize: 18,
    marginTop: 4,
    color: "#ffffff",
    fontWeight: "bold"
  }
});
