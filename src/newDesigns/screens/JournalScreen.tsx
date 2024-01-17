import React, { useRef } from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputText} from '../components/InputText';
import Colors from '../components/Colors';
import JornalDetaileModal from '../components/JornalDetaileModal';
import LockView from '../components/LockView';

export default function RankingScreen() {
  const navigation = useNavigation();
  const jornalDetaileModalRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          style={{marginTop: getWidth(3), paddingHorizontal: getWidth(4)}}
          data={['', '', '']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => jornalDetaileModalRef.current?.showModal(true)}
                style={{
                  alignItems: 'center',
                  padding: getWidth(5),
                  backgroundColor: Colors.gray2,
                  borderRadius: getWidth(4),
                  marginTop: getWidth(3),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '80%',
                    alignItems: 'center',
                  }}>
                  <View style={{alignItems:"center"}}>
                    <Text style={fontBold(3.5)}>July 16</Text>
                    <Text style={fontRegular(3.5)}>2023</Text>
                  </View>
                  <View
                    style={{
                      width: 1,
                      height: getWidth(6),
                      backgroundColor: Colors.gray3 + '30',
                    }}
                  />
                  <View style={{alignItems:"center"}}>
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
                  <View style={{alignItems:"center"}}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={fontBold(3.5)}>23</Text>
                    <Image
                        style={[{width:getWidth(5), height:getWidth(5), resizeMode:"contain", marginLeft:getWidth(2)}]}
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
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* <LockView
      btnText="text"
      /> */}
      <JornalDetaileModal
      ref={jornalDetaileModalRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray0,
  },
  innerContainer: {
    // flex:1,
    justifyContent: 'center',
  },
  image: {
    width: getWidth(8),
    height: getWidth(8),
    resizeMode: 'contain',
    backgroundColor:  Colors.gray1,
    borderRadius: getWidth(10),
    borderWidth: 3,
    borderColor: Colors.gray2_0,
    justifyContent:"center",
    alignItems:"center"
  },
});
