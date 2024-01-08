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
    ScrollView,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { InputButton } from "../components/InputButton";
import { fontBold, fontRegular, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function FitnessChallage() {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
            >
                <View
                    style={styles.innerContainer}
                >

                    <View style={{ flexDirection: "row" }}>
                        <Text style={[fontRegular(4), { marginLeft: getWidth(4) }]}>{"Oracle / Fitness Challenge"}</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity>
                            <Image
                                style={{ width: getWidth(6), height: getWidth(6), resizeMode: "contain" }}
                                source={require('../assets/images/cross.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={[fontBold(4), { marginLeft: getWidth(4), marginTop: getWidth(6) }]}>Push-Up Prowess Challenge</Text>

                    <View style={{ marginLeft: getWidth(3), marginTop: getWidth(2) }}>
                        <Text style={[fontRegular(3.5), {}]}>XP Gain: 100   Streak: X   Token: 10 PND</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: getWidth(2) }}>
                            <Text style={fontBold(3.5)}>Enemies:</Text>
                            {["", ""].map(() => (
                                <Image
                                    style={styles.image}
                                    source={require('../assets/images/img.png')}
                                />
                            ))}
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: getWidth(2) }}>
                            <Text style={fontBold(3.5)}>Attributes:</Text>
                            {["", "", ""].map(() => (
                                <Image
                                    style={styles.image}
                                    source={require('../assets/images/img.png')}
                                />
                            ))}
                        </View>
                    </View>

                    <View
                        style={{
                            marginVertical: getWidth(5),
                            height: getWidth(50),
                            paddingHorizontal: getWidth(3),
                            marginHorizontal: getWidth(1.5),
                            justifyContent: 'center',
                            alignItems: "center",
                            borderRadius: getWidth(2),
                            borderWidth: 1,
                            borderColor: "white"
                        }}
                    >
                        <Text style={[fontBold(3.5, "white"), { elevation: 3 }]}>{"DEMO OF CHALLENGE"}</Text>
                    </View>
                    <Text style={[fontRegular(3.5), { marginTop: getWidth(3) }]}>Instructions:</Text>

                    {["Begin your journey by starting the challenge.",
                        "With each push-up, demonstrate perfect form. Our advanced motion recognition technology will meticulously track your every move.",
                        "Push yourself to perform as many correct push-ups as you can within a brief 2-minute window.",
                        "Real-time feedback on your form and an accurate count of each precise push-up will guide your progress.",
                        "Each push-up propels you closer to the Avatar State. Challenge Apathy and Fatigue, and discover the strength and agility within you."].map((item, index) => (
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[fontRegular(3.5), { marginTop: getWidth(1) }]}>{++index}.  </Text>
                                <Text style={[fontRegular(3.5), { marginTop: getWidth(1), flex:1 }]}>{item}</Text>
                            </View>
                        ))}


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
        marginTop: getWidth(5)
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
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