/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Image, HStack, Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView, StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  ImageSourcePropType,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Dimensions
} from 'react-native';
import { useMachine } from '@xstate/react';
import { useNavigation } from '@react-navigation/native';

import { CreateProfileVariables } from '../components';
import { Background, InfoModal, ProgressBar } from '../../../components';
import { usePreventBack } from '../../../hooks';
import { KnowBetterController } from '../controllers';
import { If } from 'react-haiku';
import { LoadingSpinner } from '../../../components/layout/Spinner';
import Colors from '../../../theme/colors';
import { AppContext } from '../../../app/context';
import { useKnowBetterInputs } from '../hooks/useKnowBetterInputs';
import { AdditionalData } from '../controllers/KnowBetterController';

interface msg { id: number; user: string; text: string; avatar: ImageSourcePropType; color?: string; }

const WIDTH = Dimensions.get("window").width;
const rawMessages = [
  'Whats your height in feets? (don\'t include the inches)',
  'Whats your height in inches? (don\'t include the feet)',
  'Whats your weight in kilograms?',
  'What do you want to do?\n\n1. Gain Muscle\n2. Lose Weight\n3. Both\n\nReply with 1 or 2 or 3',
  'What are you commited to?\n\n1. 1-3 days a week\n2. 2-4 days a week\n3. 3-6 days a week\n\nReply with 1 or 2 or 3',
  'Are you a fitness enthusiast? (yes/no)',
  'Are you a crypto enthusiast? (yes/no)',
  'Are you a gamer? (yes/no)',
];

const key = ["feet", "inches", "weight", "goal", "commitment", "fitness enthusiast", "crypto enthusiast", "gamer"];

const values = {
  goal: ["gain muscle", "lose weight", "both"],
  commitment: ["1-3 days a week", "2-4 days a week", "3-6 days a week"]
}

export const KnowBetterScreen = () => {
  usePreventBack({ disableBack: true });

  const navigation = useNavigation();

  const [machine, send] = useMachine(KnowBetterController);
  const [showAlert, setShowAlert] = useState(false);

  const { boardingData, setTokens } = useContext(AppContext);

  useEffect(() => {
    if (machine.done) {
      if (machine.matches('complete')) {
        if (machine.context.tokens) {
          setTokens(machine.context.tokens);
        }

        navigation.navigate('WearablesBoarding' as never, {} as never);
      }

      if (machine.matches('unrecognized')) {
        setShowAlert(true);
      }
    }
  }, [machine.done]);

  const [messages, setMessages] = useState<msg[]>([{
    id: 1,
    avatar: require('../../../assets/images/p1.png'),
    text: "Let us get to know you better\nWhats your height in feets? (don\'t include the inches)",
    user: "Oracle",
  }]);

  const [inputIndex, setInputIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState<AdditionalData>({
    commitment: '',
    height_ft: 0,
    height_in: 0,
    goal: '',
    weight: 0,
    "crypto enthusiast": false,
    "fitness enthusiast": false,
    gamer: false,
  });

  const { knowBetterInputs } = useKnowBetterInputs({
    commitments: boardingData
      ? boardingData.commitedTo.map(i => ({ value: i, label: i }))
      : [],
    goals:
      boardingData
        ? boardingData.wantTo.map(i => ({ value: i, label: i }))
        : [],
    identities: machine.context.identities

  });

  const handleSend = () => {
    if (input === '') return;

    setDisabled(true);
    const _in = input.toLowerCase().trim(),
      __in = parseInt(input),
      b_in = (_in === 'yes' || _in === 'true') ? true : (_in === 'no' || _in === 'false') ? false : null;

    if (inputIndex === 0 && (!__in || __in < 1 || __in > 7)) {
      setDisabled(false);
      return Alert.alert("Error", "Invalid height in feet, if you are 6 feet 2 inches, type 6");
    } else if (inputIndex === 1 && (!__in || __in < 1 || __in > 12)) {
      setDisabled(false);
      return Alert.alert("Error", "Invalid height in inches, if you are 6 feet 2 inches, type 2");
    } else if (inputIndex === 2 && (!__in || __in < 1 || __in > 500)) {
      setDisabled(false);
      return Alert.alert("Error", "Invalid weight");
    } else if ((inputIndex === 3 || inputIndex === 4) && (!__in || __in < 1 || __in > 3)) {
      setDisabled(false);
      return Alert.alert("Error", "Invalid input, it should be either 1 or 2 or 3");
    } else if (inputIndex > 4 && b_in === null) {
      setDisabled(false);
      return Alert.alert("Error", "Invalid input, it should be either yes or no");
    }

    const newData = data;
    // @ts-ignore
    newData[key[inputIndex]] = inputIndex > 4 ? b_in : inputIndex < 3 ? __in : values[key[inputIndex]][__in - 1];

    setData(newData);

    setInputIndex(inputIndex + 1);

    setMessages([...messages, { id: messages.length + 1, user: 'You', text: input, avatar: require('../../../assets/images/p2.png') }]);

    if (inputIndex >= (key.length - 1)) send({ type: 'CREATE', data });
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
        {/* <SafeAreaView>
          <KeyboardAwareScrollView style={styles.container}>
            <HStack justifyContent="center">
              <Image
                source={require('../../../assets/images/logo.png')}
                alt="Pound"
                size="lg"
                resizeMode="contain"
                marginBottom={-4}
              />
            </HStack>

            <ProgressBar progress={60} />

            <Text
              color="white"
              textAlign="center"
              textTransform="uppercase"
              fontSize="xl"
              marginTop={5}>
              Let us get to know you better
            </Text>

            <CreateProfileVariables
              commitments={
                boardingData
                  ? boardingData.commitedTo.map(i => ({value: i, label: i}))
                  : []
              }
              goals={
                boardingData
                  ? boardingData.wantTo.map(i => ({value:i , label: i}))
                  : []
              }
              identities={machine.context.identities}
              isLoading={['authenticating', 'creating'].includes(
                machine.value.toString(),
              )}
              updateIdentities={list => send({type: 'UPDATE', list})}
              sendVariables={data => send({type: 'CREATE', data})}
            />
          </KeyboardAwareScrollView>
        </SafeAreaView> */}

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
