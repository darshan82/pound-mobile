import React, { useState } from "react";

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
import Colors from "../components/Colors";


export default function BodyTypeScreen() {

    const navigation = useNavigation();

    const [bodytype, setBodyType] = useState(1);

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
          <View style={styles.innerContainer}>
            <Image
              style={styles.logoImage}
              source={require('../assets/images/justLogo.png')}
            />

            <Text style={styles.loginText}>
              {'It’s your journey.\nOwn it. '}
            </Text>

            <Text
              style={[
                fontRegular(4, Colors.gray3),
                {
                  textAlign: 'center',
                  marginVertical: getWidth(5),
                  lineHeight: getWidth(7),
                },
              ]}>
              {'Lets start with identifying your goals'}
            </Text>

            <Text style={fontBold(5)}>{'Choose a body type'}</Text>

            <InputButton
              onPress={() => setBodyType(1)}
              style={[styles.continueBtn, bodytype == 1 ? null : {borderWidth:0, backgroundColor:Colors.gray2}]}
              textColor={bodytype == 1 ? Colors.lightGreen : "white"}
              labelTitle="Masculine"
            />

            <InputButton
              onPress={() => setBodyType(2)}
              style={[styles.continueBtn, bodytype == 2 ? null : {borderWidth:0, backgroundColor:Colors.gray2}]}
              textColor={bodytype == 2 ? Colors.lightGreen : "white"}
              labelTitle="Feminine"
            />

            <InputButton
              onPress={() => setBodyType(3)}
              style={[styles.continueBtn, bodytype == 3 ?  null : {borderWidth:0, backgroundColor:Colors.gray2}]}
              textColor={bodytype == 3 ? Colors.lightGreen : "white"}
              labelTitle="Don't Specify"
            />
            <View style={{flex: 1}} />
            <Text style={styles.discText}>{'Already have a RPM avatar?'}</Text>
            <InputText
              containerStyle={{marginTop: getWidth(2), width: '100%'}}
              labelTitle="Enter Model URL"
              placeholder="https://models.readyplayer.me/xxxx.glb"
            />

            <InputButton
              onPress={() => navigation.navigate('AvatarScreen')}
              textColor={Colors.gray1}
              style={[
                styles.continueBtn,
                {
                  marginTop: getWidth(5),
                  marginBottom: getWidth(5),
                  backgroundColor: Colors.lightGreen,
                },
              ]}
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
        marginTop: getWidth(2),
        borderWidth:2,
        borderColor:Colors.lightGreen,
        backgroundColor:Colors.lightGreen+"30",
        borderRadius:getWidth(3),
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
});