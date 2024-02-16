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
              data={[{name: "Apex Legends", img: require('../assets/images/game1.png')} ,
              {name: "Dota 2", img: require('../assets/images/game2.png')} ,
              {name: "Escape From Tarkov", img: require('../assets/images/game3.png')} ,
              {name: "Fortnite", img: require('../assets/images/game4.png')} ,
              {name: "League of Legends", img: require('../assets/images/game5.png')} ,
              {name: "Minecraft", img: require('../assets/images/game6.png')} ,
              {name: "Overwatch 2", img: require('../assets/images/game7.png')} ,
              {name: "Rocket League", img: require('../assets/images/game8.png')} ,
              {name: "StarCraft II", img: require('../assets/images/game9.png')} ,
              {name: "World of Tanks", img: require('../assets/images/game10.png')},
              {name: "Rainbow Six Siege", img: require('../assets/images/game11.png')},
              {name: "Hearthstone", img: require('../assets/images/game12.png')},
                    ]}
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
                      source={item.img}
                    />
                    <Text style={[fontBold(3.3, selectedIndex == index ? Colors.lightGreen : Colors.white), {flex:1}]}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
              </ScrollView>
          <InputButton
            onPress={() => navigation.navigate('GameSelection')}
            style={[styles.continueBtn, {borderWidth:0}]}
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