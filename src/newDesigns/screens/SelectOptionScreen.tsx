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


export default function SelectOptionScreen() {

    const navigation = useNavigation();
    const [weight, setWeight] = useState(1);
    const [power, setPower] = useState([]);


    const setPowerState = (value) => {
        const _power = [...power]
        const index = _power.indexOf(value);
        if(index != -1){
            _power.splice(index, 1); 
            setPower(_power)
        }else{
            console.log("3r4r4343534543", _power);
            if(_power.length != 2){
                _power.push(value)
                setPower(_power)
            }
        }
    } 

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

                    <LogoWithBack />
                    <Text style={styles.loginText}>{"It’s your name.\nOwn it."}</Text>
                    <Text style={styles.discText}>{"Lets start with identifying your goals"}</Text>



                    <Text style={fontBold(5)}>{"Pick one"}</Text>

                    <InputButton
                        onPress={() => setWeight(0)}
                        style={[styles.continueBtn, {backgroundColor: (weight == 0) ? "#588200" : "black" }]}
                        labelTitle="Lose Weight"
                    />

                    <InputButton
                        onPress={() => setWeight(1)}
                        style={[styles.continueBtn, {backgroundColor: (weight == 1) ? "#588200" : "black" }]}
                        labelTitle="Maintain Weight"
                    />

                    <InputButton
                        onPress={() => setWeight(2)}
                        style={[styles.continueBtn, {backgroundColor: (weight == 2) ? "#588200" : "black" }]}
                        labelTitle="Gain Weight"
                    />

                    <Text style={[fontBold(5),{marginTop:getWidth(3)}]}>{"Pick up to two"}</Text>

                    <InputButton
                        onPress={() => setPowerState(0)}
                        style={[styles.continueBtn, {backgroundColor: (power.includes(0)) ? "#588200" : "black" }]}
                        labelTitle="Tone Up"
                    />

                    <InputButton
                        onPress={() => setPowerState(1)}
                        style={[styles.continueBtn, {backgroundColor: (power.includes(1)) ? "#588200" : "black" }]}
                        labelTitle="Bulk Up"
                    />

                    <InputButton
                        onPress={() => setPowerState(2)}
                        style={[styles.continueBtn, {backgroundColor: (power.includes(2)) ? "#588200" : "black" }]}
                        labelTitle="Get Strong"
                    />
                   
        <View style={{flex:1}}/>

                    <InputButton
                        onPress={() => navigation.navigate("SelectWeightGender")}
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
        height: getWidth(10),
        marginVertical: getWidth(2),
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
        marginBottom: getWidth(5)
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