import React, {useEffect, useState} from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputButton} from '../components/InputButton';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import LogoWithBack from '../components/LogoWithBack';
import Colors from '../components/Colors';
import {useGlobalDataContext} from '../../context';
import axios from 'axios';

// prettier-ignore
const gameImages = {
  'Apex Legend': require('../assets/images/GamesImage/ApexLegend.png'),
  'Dota 2': require('../assets/images/GamesImage/Dota2.png'),
  'Escape From Tarkov': require('../assets/images/GamesImage/EscapeFromTaka.png'),
  'Fortnite': require('../assets/images/GamesImage/Fortnite.png'),
  'League Of Legends': require('../assets/images/GamesImage/LeagueOfLegend.png'),
  'Minecraft': require('../assets/images/GamesImage/Minecraft.png'),
  'Overwatch 2': require('../assets/images/GamesImage/Overwatch2.png'),
  'Rocket League': require('../assets/images/GamesImage/RocketLeague.png'),
  'Valorant': require('../assets/images/GamesImage/Valorant.png'),
  'Star Craft II': require('../assets/images/GamesImage/starCraft2.png'),
  'World of Tanks': require('../assets/images/GamesImage/WorldOfTanks.png'),
  'World Of War Craft': require('../assets/images/GamesImage/WorldOfWarCraft.png'),
  'Rainbow Six Seige': require('../assets/images/GamesImage/RainbowSixSeige.png'),
  'Hearthstone' : require('../assets/images/GamesImage/heartstone.png'),
};

export default function FinalScreen() {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const {data, setData} = useGlobalDataContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateGame = async () => {
    setIsLoading(true);
    try {
      if (!selectedItems.length) {
        return;
      }
      const updateUrl = 'http://18.217.10.162/api/users/update-user';
      const headers = {
        Authorization: `${data.token}`,
        'Content-Type': 'application/json',
      };
      const updateBody = {
        gamesToplay: selectedItems,
      };
      const res = await axios.put(updateUrl, updateBody, {
        headers,
      });
      console.log('Update Games -->', res.data);
      setData(prevData => ({
        ...prevData,
        gamesToPlay: res.data.gamesToplay,
      }));
      navigation.navigate('DrawerStack');
    } catch (err) {
      console.log('Error -->', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const toggleItemSelection = item => {
    const selectedIndex = selectedItems.indexOf(item);
    let newSelectedItems = [...selectedItems];
    if (selectedIndex === -1) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }
    setSelectedItems(newSelectedItems);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <LogoWithBack />

        <Text style={styles.loginText}>{'What games do you play?'}</Text>
        <Text style={styles.discText}>
          {
            'We are compatible with the top AAA\ngames to bring you a uniques and\npersonalized experience.'
          }
        </Text>

        <FlatList
          data={[
            'Apex Legend',
            'Dota 2',
            'Escape From Tarkov',
            'Fortnite',
            'League Of Legends',
            'Minecraft',
            'Overwatch 2',
            'Rocket League',
            'Valorant',
            'Star Craft II',
            'World of Tanks',
            'World Of War Craft',
            'Rainbow Six Seige',
            'Hearthstone',
          ]}
          nestedScrollEnabled={false}
          style={{marginTop: getWidth(3), flex: 1}}
          numColumns={2}
          renderItem={({item, index}) => {
            const isSelected = selectedItems.includes(item);
            return (
              <TouchableOpacity
                onPress={() => toggleItemSelection(item)}
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
                    flexDirection: 'row',
                    backgroundColor: Colors.gray2,
                  },
                  {
                    backgroundColor: isSelected
                      ? Colors.lightGreen + 30
                      : Colors.gray2,
                  },
                ]}>
                <Image
                  style={{width: '30%', height: '70%', resizeMode: 'contain'}}
                  source={gameImages[item]}
                />
                <Text
                  style={[
                    fontBold(
                      3.5,
                      isSelected ? Colors.lightGreen : Colors.white,
                    ),
                    {flex: 1},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
      <InputButton
        onPress={updateGame}
        style={styles.continueBtn}
        textColor={Colors.gray1}
        labelTitle="Continue"
        isLoading={isLoading}
        isDisabled={!selectedItems.length || isLoading}
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
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  powerdByImage: {
    width: '100%',
    height: getWidth(8),
    resizeMode: 'contain',
    marginTop: getWidth(10),
  },
  loginText: {
    alignSelf: 'center',
    ...fontBold(6),
    textAlign: 'center',
  },
  discText: {
    alignSelf: 'center',
    ...fontRegular(4, Colors.gray3),
    textAlign: 'center',
    lineHeight: getWidth(7),
    marginVertical: getWidth(5),
  },
  infoText: {
    alignSelf: 'center',
    ...fontBold(2.5),
    textAlign: 'center',
    opacity: 0.6,
  },
  forgetText: {
    alignSelf: 'center',
    ...fontBold(3),
    opacity: 0.6,
    marginTop: getWidth(5),
  },
  orText: {
    alignSelf: 'center',
    ...fontBold(4),
    marginTop: getWidth(3),
  },
  continueBtn: {
    marginTop: getWidth(11),
    borderRadius: getWidth(3),
    backgroundColor: Colors.lightGreen,
  },
  imgBtn: {
    marginTop: getWidth(4),
    backgroundColor: 'rgba(255,255,552,0.2)',
  },
  infoImage: {
    width: getWidth(4),
    height: getWidth(10),
    resizeMode: 'contain',
  },
});
