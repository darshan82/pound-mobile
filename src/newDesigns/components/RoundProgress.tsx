import React, { FC } from "react";

import {
    Dimensions,
    Image,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { fontBold, getWidth } from "../../modules/dashboard/helpers/tabs";
// import { CircularProgress } from 'react-native-progress-circle-gradient';

interface RoundProgressProps {
   progress: number,
   style?: StyleProp<ViewStyle>;
   size: number,
   progressText: string | number
  }
  
  export const RoundProgress: FC<RoundProgressProps> = ({
    progress = 0,
    style ,
    size = getWidth(50),
    progressText = 0
  }) => {

    const navigation = useNavigation();

    return (
        <View style={[{ width: size, height: size, justifyContent: "center", alignItems: "center" },style]}>
            <Image
                style={{ width: "100%", height: "100%", resizeMode: "contain", position: "absolute" , top:size/70}}
                source={require('../assets/images/unfilled.png')}
            />
            <View
                style={{
                    transform: [{ rotate: '195deg' }]
                }}
            >
                {/* <CircularProgress

                    backgroundColor={'rgba(0,0,0,0)'}
                    radius={size/2.4}
                    strokeWidth={size/7}
                    percentageComplete={progress}
                    colors={['black', '#FA00FF', '#AEFF03']}
                    easing={'quad'}
                    duration={10}
                    granularity={10}
                    onAnimationFinish={() => {

                    }}
                /> */}
                
            </View>
            <Text style={[fontBold(3),{fontSize:size/6, position:"absolute"}]}>{progressText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: getWidth(8),
    },
    innerContainer: {
        flex: 1,
        backgroundColor: "white",
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
});