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


export default function GameSelection() {

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

            <Text style={styles.loginText}>{'Enable Connections'}</Text>
            <Text style={styles.discText}>
              {
                'We use your health data to provide\npersonalized and highly effective\nworkouts and suggestions.'
              }
            </Text>

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: Colors.gray2,
                alignItems: 'center',
                paddingHorizontal: getWidth(5),
                paddingVertical: getWidth(2),
                borderRadius: getWidth(3),
              }}>
              <Text
                style={{
                  ...fontSemiBold(4.4),
                  alignSelf: 'flex-start',
                  marginVertical: getWidth(2),
                }}>
                {'Step Counting '}
              </Text>
              <Image
                style={styles.infoImage}
                source={require('../assets/images/question.png')}
              />
              <View style={{flex: 1}} />
              <ToggleSwitch onToggleChange={() => {}} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: getWidth(4),
                backgroundColor: Colors.gray2,
                alignItems: 'center',
                paddingHorizontal: getWidth(5),
                paddingVertical: getWidth(2),
                borderRadius: getWidth(3),
              }}>
              <Text
                style={{
                  ...fontSemiBold(4.4),
                  alignSelf: 'flex-start',
                  marginVertical: getWidth(2),
                }}>
                {'Motion Detection '}
              </Text>
              <Image
                style={styles.infoImage}
                source={require('../assets/images/question.png')}
              />
              <View style={{flex: 1}} />
              <ToggleSwitch onToggleChange={() => {}} />
            </View>

            <View
              style={{
                marginTop: getWidth(5),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{...fontSemiBold(5)}}>{'Heart Rate Detection '}</Text>
              <Image
                style={styles.infoImage}
                source={require('../assets/images/question.png')}
              />
            </View>

            <FlatList
              data={[require('../assets/images/1.png'),require('../assets/images/2.png'),require('../assets/images/3.png'),require('../assets/images/4.png'),require('../assets/images/5.png')]}
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
                      style={{width: "100%",
                        height: "40%", resizeMode:"contain"}}
                      source={item}
                    />
                  </TouchableOpacity>
                );
              }}
            />
              </ScrollView>
          <InputButton
            onPress={() => navigation.navigate('BodyTypeScreen')}
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
        ...fontBold(7),
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