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


export default function PlayerTagScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >
            <KeyboardAwareScrollView
            contentContainerStyle={{flex:1}}
            >
                <View
                    style={styles.innerContainer}
                >

                    
                    <Image
                        style={styles.logoImage}
                        source={require('../assets/images/smalllogo.png')}
                    />

                    <Text style={styles.loginText}>{"It’s your name.\nOwn it."}</Text>
                    <Text style={styles.discText}>{"Unlock the Avatar State by forging a digital identity"}</Text>

                    <View style={{marginTop: getWidth(5),}}>
                        <InputText
                            containerStyle={{ marginTop: getWidth(2), width: "100%" }}
                            labelTitle="Player Tag"
                            placeholder="check player tag availability"
                        />
                        <Image
                            style={styles.infoImage}
                            source={require('../assets/images/infiIcon.png')}
                        />
                    </View>
                   
                    <Text style={styles.infoText}>{"Must be xx characters and xxx"}</Text>


                    <View style={{
                        flexDirection: "row", borderWidth: 1, borderColor: 'white', width: "100%",
                        height: getWidth(10),
                        borderRadius: getWidth(2),
                        alignItems:"center",
                        padding:getWidth(2),
                        marginTop:getWidth(7)
                    }}>
                        <View style={{flex:1}}>
                            <LinearGradient
                                colors={['#3B500F', '#AEFF03']}
                                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                locations={[0, 1.0]}
                                style={[{ height: "100%", width:"30%", borderRadius:getWidth(1)  }]}/>
                        </View>
                      
                        <View style={{ height: "90%", backgroundColor:"gray", paddingHorizontal:getWidth(3), paddingVertical:getWidth(1)}}>
                            <Text style={fontRegular(2.5, 'white')}>{"Avaliable"}</Text>
                        </View>

                    </View>


                    <Image
                            style={{flex:1, resizeMode:"contain", width:"100%"}}
                            source={require('../assets/images/avatar.png')}
                        />

                    <InputButton
                        onPress={()=> navigation.navigate("BodyTypeScreen")}
                        style={styles.continueBtn}
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
        resizeMode: "contain",
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
        alignSelf: "center",
        ...fontBold(2.5),
        textAlign: "center",
        opacity: 0.6,
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
        borderRadius:getWidth(5)
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
});