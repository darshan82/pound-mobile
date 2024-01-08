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
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";
import LogoWithBack from "../components/LogoWithBack";


export default function SelectWeightGender() {

    const navigation = useNavigation();
    const [gender, setGender] = useState("male")

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


                   <LogoWithBack/>

                    <Text style={styles.loginText}>{"Tell us about yourself."}</Text>
                    <Text style={styles.discText}>{"We use your data to provide highly personalized and\nhighly effective plans and suggestions."}</Text>


                    <InputText
                        containerStyle={{ marginTop: getWidth(2), width: "100%"}}
                        style={{color:'#AEFF03'}}
                        labelTitle="How tall are you?"
                        placeholder="https://models.readyplayer.me/xxxx.glb"
                    />

                    <InputText
                        containerStyle={{ marginTop: getWidth(2), width: "100%"}}
                        style={{color:'#AEFF03'}}
                        labelTitle="How much do you weight?"
                        placeholder="https://models.readyplayer.me/xxxx.glb"
                    />

                    <InputText
                        containerStyle={{ marginTop: getWidth(2), width: "100%"}}
                        style={{color:'#AEFF03'}}
                        labelTitle="What is your goal weight?"
                        placeholder="https://models.readyplayer.me/xxxx.glb"
                    />

                    <Text style={[fontBold(4),{marginTop:getWidth(3)}]}>{"What is your gender?"}</Text>

                    <View style={{flexDirection:"row"}}>
                        <InputButton
                            onPress={() => setGender('male')}
                            style={[styles.continueBtn, {  width:"48%", backgroundColor: gender == "male" ? "#588200" : "gray"}]}
                            labelTitle="Male"
                        />
                        <InputButton
                            onPress={() => setGender('fe-male')}
                            style={[styles.continueBtn, { width:"48%", marginLeft:"4%", backgroundColor: gender == "fe-male" ? "#588200" : "gray"}]}
                            labelTitle="Female"
                        />
                    </View>

                    <View style={{flex:1}}/>


                    <InputButton
                        onPress={() => navigation.navigate("SelectLocation")}
                        style={[styles.continueBtn, { marginTop: getWidth(5), marginBottom: getWidth(5), borderRadius:getWidth(5) }]}
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
        marginTop: getWidth(2)
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
});