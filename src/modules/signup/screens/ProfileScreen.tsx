/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { If } from 'react-haiku';
import { HStack, Image, Text, View } from 'native-base';
import { Alert, ImageSourcePropType, StyleSheet } from 'react-native';
import { useMachine } from '@xstate/react';
import { useNavigation } from '@react-navigation/native';

import { Background, InfoModal, ProgressBar } from '../../../components';
import { ProfileController, Profile } from '../controllers/ProfileController';
import { usePreventBack } from '../../../hooks';
import { CreateProfile } from '../components';
import { LoadingSpinner } from '../../../components/layout/Spinner';
import Colors from '../../../theme/colors';

import { useProfileInputs } from '../hooks';

import {
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface msg { id: number; user: string; text: string; avatar: ImageSourcePropType; color?: string; }

const WIDTH = Dimensions.get("window").width;
const key = ["first_name", "last_name", "birthday", "gender", "country"];
const rawMessages = ["What is your first name", "What is your last name?", "When is your birthday", "What is your gender?\n(male/female/non binary)", "What country you are from?"]

function getDays(month: number, year: number) {
  return [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
}

function validDate(s: string): boolean {
  let b = true;

  const raw = s.split("/").map(v => parseInt(v)).filter(v => v);

  if (raw.length < 3 || (raw[1] > 12 || raw[1] < 1) || (raw[0] > getDays(raw[1], raw[2]) || raw[0] < 1)) b = false;

  return b;
}

export const ProfileScreen = () => {
  const navigation = useNavigation();

  usePreventBack({ disableBack: true });

  const [showAlert, setShowAlert] = useState(false);

  const [machine, send] = useMachine(ProfileController);

  useEffect(() => {
    if (machine.done) {
      if (machine.matches('created')) {
        navigation.navigate('KnowBetter' as never, {} as never);
      }

      if (machine.matches('unrecognized')) {
        setShowAlert(true);
      }
    }
  }, [machine.done]);

  const { profileInputs } = useProfileInputs({ gendersOptions: machine.context.genders });

  const [messages, setMessages] = useState<msg[]>([{
    id: 1,
    avatar: require('../../../assets/images/p1.png'),
    text: "Let's create your profile\nWhat's your first name?",
    user: "Oracle",
  }]);

  const [inputIndex, setInputIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState<Profile>({
    birthday: '',
    country: '',
    first_name: '',
    last_name: '',
    gender: ''
  });

  const handleSend = () => {
    const inputData = profileInputs[inputIndex];

    if (input === '' || !inputData) return;

    setDisabled(true);
    const _in = input.toLowerCase().trim();

    if (inputIndex === 2 && !validDate(_in)) {
      setDisabled(false);
      return Alert.alert("Error", "Invalid Date, use this format: DD/MM/YYYY");
    }
    if (inputIndex > 2 && !inputData.options?.some(v => v.value.toLowerCase().trim() === _in || v.label.toLowerCase().trim() === _in)) {
      setDisabled(false);
      return Alert.alert("Error", inputIndex === 3 ? "Invalid Gender, valid options: male, female, non binary" : "Invalid Country, please type a valid country name");
    }

    const newData = data;
    // @ts-ignore
    newData[key[inputIndex]] = input;

    setData(newData);

    setInputIndex(inputIndex + 1);

    setMessages([...messages, { id: messages.length + 1, user: 'You', text: input, avatar: require('../../../assets/images/p2.png') }]);

    if (inputIndex >= (key.length - 1)) send({
      type: "CREATE",
      data
    });
    else {
      setMessages([...messages, { id: messages.length + 1, user: 'You', text: input, avatar: require('../../../assets/images/p2.png') }, { id: messages.length + 2, user: 'Oracle', text: rawMessages[inputIndex + 1], avatar: require('../../../assets/images/p1.png') }]);

      setDisabled(false);
    }

    setInput('');
  };

  const [keyboardSpace, setKeyboardSpace] = React.useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      ({ endCoordinates }) => {
        setKeyboardSpace(endCoordinates.height);
      }
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardSpace(0);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <Background>
      <InfoModal
        onRequestClose={() => setShowAlert(false)}
        iconName={'alert-circle-outline'}
        iconColor={Colors.error}
        title="An Error occurs, try again please"
        buttonTitle={'Retry'}
        onButtonPress={() => {
          setShowAlert(false);
          navigation.navigate('EmailValidation' as never, {} as never);
        }}
        visible={showAlert}
      />

      <If isTrue={machine.matches('loading')}>
        <LoadingSpinner />
      </If>

      <If isTrue={!machine.matches('loading')}>
        {/* <KeyboardAwareScrollView style={styles.container}>
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

          <ProgressBar progress={40} />

          <Text
            color="white"
            textAlign="center"
            textTransform="uppercase"
            fontSize="2xl"
            marginTop={5}>
            Let's create your profile
          </Text>

          <CreateProfile
            gendersOptions={machine.context.genders}
            isLoading={machine.matches('creating')}
            sendData={data => send({ type: 'CREATE', data })}
          />
        </KeyboardAwareScrollView> */}

        <Image
          style={{ width: "100%", height: 209 }}
          alt="bg"
          source={require("../../../assets/images/chattop.jpg")}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
          behavior={"padding"}
        >
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={messages}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Image source={item.avatar!} style={styles.avatar} alt="avatar" />
                <View style={styles.textContainer}>
                  <Text style={{ ...styles.user, color: item.color }}>
                    {item.user}
                  </Text>
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </KeyboardAvoidingView>

        <View style={{
          ...styles.inputContainer,
          paddingBottom: keyboardSpace
        }}>
          <Image
            style={styles.sendcircel}
            alt="cir"
            source={require("../../../assets/images/p2.png")}
          />
          <TextInput
            editable={!disabled}
            style={styles.input}
            value={input}
            placeholder="Type your response"
            placeholderTextColor={"#848484"}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
          // returnKeyType="send"
          />
          <TouchableOpacity onPress={() => setInput("")}>
            <Image
              style={styles.send}
              source={require("../../../assets/images/send.png")}
              alt="send"
            />
          </TouchableOpacity>
        </View>
      </If>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  spacing: {
    marginHorizontal: '5%',
  },
  messageContainer: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  user: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "normal",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 27,
  },
  input: {
    width: WIDTH - 65,
    height: 34,
    backgroundColor: "#282828",
    borderRadius: 10,
    color: "#848484",
    fontWeight: "normal",
    paddingHorizontal: 11,
  },
  send: {
    width: 18,
    height: 18,
    position: "absolute",
    right: 12,
    top: 5,
  },
  sendcircel: {
    width: 32,
    height: 32,
    marginRight: 9,
    marginLeft: 9,
  },
});
