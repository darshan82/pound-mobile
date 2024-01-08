import React, { useEffect } from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    ScrollView,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { InputButton } from "../components/InputButton";
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";
import { ToggleSwitch } from "../components/ToggleSwitch";
import LogoWithBack from "../components/LogoWithBack";


export default function WalletScreen() {

    const navigation = useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerShown : false
        })
    },[])

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView
            >
                <View
                    style={styles.innerContainer}
                >


                    <LogoWithBack/>

                    <Text style={styles.loginText}>{"Enable Connections"}</Text>
                    <Text style={styles.discText}>{"We use your health data to provide personalized and highly effective workouts and suggestions."}</Text>

                    
                    <View
                    style={{alignSelf:"flex-start"}}
                    >
                        <Text style={{ ...fontBold(5), alignSelf: "flex-start", marginVertical: getWidth(2) }}>{"Step Counting "}</Text>
                        <Image
                            style={styles.infoImage}
                            source={require('../assets/images/infiIcon.png')}
                        />
                    </View>
                    
                       
                   
                    <ToggleSwitch
                        style={{marginBottom:getWidth(3)}}
                        onToggleChange={()=>{
                            
                        }}
                    />


                    <View
                    style={{alignSelf:"flex-start"}}
                    >
                        <Text style={{ ...fontBold(5), alignSelf: "flex-start", marginVertical: getWidth(2) }}>{"Motion Detection  "}</Text>
                        <Image
                            style={styles.infoImage}
                            source={require('../assets/images/infiIcon.png')}
                        />
                    </View>

                    <ToggleSwitch
                        onToggleChange={()=>{

                        }}
                    />


<View
                    style={{alignSelf:"flex-start", marginTop: getWidth(10)}}
                    >
                       <Text style={{ ...fontBold(5), alignSelf: "flex-start" }}>{"Heart Rate Detection    "}</Text>
                        <Image
                            style={styles.infoImage}
                            source={require('../assets/images/infiIcon.png')}
                        />
                    </View>

                    

                    <FlatList
                        data={["WATCH", "Google Fit", "Fit Bit", "", "", ""]}
                        nestedScrollEnabled={false}
                        style={{marginTop:getWidth(3)}}
                        numColumns={2}
                        renderItem={({item}) => {
                            return (
                                <View style={{ width: getWidth(40), height: getWidth(13), borderWidth: 1,
                                    borderRadius:getWidth(1.5), justifyContent:"center", alignItems:"center",
                                 borderColor: "white", marginLeft: getWidth(3), marginBottom: getWidth(3) }}>
                                    <Text style={{ ...fontBold(4)}}>{item}</Text>
                                </View>
                            )
                        }}
                    />

                    <InputButton
                        onPress={() => navigation.navigate("BodyTypeScreen")}
                        style={styles.continueBtn}
                        labelTitle="CONTINUE"
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: getWidth(5),
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
        marginTop: getWidth(11),
        borderRadius: getWidth(5)
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
    infoImage: {
        width: getWidth(4),
        height: getWidth(4),
        resizeMode: "contain",
        position:"absolute",
        right:0, 
    },
});