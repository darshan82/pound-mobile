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
        width: getWidth(5.5),
        height: getWidth(5.5),
        resizeMode: "contain",
        alignSelf: "center",
    },
    innerContainer: {
        justifyContent: "center"
    },
    logoImage: {
        width: "100%",
        height: getWidth(7),
        marginVertical: getWidth(2),
        resizeMode: "contain",
        alignSelf: "center"
    }
});