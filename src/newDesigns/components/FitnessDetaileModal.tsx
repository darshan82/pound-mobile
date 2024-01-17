import React, { forwardRef, useImperativeHandle, useState } from 'react';

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
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import Colors from '../components/Colors';
import ReactNativeModal from 'react-native-modal';
import QuestionWithOptions from './QuestionWithOptions';

 const FitnessDetaileModal = forwardRef(({}, ref)=> {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);


  useImperativeHandle(ref, () => ({
    showModal(value) {
        setIsVisible(value)
    },
    hideModal(value) {
        setIsVisible(value)
    },
}));

  return (
    <ReactNativeModal style={{margin: 0, padding: 0}} isVisible={isVisible}>
      <SafeAreaView style={{flex: 1}}>
      <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{
        backgroundColor: Colors.gray2, borderTopLeftRadius:getWidth(6), borderTopRightRadius:getWidth(6),
        paddingHorizontal: getWidth(4),
        
      }}>
         <View style={{width:getWidth(20), height:getWidth(2), borderRadius:getWidth(10), backgroundColor:Colors.gray2_0, alignSelf:"center", marginVertical:getWidth(4)}} />
      <View style={styles.innerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fontBold(4), {}]}>Push-Up Prowess Challenge</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity
          onPress={()=> setIsVisible(false)}
          >
            <Image
              style={{
                width: getWidth(6),
                height: getWidth(6),
                resizeMode: 'contain',
              }}
              source={require('../assets/images/cross.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={{marginTop: getWidth(2)}}>
          <Text
            style={[fontRegular(3.5, Colors.gray3), {lineHeight: getWidth(6)}]}>
            Are you ready to embark on your journey to the Avatar State? The
            path begins with the Push-Up Prowess Challenge. This challenge is
            more than just push-ups...
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: getWidth(4),
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={fontBold(3.5)}>July 16</Text>
              <Text style={fontRegular(3.5, Colors.gray3)}>XP Gain</Text>
            </View>
            <View
              style={{
                width: 1,
                height: getWidth(6),
                backgroundColor: Colors.gray3 + '30',
              }}
            />
            <View style={{alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={fontBold(3.5)}>23</Text>
                <Image
                  style={[
                    {
                      width: getWidth(5),
                      height: getWidth(5),
                      resizeMode: 'contain',
                      marginLeft: getWidth(2),
                    },
                  ]}
                  source={require('../assets/images/tokenpound.png')}
                />
              </View>
              <Text style={fontRegular(3.5, Colors.gray3)}>Token</Text>
            </View>
          </View>
          <View
                  style={{
                    paddingVertical: getWidth(3),
                    backgroundColor: Colors.gray2_0,
                    width: '100%',
                    borderRadius: getWidth(3),
                    padding: getWidth(4),
                    marginTop: getWidth(5)
                  }}>
                  <Text style={fontBold(4)}>Enemies Defeated</Text>
                  <View style={{flexDirection: 'row', marginTop:getWidth(2)}}>
                    {[{image:require(`../assets/images/STRENGTH.png`), color: "#80B310"},{image: require(`../assets/images/DEFENSE.png`), color: "#C50CCA"},{image: require(`../assets/images/AGILITY.png`), color: "#0783E9"},{image: require(`../assets/images/VITALITY.png`), color: "#D10F13"},{image:  require(`../assets/images/INTELLECT.png`), color: "#C3C218"},{image: require(`../assets/images/Luck.png`), color: "#12BF89"}].map((item, index) => (
                    <View style={[styles.image,{marginLeft: index ? -getWidth(2) : 0, overflow:"hidden"}]}>                 
                     <Image
                        style={[{width:"80%", height:"80%", resizeMode:"contain"}]}
                        source={item.image}
                      />
                      </View>  
                    ))}
                  </View>
                </View>

                <View
                  style={{
                    paddingVertical: getWidth(3),
                    backgroundColor: Colors.gray2_0,
                    width: '100%',
                    borderRadius: getWidth(3),
                    padding: getWidth(4),
                    marginTop: getWidth(3)
                  }}>
                  <Text style={fontBold(4)}>Attributes Gained</Text>
                  <View style={{flexDirection: 'row', marginTop:getWidth(2)}}>
                    {[{image:require(`../assets/images/STRENGTH.png`), color: "#80B310"},{image: require(`../assets/images/DEFENSE.png`), color: "#C50CCA"},{image: require(`../assets/images/AGILITY.png`), color: "#0783E9"},{image: require(`../assets/images/VITALITY.png`), color: "#D10F13"},{image:  require(`../assets/images/INTELLECT.png`), color: "#C3C218"},{image: require(`../assets/images/Luck.png`), color: "#12BF89"}].map((item, index) => (
                    <View style={[styles.image,{marginLeft: index ? -getWidth(2) : 0, overflow:"hidden"}]}>                 
                     <Image
                        style={[{width:"80%", height:"80%", resizeMode:"contain"}]}
                        source={item.image}
                      />
                      </View>  
                    ))}
                  </View>
                </View>
        </View>

        <View
          style={{
            marginVertical: getWidth(5),
            height: getWidth(50),
            paddingHorizontal: getWidth(3),
            marginTop: getWidth(10),
            marginHorizontal: getWidth(1.5),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: getWidth(2),
            backgroundColor: Colors.gray2_0,
          }}>
          <Text style={[fontBold(3.5, 'white'), {elevation: 3}]}>
            {'DEMO OF CHALLENGE'}
          </Text>
        </View>
        <Text style={[fontRegular(4), {marginVertical: getWidth(3)}]}>
          Instructions:
        </Text>

        {[
          'Begin your journey by starting the challenge.',
          'With each push-up, demonstrate perfect form. Our advanced motion recognition technology will meticulously track your every move.',
          'Push yourself to perform as many correct push-ups as you can within a brief 2-minute window.',
          'Real-time feedback on your form and an accurate count of each precise push-up will guide your progress.',
          'Each push-up propels you closer to the Avatar State. Challenge Apathy and Fatigue, and discover the strength and agility within you.',
        ].map((item, index) => (
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                fontRegular(3.5, Colors.gray3),
                {marginTop: getWidth(1), lineHeight: getWidth(5)},
              ]}>
              {++index}.{' '}
            </Text>
            <Text
              style={[
                fontRegular(3.5, Colors.gray3),
                {marginTop: getWidth(1), flex: 1, lineHeight: getWidth(5)},
              ]}>
              {item}
            </Text>
          </View>
        ))}
      </View>

      <InputButton
        onPress={() => navigation.navigate('BodyTypeScreen')}
        style={[styles.continueBtn,{borderWidth:0, backgroundColor:"transparent"}]}
        labelTitle="Accept Challenge"
      />

      <InputButton
        onPress={() => navigation.navigate('BodyTypeScreen')}
        style={[styles.continueBtn,{borderWidth:0, backgroundColor:Colors.lightGreen}]}
        textColor={Colors.gray1}
        labelTitle="Motion detected"
      />

      <InputButton
        onPress={() => navigation.navigate('BodyTypeScreen')}
        style={[styles.continueBtn,{borderWidth:0.5, borderColor:Colors.gray3, backgroundColor:"transparent", marginBottom:getWidth(7), marginTop:getWidth(4)}]}
        labelTitle="Heart rate detected"
      />
    </ScrollView>
      </SafeAreaView>
    </ReactNativeModal>
  );
});

const styles = StyleSheet.create({
  image: {
    width: getWidth(11),
    height: getWidth(11),
    resizeMode: 'contain',
    backgroundColor: Colors.gray1,
    borderRadius: getWidth(10),
    borderWidth: 3,
    borderColor: Colors.gray2_0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default FitnessDetaileModal