import React from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { InputButton } from "../components/InputButton";
import { fontBold, fontRegular, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";
import LockView from "../components/LockView";


export default function OracleScreenChild() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >
                <View
                    style={styles.innerContainer}
                >

                  

                <FlatList
                    style={{margin:getWidth(3)}}
                    data={["", "", ""]}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem={({item, index})=>{
                        return (
                            <View style={{margin:getWidth(2), justifyContent:"space-between", padding:getWidth(3), borderWidth:1, borderColor:  'white', borderRadius:getWidth(2)}}>
                                <Text style={fontBold(4, "white")}>Fitness Challenge Name</Text>
                                
                                  <Text style={[fontRegular(4)]}>Fitness Challenge Description</Text>
                                  <Text style={[fontRegular(4), {marginTop:getWidth(10)}]}>XP Gain: 100   Streak: X   Token: 10 PND</Text>
                                  <View style={{flexDirection:"row", alignItems:"center"}}>
                                  <Text style={fontRegular(4)}>Enemies:</Text>
                              {["", ""].map(() => (
                                <Image
                                  style={styles.image}
                                  source={require('../assets/images/img.png')}
                                />
                              ))}
                                  </View>
                            </View>
                        )
                    }}
                />
                      {/* <LockView/> */}
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: getWidth(2),
    },
    innerContainer: {
        // flex:1,
        backgroundColor: "black",
        justifyContent: 'center',
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