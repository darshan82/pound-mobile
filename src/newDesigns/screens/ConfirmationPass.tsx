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


export default function ConfirmationPass() {

    const navigation = useNavigation();

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView style={{flex: 1, height: '100%'}}>
          <View style={styles.innerContainer}>
            <Image
              style={styles.logoImage}
              source={require('../assets/images/justLogo.png')}
            />

            <Text style={styles.loginText}>Welcome, Jennie</Text>

            <Text
              style={[
                fontRegular(4, Colors.gray3),
                {
                  textAlign: 'center',
                  marginVertical: getWidth(5),
                  lineHeight: getWidth(7),
                },
              ]}>
              {'You are now on a journey to reach\nthe Avatar State'}
            </Text>

            <InputText
              containerStyle={{marginTop: getWidth(3), width: '100%'}}
              labelTitle="Email"
              placeholder="username@hotmail.com"
            />

            <InputText
              containerStyle={{marginTop: getWidth(4), width: '100%'}}
              labelTitle="Password"
              placeholder="Password123"
              isPassword={true}
            />

            <InputText
              containerStyle={{marginTop: getWidth(4), width: '100%'}}
              labelTitle="Confirm Password"
              placeholder="Password123"
              isPassword={true}
            />

            <Text style={styles.forgetText}>Forgot Password?</Text>

            <InputButton
              onPress={() => navigation.navigate('ThreeAvatarScreen')}
              style={styles.continueBtn}
              labelTitle="CONTINUE"
              textColor={Colors.gray1}
            />

            <InputButton
            imageStyle={{height: getWidth(7)}}
              image={require('../assets/images/discord.png')}
              style={styles.imgBtn}
              labelTitle="Discord"
            />

            <InputButton
            imageStyle={{height: getWidth(7)}}
              image={require('../assets/images/twter.png')}
              style={styles.imgBtn}
              labelTitle="Twitter"
            />

            <InputButton
            imageStyle={{height: getWidth(7)}}
              image={require('../assets/images/google.png')}
              style={styles.imgBtn}
              labelTitle="Google"
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: getWidth(40),
        height: getWidth(18),
        resizeMode: "contain",
        marginBottom: getWidth(3)
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
        ...fontSemiBold(3),
        opacity: 0.6,
        marginTop: getWidth(6),
        textDecorationLine:"underline"
    },
    orText: {
        alignSelf: "center",
        ...fontBold(4),
        marginTop: getWidth(3)
    },
    continueBtn: {
        marginTop: getWidth(4),
        borderRadius:getWidth(3),
        borderWidth:0,
        backgroundColor:Colors.lightGreen
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor:Colors.gray1,
        borderColor:Colors.gray2_0
    },
});

