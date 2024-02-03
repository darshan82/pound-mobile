import React, { useEffect, useState } from "react";

import {
    Dimensions,
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    ScrollView,
} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { InputButton } from "../components/InputButton";
import { fontBold, fontRegular, fontSemiBold, getWidth } from "../../modules/dashboard/helpers/tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputText } from "../components/InputText";
import { ToggleSwitch } from "../components/ToggleSwitch";
import LogoWithBack from "../components/LogoWithBack";
import Colors from "../components/Colors";
import { color } from "native-base/lib/typescript/theme/styled-system";


export default function FinalScreen() {

    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(()=>{
        navigation.setOptions({
            headerShown : false
        })
    },[])

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{flex:1}}>
          
            <LogoWithBack />

            <Text style={styles.loginText}>{'What games do you play?'}</Text>
            <Text style={styles.discText}>
              {
                'We are compatible with the top AAA\ngames to bring you a uniques and\npersonalized experience.'
              }
            </Text>

            <FlatList
              data={["Apex Legends" , "dummytext" , "dummytext", "dummytext", "dummytext", "dummytext", "dummytext", "dummytext", "dummytext", "dummytext", "dummytext"]}
              nestedScrollEnabled={false}
              style={{marginTop: getWidth(3), flex: 1}}
              numColumns={2}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedIndex(index);
                    }}
                    style={[
                      {
                        width: getWidth(40),
                        height: getWidth(13),
                        borderRadius: getWidth(2.5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: 'white',
                        marginLeft: getWidth(3),
                        marginBottom: getWidth(3),
                        flexDirection:"row",
                        backgroundColor: Colors.gray2,
                      },
                      selectedIndex == index
                        ? {
                            backgroundColor: Colors.lightGreen + 30,
                            borderWidth: 2,
                            borderColor: Colors.lightGreen,
                          }
                        : {},
                    ]}>
                    <Image
                      style={{width: "30%",
                        height: "70%", resizeMode:"contain"}}
                      source={require('../assets/images/dummylogo.png')}
                    />
                    <Text style={[fontBold(3.5, selectedIndex == index ? Colors.lightGreen : Colors.white), {flex:1}]}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
              </ScrollView>
          <InputButton
            onPress={() => navigation.navigate('GameSelection')}
            style={styles.continueBtn}
            textColor={Colors.gray1}
            labelTitle="Continue"
          />
      
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: getWidth(4),
        backgroundColor: Colors.gray1,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: Colors.gray1,
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
        ...fontBold(6),
        textAlign: "center"
    },
    discText: {
        alignSelf: "center",
        ...fontRegular(4, Colors.gray3),
        textAlign: "center",
        lineHeight:getWidth(7),
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
        marginTop: getWidth(11),
        borderRadius: getWidth(3),
        backgroundColor:Colors.lightGreen
    },
    imgBtn: {
        marginTop: getWidth(4),
        backgroundColor: 'rgba(255,255,552,0.2)'
    },
    infoImage: {
        width: getWidth(4),
        height: getWidth(10),
        resizeMode: "contain"
    },
});