import React from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { InputButton } from "../components/InputButton";
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";


export default function SignUpScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >
            <KeyboardAwareScrollView
                style={{ flex: 1, height: '100%', }}
            >
                <View
                    style={styles.innerContainer}
                >
                    <Image
                        style={styles.logoImage}
                        source={require('../assets/images/logo.png')}
                    />

                    <Text style={styles.loginText}>
                    Sign In
                    </Text>


                    <InputText
                        containerStyle={{ marginTop: getWidth(3), width:"100%"  }}
                        labelTitle="Email Address"
                        placeholder="username@hotmail.com"
                    />

                    <InputText
                        containerStyle={{ marginTop: getWidth(2) , width:"100%" }}
                        labelTitle="Password"
                        placeholder="Password123"
                    />

                    <InputButton
                    onPress={()=>navigation.navigate('ConfirmationPass')}
                        style={styles.continueBtn}
                        labelTitle="CONTINUE"
                    />

                    <Text style={styles.forgetText}>Forgot Password?</Text>

                    <Text style={styles.orText}>OR</Text>

                    <InputButton
                        image={require('../assets/images/discord.png')}
                        style={styles.imgBtn}
                        labelTitle="Discord"
                    />

                    <InputButton
                    image={require('../assets/images/twter.png')}
                        style={styles.imgBtn}
                        labelTitle="Twitter"
                    />

                    <InputButton
                    image={require('../assets/images/google.png')}
                        style={styles.imgBtn}
                        labelTitle="Google"
                    />


                    <Image
                        style={styles.powerdByImage}
                        source={require('../assets/images/BP_LOGO_POWERED.png')}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: getWidth(8),
    },
    innerContainer: {
        // flex:1,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: "100%",
        height: getWidth(20),
        resizeMode: "contain",
        marginVertical: getWidth(5)
    },
    powerdByImage: {
        width: "100%",
        height: getWidth(8),
        resizeMode: "contain",
        marginTop: getWidth(10)
    },
    loginText: {
        alignSelf: "center",
        ...fontBold(6)
    },
    forgetText: {
        alignSelf: "center",
        ...fontBold(3),
        opacity: 0.6,
        marginTop: getWidth(5)
    },
    orText: {
        alignSelf: "center",
        ...fontBold(4),
        marginTop: getWidth(3)
    },
    continueBtn: {
        marginTop: getWidth(4)
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor:'rgba(255,255,552,0.2)'
    },
});