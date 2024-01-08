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
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";
import { RoundProgress } from "../components/RoundProgress";
import SimpleGradientProgressbarView from "react-native-simple-gradient-progressbar-view";


export default function ProgressScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >

            
            <View
                style={{ flexDirection: "row", alignItems: "center", marginTop:getWidth(5) }}
            >
                <Text style={[fontBold(6), {flex:1 }]}>Patrick</Text>
                <View
                style={{flexDirection:"row", borderWidth:1, borderColor:"white", borderRadius:getWidth(1), padding:getWidth(1)}}
                >
                    <Text style={[fontBold(4.5),{ marginLeft: getWidth(4)}]}>2</Text>
                    <Image
                        style={{ width: getWidth(4.5), height: getWidth(6), marginHorizontal: getWidth(3), resizeMode:"contain" }}
                        source={require('../assets/images/coin.png')}
                    />
                </View>
            </View>
            <View style={{ flexDirection: "row" , alignItems:"center"}}>
                <View style={{flex:1}}>

                    <Text style={[fontBold(3), { marginTop: getWidth(2) }]}>Level: mono</Text>

                    <View
                        style={{ borderWidth: 1, borderColor: "white", marginTop: getWidth(1), borderTopLeftRadius: 10, borderBottomRightRadius: 10, overflow: "hidden" }}
                    >
                        <SimpleGradientProgressbarView
                            style={{ width: "100%", height: getWidth(2) }}
                            fromColor="#f201f7"
                            toColor="#aefe03"
                            progress={0.5}
                            maskedCorners={[0, 0, 1, 1]}
                            cornerRadius={7.0}
                        />
                    </View>
                    <Text style={[fontBold(3), { marginTop: getWidth(2) }]}>Streaks: 12 days</Text>
                    <View
                        style={{ borderWidth: 1, borderColor: "white", marginTop: getWidth(1), borderTopLeftRadius: 10, borderBottomRightRadius: 10, overflow: "hidden" }}
                    >
                        <SimpleGradientProgressbarView
                            style={{ width: "100%", height: getWidth(2) }}
                            fromColor="#f201f7"
                            toColor="#aefe03"
                            progress={0.7}
                            maskedCorners={[0, 0, 1, 1]}
                            cornerRadius={7.0}
                        />
                    </View>
                </View>

                <Image
                    style={{width:getWidth(17), height:getWidth(15), marginLeft:getWidth(3), resizeMode:"contain", marginTop:getWidth(6)}}
                    source={require('../assets/images/position.png')}
                />

            </View>
            <View style={{ flexDirection: "row" }}>

                <View style={{ alignItems: "center", height: "100%" }}>

                    <RoundProgress
                        size={getWidth(15)}
                        style={{ marginTop: getWidth(4) }}
                        progress={25}
                        progressText={25}
                    />
                    <Text style={[fontBold(3.5), { marginTop: getWidth(2) }]}>Steps</Text>


                    <RoundProgress
                        size={getWidth(15)}
                        style={{ marginTop: getWidth(4) }}
                        progress={25}
                        progressText={25}
                    />
                    <Text style={[fontBold(3.5), { marginTop: getWidth(2) }]}>HRV</Text>


                    <RoundProgress
                        size={getWidth(15)}
                        style={{ marginTop: getWidth(4) }}
                        progress={25}
                        progressText={25}
                    />
                    <Text style={[fontBold(3.5), { marginTop: getWidth(2) }]}>Strain</Text>



                    <RoundProgress
                        size={getWidth(15)}
                        style={{ marginTop: getWidth(4) }}
                        progress={25}
                        progressText={25}
                    />
                    <Text style={[fontBold(3.5), { marginTop: getWidth(2) }]}>Recovery</Text>


                    <RoundProgress
                        size={getWidth(15)}
                        style={{ marginTop: getWidth(4) }}
                        progress={25}
                        progressText={25}
                    />
                    <Text style={[fontBold(3.5), { marginTop: getWidth(2) }]}>Energy</Text>

                </View>


                <TouchableOpacity
                    style={styles.avatarImage}
                    activeOpacity={1}
                    onPress={() => {
                        navigation.navigate("EditableAvatarScreen")
                    }}
                >
                    <Image
                        style={styles.avatarImage}
                        source={require('../assets/images/avatar.png')}
                    />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: getWidth(8),
    },
    innerContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    avatarImage: {
        width:"100%",
        flex:1,
        resizeMode: "contain"
    }
});