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
import { fontBold, getWidth , fontRegular} from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";
import LogoWithBack from "../components/LogoWithBack";
import Colors from "../components/Colors";
import DropdownComponent from "../components/DropdownComponent";


export default function SelectLocation() {

    const navigation = useNavigation();
    const [gender, setGender] = useState("male")

    return (
      <SafeAreaView style={styles.container}>
         <LogoWithBack />
        <KeyboardAwareScrollView >
          <View style={styles.innerContainer}>

            <Text style={styles.loginText}>{'Tell us about yourself.'}</Text>
            <Text style={styles.discText}>
              {
                'We use your data to provide highly\npersonalized and highly effective plans\nand suggestions.'
              }
            </Text>

            <InputText
              containerStyle={{marginTop: getWidth(2), width: '100%'}}
              style={{color: '#AEFF03'}}
              isFloating={false}
              labelTitle="How old are you?"
              placeholder="Insert answer"
            />

            <DropdownComponent
              containerStyle={{marginTop: getWidth(10), width: '100%'}}
              style={{color: '#AEFF03'}}
              isFloating={false}
              labelTitle="What is your location?"
              placeholder="Insert answer"
            />
            <DropdownComponent
              containerStyle={{marginTop: getWidth(10), width: '100%'}}
              style={{color: '#AEFF03'}}
              isFloating={false}
              labelTitle="What is your time zone?"
              placeholder="Insert answer"
            />
          </View>
        </KeyboardAwareScrollView>
        <InputButton
          onPress={() => navigation.navigate('FinalScreen')}
          textColor={Colors.gray1}
          style={[
            styles.continueBtn,
            {
              marginTop: getWidth(2),
              borderRadius: getWidth(2),
            },
          ]}
          labelTitle="Continue"
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: getWidth(5),
        paddingVertical: getWidth(5)
    },
    innerContainer: {
        flex: 1
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
        ...fontBold(6.2),
        textAlign: "center"
    },
    discText: {
        alignSelf: "center",
        ...fontRegular(4.4, Colors.gray3),
        textAlign: "center",
        lineHeight:getWidth(7),
        marginVertical: getWidth(5)
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
        borderWidth: 0,
        backgroundColor: Colors.lightGreen,
        borderRadius: getWidth(3),
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
});