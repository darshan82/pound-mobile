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
import { fontBold, fontRegular, fontSemiBold, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";
import Colors from "../components/Colors";


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
                        source={require('../assets/images/justLogo.png')}
                    />

                    <Text style={styles.loginText}>{"Welcome, Patrick"}</Text>
                    <Text style={styles.discText}>{"You are now on a journey to reach\nthe Avatar State"}</Text>
                    


                    <Image
                        style={styles.avatarImage}
                        source={require('../assets/images/avatar.png')}
                    />

                   
                
                    <InputButton
                        onPress={() => navigation.navigate("SelectOptionScreen")}
                        style={[styles.continueBtn]}
                        labelTitle="CONTINUE"
                        textColor={Colors.gray1}
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
        backgroundColor: Colors.gray1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: Colors.gray1,
    },
    logoImage: {
        width: getWidth(30),
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
        alignSelf: "center",
        marginLeft:getWidth(10),
    },
    loginText: {
        alignSelf: "center",
        ...fontBold(7),
        textAlign: "center"
    },
    discText: {
        alignSelf: "center",
        ...fontRegular(3.5, Colors.gray3),
        textAlign: "center",
        marginTop:getWidth(3),
        lineHeight: getWidth(6),
    
    }, 
    continueBtn: {
        marginTop: getWidth(2),
        borderWidth:0,
        backgroundColor:Colors.lightGreen,
        borderRadius:getWidth(3),
    },
});

