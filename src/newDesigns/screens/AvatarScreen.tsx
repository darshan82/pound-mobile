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


export default function AvatarScreen() {

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

                    <Text style={styles.loginText}>{"Welcome, Patrick"}</Text>
                    <Text style={styles.discText}>{"You are now on a journey to reach the Avatar State"}</Text>
                    


                    <Image
                        style={styles.avatarImage}
                        source={require('../assets/images/avatar.png')}
                    />

                   
                
                    <InputButton
                        onPress={() => navigation.navigate("SelectOptionScreen")}
                        style={[styles.continueBtn]}
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
        height: getWidth(10),
        marginVertical: getWidth(2),
        resizeMode: "contain",
        alignSelf: "center"
    },
    avatarImage: {
        width: "80%",
        flex:1,
        marginVertical: getWidth(5),
        resizeMode: "contain",
        alignSelf: "center"
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
        marginTop:getWidth(2)
    }, 
    continueBtn: {
        marginTop: getWidth(2),
        borderRadius:getWidth(5)
    },
});