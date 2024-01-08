import React from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { InputButton } from "../components/InputButton";
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";

const HEIGHT = Dimensions.get("window").height;

export default function FirstScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >

            
                <Image
                    style={styles.logoImage}
                    source={require('../assets/images/justLogo.png')}
                />
            <Text style={fontBold(7)}>Reach the Avatar State</Text>


            <Image
                style={{width:getWidth(90), height:getWidth(100), resizeMode:"contain"}}
                source={require('../assets/images/firstimg.png')}
            />


            <Text 
            onPress={()=> navigation.navigate("SignUpScreen")}
            style={[fontBold(5,"#AEFF03"), {textDecorationLine:"underline", paddingVertical:getWidth(4)}]}>FORGE MY IDENTITY</Text>

        
            <InputButton
            onPress={()=> navigation.navigate("LoginScreen")}
                style={styles.loginBtn}
                labelTitle="LOG IN"
            />

            <Image
                style={styles.powerdByImage}
                source={require('../assets/images/BP_LOGO_POWERED.png')}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: getWidth(10),
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    logoImage: {
        height: getWidth(20),
        resizeMode: "contain"
    },
    imagePView: {
    },
    powerdByImage: {
        height: getWidth(8),
        resizeMode: "contain",
        marginTop:getWidth(2)
    },
    loginBtn: {
        marginTop: getWidth(5),
        backgroundColor:'#7A7A7A',
        borderRadius:getWidth(5)
    },
});