import React, { FC, useEffect, useRef, useState } from 'react';
import { Avatar, Button, HStack, Image, VStack } from 'native-base';
import { Alert, Keyboard, TextInput } from 'react-native';
import { oracleClient } from '../../../app/config';

export const Send: FC<{ id: string, avatar: string }> = ({ id, avatar }) => {
    const [text, onChangeText] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    // @ts-ignore
    const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
    const onKeyboardHide = () => setKeyboardOffset(0);
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    useEffect(() => {
        // @ts-ignore
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        // @ts-ignore
        keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

        return () => {
            // @ts-ignore
            keyboardDidShowListener.current.remove();
            // @ts-ignore
            keyboardDidHideListener.current.remove();
        };
    }, []);
    return (
        <HStack style={{
            width: '94%',
            left: '3%',
            height: 50,
            position: keyboardOffset ? 'absolute' : undefined,
            marginLeft: '2.5%',
        }}>
            <VStack>
                <Avatar
                    source={{
                        uri: avatar
                    }}
                    style={{
                        marginTop: 15,
                        height: 33,
                        width: 33
                    }}
                />
            </VStack>
            <TextInput
                style={{
                    width: '78%',
                    color: 'white',
                    fontSize: 20,
                    marginLeft: 10,
                    paddingLeft: 7,
                    marginRight: -10,
                    backgroundColor: "#282828",
                    borderRadius: 5,
                    marginTop: 10,
                    textAlignVertical: "center",
                    paddingBottom:7
                }}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Message #| 🇺🇸 chat"}
                placeholderTextColor="#ffffff86"
                editable={!disabled}
            />
            <Button
                style={{
                    borderRadius: 5,
                    backgroundColor: "#282828",
                    marginTop: 10
                }}
                disabled={disabled}
                onPress={async () => {
                    if (text.length === 0) return Alert.alert("Error", "Please Input A Message");

                    setDisabled(true);
                    onChangeText("");
                    oracleClient.post("/chat/input", {
                        message: text,
                        author: id
                    }).then(() => {
                        // Alert.alert("Success", "Message posted");
                        setDisabled(false);
                    }).catch((e) => {
                        // Alert.alert("Failed", "Unable to post message");
                        setDisabled(false);
                    })

                }}>
                <Image alt="send" width={6} height={6} source={require('../../../assets/images/send.png')} />
            </Button>
        </HStack>
    );
};
