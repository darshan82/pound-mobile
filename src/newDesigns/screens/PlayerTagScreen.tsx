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
import { fontBold, fontRegular, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../components/Colors";


export default function PlayerTagScreen() {

    const navigation = useNavigation();

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.innerContainer}>
            <Image
              style={styles.logoImage}
              source={require('../assets/images/justLogo.png')}
            />

            <Text style={styles.loginText}>{"It’s your name.\nOwn it. "}</Text>

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
              labelTitle="Player Tag"
              placeholder="username@hotmail.com"
            />

<Text style={styles.infoText}>
              {'Must be xx characters and xxx'}
            </Text>

            <Image
              style={{flex: 1, resizeMode: 'contain', width: '100%', marginVertical: getWidth(5)}}
              source={require('../assets/images/avatar.png')}
            />

            <InputButton
              onPress={() => navigation.navigate('BodyTypeScreen')}
              style={styles.continueBtn}
              textColor={Colors.gray1}
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
        backgroundColor: Colors.gray1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: Colors.gray1,
    },
    logoImage: {
        width: getWidth(40),
        height: getWidth(18),
        resizeMode: "contain",
        marginBottom: getWidth(3),
        alignSelf: "center"
    },
    infoImage: {
        width: getWidth(4),
        height: getWidth(4),
        resizeMode: "contain",
        position:"absolute",
        left:getWidth(18)
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
        marginTop:getWidth(2)
    },
    infoText: {
        ...fontBold(3),
        opacity: 0.6,
        marginLeft: getWidth(4),
        marginTop:getWidth(2)
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
        marginTop: getWidth(4),
        borderRadius:getWidth(3),
        borderWidth:0,
        backgroundColor:Colors.lightGreen,
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
});