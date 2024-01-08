import React, { useState } from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    TextInput,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { InputButton } from "../components/InputButton";
import { fontBold, fontRegular, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";


const User2 = () => {
    return(
        <View/>
    )
}


const User1 = ({isSender = true, isborder= true}) => {
    return (
        <View style={{ flexDirection: "row" , marginTop:getWidth(3), width:"85%", alignSelf: isSender ? "flex-end" : "flex-start"}}>

            <View style={{ flex: 1, borderWidth: 1, borderColor: isborder ? 'white' : "black", borderRadius: getWidth(1), padding: isborder ?  getWidth(3) : 0 }}>
                {/* <Text style={[fontBold(4.5), { marginBottom: getWidth(3)}]}>Oracle</Text> */}
                <Text style={[fontRegular(4), { }]}>An interaction with Oracle. Ideally provide options for a click through experience</Text>
            </View>            
        </View>
    )
}

const Alert = () => {
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, borderWidth: 1, borderColor: '#FA00FF80', borderRadius: getWidth(1), padding: getWidth(3), backgroundColor: 'rgba(250, 0, 255, 0.2)' }}>
                <Text style={[fontBold(4.5, '#FA00FF'), {}]}>Oracle</Text>
                <Text style={[fontRegular(4), { marginTop: getWidth(3) }]}>This information should consist of
                    Hello Patrick, [a welcoming message]
                    Summarize past actions
                    Present Task
                    Provide Reward
                    Provide instructions
                    Allow for some interaction with Oracle regarding the task and tips or advice.</Text>
            </View>
            <View style={{width: getWidth(10), height: getWidth(10), borderWidth: 1, borderColor: '#FA00FF80', borderRadius: getWidth(5), padding: getWidth(2), marginLeft:getWidth(4) }}>
            <Image
                style={{ width:"100%", height: "100%", resizeMode: "contain" }}
                source={require('../assets/images/alert.png')}
            />
            </View>
        </View>
    )
}



export default function ChatScreen() {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());

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

                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity
                        onPress={()=>{
                            setDate((p)=>{
                                p.setDate(p.getDate()-1)
                                return new Date(p)
                            })
                            
                        }}
                        >
                            <Image
                                style={{ width: getWidth(6), height: getWidth(6), resizeMode: "contain" }}
                                source={require('../assets/images/leftErrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{marginLeft:getWidth(20)}}
                         onPress={()=>{
                            setDate((p)=>{
                                p.setDate(p.getDate()+1)
                                return new Date(p)
                            })
                            
                        }}
                        >
                            <Image
                                style={{ width: getWidth(6), height: getWidth(6), resizeMode: "contain" }}
                                source={require('../assets/images/rightArrow.png')}
                            />
                        </TouchableOpacity>
                        <View style={{flex:1}}/>
                        <TouchableOpacity>
                            <Image
                                style={{ width: getWidth(6), height: getWidth(6), resizeMode: "contain" }}
                                source={require('../assets/images/cross.png')}
                            />
                        </TouchableOpacity>
                    </View>

                <Text style={[fontBold(4),{marginLeft:getWidth(4)}]}>{date.toLocaleDateString("en-US",{ year: 'numeric', month: 'short', day: 'numeric' })}</Text>

                    <View style={{ marginLeft: getWidth(3) ,marginTop:getWidth(5)}}>
                        <Text style={[fontRegular(3.5), {}]}>XP Gain: 100   Streak: X   Token: 10 PND</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={fontRegular(3.5)}>Enemies:</Text>
                            {["", ""].map(() => (
                                <Image
                                    style={styles.image}
                                    source={require('../assets/images/img.png')}
                                />
                            ))}
                        </View>
                        <Text style={[fontRegular(3.5)]}>Attributes: Strength & Luck</Text>
                    </View>

                    <FlatList
                    style={{marginTop:getWidth(5)}}
                    data={["1","2", "3"]}
                    renderItem={({item})=>{
                            return <User1
                            isSender = {false}
                            isborder = {item != "1"}
                            />
                    }}
                    
                    />


                    <View style={{ flexDirection: "row", height:getWidth(13), backgroundColor: 'rgba(250, 255, 255, 0.2)', paddingHorizontal: getWidth(2), borderRadius:getWidth(1) , alignItems:"center"}}>
                        <TextInput
                            style={{
                                flex:1,
                                color: 'white',
                                fontSize: getWidth(3.5),
                                backgroundColor: 'rgba(250, 255, 255, 0)',
                            }}
                            onChangeText={()=>{

                            }}
                            placeholder={"Type Message Here"}
                            placeholderTextColor="#ffffff86"
                        />

                        <TouchableOpacity>
                            <Image
                                style={{ width: getWidth(6), height: getWidth(6), resizeMode: "contain" }}
                                source={require('../assets/images/sendicon.png')}
                            />
                        </TouchableOpacity>
                    </View>



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
    image: {
        width:getWidth(5),
        height:getWidth(5),
        resizeMode:"contain", 
        backgroundColor:"white",
        borderRadius:getWidth(10),
        borderWidth:1,
        borderColor:"#AEFF03", 
        marginLeft:getWidth(1.5)
    }
});