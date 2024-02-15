import React, { useState } from "react";

import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from "react-native";


import { useNavigation } from '@react-navigation/native';;
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";

export default function LogoWithBack({ title }) {

    const navigation = useNavigation();


    return (
        <View
            style={styles.innerContainer}
        >
            {title && <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Text
                    style={styles.logoImage}
                >
                    {title}
                </Text>
            </View>}

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
        marginBottom: getWidth(3),
    },
    logoImage: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        justifyContent: "center",
        alignContent: "center"
    }
});