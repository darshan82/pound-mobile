import React, {useEffect, useState} from 'react';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

interface PlayerRanking {
  rank: number;
  firstName: string;
  lastName: string;
  avatar: string;
  xps: number;
}

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import Colors from '../components/Colors';
import {useGlobalDataContext} from '../../context';
import axios from 'axios';

export default function TeamRankingScreen() {
  const [playerRanking, setPlayerRanking] = useState<PlayerRanking[]>([]);
  const {data} = useGlobalDataContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPlayerRanking = async () => {
      setIsLoading(true);
      try {
        const apiUrl = 'http://18.217.10.162/api/users/team-ranking';
        const headers = {
          Authorization: `${data.loginToken}`,
          'Content-Type': 'application/json',
        };
        const res = await axios.get(apiUrl, {headers});
        const filteredPlayerRanking = res.data.filter(
          player =>
            'rank' in player &&
            'firstName' in player &&
            'lastName' in player &&
            'avatar' in player,
        );
        setPlayerRanking(filteredPlayerRanking);
        console.log('Get Player Ranking -->', filteredPlayerRanking);
      } catch (e) {
        console.log('Error In Get Player Ranking', e);
      } finally {
        setIsLoading(false);
      }
    };
    getPlayerRanking();
  }, [data.loginToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator color="#AEFF03" size="large" />
          </View>
        ) : (
          <FlatList
            data={playerRanking}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginTop: getWidth(3),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: getWidth(3),
                    backgroundColor: Colors.gray2,
                    paddingHorizontal: getWidth(4),
                    borderRadius: getWidth(3),
                  }}>
                  <Text style={fontBold(4, '#AEFF03')}>{item.rank}</Text>
                  <Image
                    style={styles.image}
                    source={{uri: item.avatar.replace('.glb', '.png')}}
                  />
                  <Text style={[fontRegular(4), {width: '50%'}]}>
                    {`${item.firstName} ${item.lastName}`}
                  </Text>
                  <Text style={fontBold(4, '#AEFF03')}>{`${
                    item.xps ? item.xps : 0
                  } xp`}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(5),
    backgroundColor: Colors.gray0,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: getWidth(9),
    height: getWidth(9),
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: getWidth(10),
  },
  activityIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
