import React, { useState } from "react";

import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";


import { useNavigation } from '@react-navigation/native';;
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";


export default function LogoWithBack() {

    const navigation = useNavigation();


    return (
        <View
            style={styles.innerContainer}
        >
            <Image
                style={styles.logoImage}
                source={require('../assets/images/justLogo.png')}
            />

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: "absolute" }}
            >
                <Image
                    style={styles.leftErrow}
                    source={require('../assets/images/arrow_left.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    leftErrow: {
        width: getWidth(7),
        height: getWidth(7),
        resizeMode: "contain",
        alignSelf: "center",
    },
    innerContainer: {
        justifyContent: "center",
        marginBottom:getWidth(3)
    },
    logoImage: {
        width: "100%",
        height: getWidth(8.5),
        marginVertical: getWidth(2),
        resizeMode: "contain",
        alignSelf: "center"
    }
});