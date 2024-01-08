import React from "react";

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


export default function RankingScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView
            style={styles.container}
        >
            <View
                style={styles.innerContainer}
            >
                <View
                    style={{ flexDirection: "row", alignItems: "center", 
                    borderBottomWidth: 1.5, borderColor: "white", marginHorizontal:getWidth(5) }}
                >
                    <Image
                        style={{
                            width: getWidth(8),
                            height: getWidth(8),
                            resizeMode: "contain",
                        }}
                        source={require('../assets/images/search.png')}
                    />
                    <TextInput
                        style={{ ...fontBold(4), flex: 1, marginLeft: getWidth(4) }}
                        placeholderTextColor={"white"}
                        placeholder="By Date | By Enemies | By Attributes"
                    />
                </View>

                <FlatList
                    style={{ marginTop: getWidth(3), paddingHorizontal: getWidth(4) }}
                    data={["", "", ""]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity 
                            onPress={()=>navigation.navigate("LeaderboardScreen")}
                            style={{ flexDirection: "row", alignItems: "center", paddingVertical: getWidth(3), borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,552,0.4)' }}>

                                <View style={{ marginLeft: getWidth(3) }}>
                                    <Text style={[fontRegular(3.5, "#AEFF03"), { textAlign: "center" }]}>{"JUL\n01\n2023"}</Text>
                                </View>
                                <View style={{ flex: 1, marginLeft: getWidth(3) }}>
                                    <Text style={[fontRegular(3.5), {}]}>XP Gain: 100   Streak: X   Token: 10 PND</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: getWidth(1) }}>
                                        <Text style={fontRegular(3.5)}>Enemies:</Text>
                                        {["", ""].map(() => (
                                            <Image
                                                style={styles.image}
                                                source={require('../assets/images/img.png')}
                                            />
                                        ))}
                                    </View>
                                    <Text style={[fontRegular(3.5), { marginTop: getWidth(1) }]}>Attributes: 💪  🛡️  ❤️   🧠   🏃  🍀 </Text>
                                </View>
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
        padding: getWidth(2),
    },
    innerContainer: {
        // flex:1,
        backgroundColor: "black",
        justifyContent: 'center',
    },
    image: {
        width: getWidth(5),
        height: getWidth(5),
        resizeMode: "contain",
        backgroundColor: "white",
        borderRadius: getWidth(10),
        borderWidth: 1,
        borderColor: "#AEFF03",
        marginLeft: getWidth(1.5)
    }
});