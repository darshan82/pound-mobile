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


export default function BodyTypeScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
            >
                <View
                    style={styles.innerContainer}
                >


                    <Image
                        style={styles.logoImage}
                        source={require('../assets/images/smalllogo.png')}
                    />

                    <Text style={styles.loginText}>{"It’s your name.\nOwn it."}</Text>
                    <Text style={styles.discText}>{"Own your identity in the digital world. \nGet started by personalizing your avatar."}</Text>



                    <Text style={fontBold(5)}>{"Choose a body type"}</Text>

                    <InputButton
                        onPress={() => navigation.navigate("BodyTypeScreen")}
                        style={styles.continueBtn}
                        labelTitle="Masculine"
                    />

                    <InputButton
                        onPress={() => navigation.navigate("BodyTypeScreen")}
                        style={styles.continueBtn}
                        labelTitle="Feminine"
                    />

                    <InputButton
                        onPress={() => navigation.navigate("BodyTypeScreen")}
                        style={styles.continueBtn}
                        labelTitle="Don't Specify"
                    />
 <View style={{ flex: 1 }} />
                    <Text style={styles.discText}>{"Already have a RPM avatar?"}</Text>
                    <InputText
                        containerStyle={{ marginTop: getWidth(2), width: "100%" }}
                        labelTitle="Enter Model URL"
                        placeholder="https://models.readyplayer.me/xxxx.glb"
                    />
                    
                   

                    <InputButton
                        onPress={() => navigation.navigate("AvatarScreen")}
                        style={[styles.continueBtn,{marginTop:getWidth(5),marginBottom:getWidth(5)}]}
                        labelTitle="CONTINUE"
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
        flex: 1,
        backgroundColor: "black",
    },
    logoImage: {
        width: getWidth(18),
        height: getWidth(18),
        marginVertical: getWidth(5),
        resizeMode: "contain",
        alignSelf: "center"
    },
    powerdByImage: {
        width: "100%",
        height: getWidth(8),
        resizeMode: "contain",
        marginTop: getWidth(10)
    },
    loginText: {
        alignSelf: "center",
        ...fontBold(7),
        textAlign: "center"
    },
    discText: {
        alignSelf: "center",
        ...fontBold(3),
        textAlign: "center",
        marginBottom:getWidth(5)
    },
    infoText: {
        alignSelf: "center",
        ...fontBold(2.5),
        textAlign: "center",
        opacity: 0.6,
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
        marginTop: getWidth(2)
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
});