import React from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";

import { useMachine } from '@xstate/react';
import { ScreenController } from '../controllers/ScreenController';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack } from "native-base";
import { Icon, InputButton } from "../../../components";

const HEIGHT = Dimensions.get("window").height;

export default function ScreenTwo() {
    const [machine, send] = useMachine(ScreenController);

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ marginTop: -20 }}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <HStack marginTop={0} marginLeft={4}>
                    <Icon name="return-up-back" color="white" size={35} />
                </HStack>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.textBox}>
                    <Text style={styles.text}>Hello {machine.context.profileData?.username}!{'\n'}Good to see you again.{'\n'}I'm here to empower you through your fitness journey and help reaching the Avatar State.</Text>
                </View>

                {machine.context.profileData?.avatar ? <Image style={styles.avatar} source={{ uri: machine.context.profileData?.avatar }} /> : ""}

                <HStack marginTop={0}>
                    <InputButton
                        onPress={() =>
                            navigation.navigate('Dashboard' as never, {} as never)
                        }>
                        <Text style={{
                            color: "black",
                            fontSize: 24,
                            fontWeight: "bold",
                            textAlign: "center",
                        }}>
                            Continue
                        </Text>
                    </InputButton>
                </HStack>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    textBox: {
        padding: 20,
        borderColor: "#a9f706",
        borderWidth: 2,
        borderRadius: 5,
        width: HEIGHT / (2 * 1.32),
        backgroundColor: "#0D0D0D",
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    avatar: {
        width: HEIGHT / (2 * 2.41),
        height: HEIGHT / 2
    },
    buttonContainer: {
        width: '95%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: "#a9f706",
        borderRadius: 2,
        paddingVertical: 3,
        width: "49%",
        height: 30,
    },
    buttonText: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    skipButton: {

    },
    skipText: {
        fontSize: 12,
        color: "white",
        fontWeight: "bold",
    }
});