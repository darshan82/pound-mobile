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


export default function RankingScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >
                <View
                    style={styles.innerContainer}
                >

                <FlatList
                    style={{marginTop:getWidth(3)}}
                    data={["", "", ""]}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem={({item, index})=>{
                        return (
                            <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate("MotionSency")
                            }}
                            style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingVertical:getWidth(3), borderBottomWidth:1, borderBottomColor:  'rgba(255,255,552,0.4)'}}>
                                <Text style={fontBold(4, "#AEFF03")}>{++index}</Text>
                                <Image
                                    style={styles.image}
                                    source={require('../assets/images/smalllogo.png')}
                                />
                                  <Text style={[fontRegular(4),{width:"50%"}]}>Player name</Text>
                                  <Text style={fontBold(4, "#AEFF03")}>100 xp</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                    
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: getWidth(1),
    },
    innerContainer: {
        // flex:1,
        backgroundColor: "black",
        justifyContent: 'center',
    },
    image: {
        width:getWidth(9),
        height:getWidth(9),
        resizeMode:"contain", 
        backgroundColor:"white",
        borderRadius:getWidth(10)
    }
});