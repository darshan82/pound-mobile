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


export default function LockView() {

    const navigation = useNavigation();

    return (
        <>
            <View
                style={styles.innerContainer}
            >

                <View style={{ margin: getWidth(2), justifyContent: "space-between", padding: getWidth(3), borderWidth: 1, borderColor: 'white', borderRadius: getWidth(2), backgroundColor: "black" , alignItems:"center", marginTop:getWidth(10)}}>

                    <Image
                        style={styles.image}
                        source={require('../assets/images/lock.png')}
                    />
                    <Text style={fontBold(4, "white")}>Team Ranking</Text>

                    <Text style={[fontRegular(4),{marginBottom:getWidth(4)}]}>Unlocks with [badge name] </Text>

                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        width:"100%",
        height:"100%",
        position:"absolute",
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    image: {
        width: getWidth(15),
        height: getWidth(25),
        resizeMode: "contain",
    }
});