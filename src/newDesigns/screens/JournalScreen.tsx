import React, {useRef, useState, useEffect} from 'react';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';

import {
  fontBold,
  fontRegular,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import Colors from '../components/Colors';
import JornalDetaileModal from '../components/JornalDetaileModal';
import {useGlobalDataContext} from '../../context';
import axios from 'axios';

interface Journal {
  _id: string;
  ActivityLevel: number;
  AttributesList: string[];
  ChallangeDescription: string;
  ChallangeJournal: string;
  ChallengeName: string;
  EnemiesList: string[];
  ExercisesList: string[];
  ReadinessScore: number;
  Reps: number;
  Sets: number;
  Token: number;
  xp: number;
  status: string;
  userId: string;
  accuracy: string;
  difficultyLevel: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const attributeImages = {
  Strength: require('../assets/images/STRENGTH.png'),
  Luck: require('../assets/images/Luck.png'),
  Defense: require('../assets/images/DEFENSE.png'),
  Vitality: require('../assets/images/VITALITY.png'),
  Intellect: require('../assets/images/INTELLECT.png'),
  Agility: require('../assets/images/AGILITY.png'),
};

const enemyImage = {
  Apathy: require('../assets/images/Ene1.png'),
  Fatigue: require('../assets/images/Ene2.png'),
  Procrastination: require('../assets/images/Ene3.png'),
  Stress: require('../assets/images/Ene4.png'),
  Inconsistency: require('../assets/images/Ene5.png'),
  Injury: require('../assets/images/Ene6.png'),
  Plateaus: require('../assets/images/Ene7.png'),
};

export default function RankingScreen() {
  const jornalDetaileModalRef = useRef();
  const {data} = useGlobalDataContext();
  const [journalData, setJournalData] = useState<Journal[]>([]);

  useEffect(() => {
    const getJournalData = async () => {
      const apiUrl = 'http://18.217.10.162/api/challenges';
      const headers = {
        Authorization: `${data.loginToken}`,
        'Content-Type': 'application/json',
      };
      const res = await axios.get(apiUrl, {headers});
      setJournalData(res.data);
      // console.log('Response Of Journal API -->', res.data);
    };

    getJournalData();
  }, [data.loginToken]);

  const createdAtDate = new Date(journalData[0]?.createdAt);

  const formattedDate = createdAtDate.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  const [monthPart, yearPart] = formattedDate.split(', ');

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {journalData.length === 0 ? (
          <Text style={styles.noDataText}>No Journal data available</Text>
        ) : (
          <FlatList
            style={{marginTop: getWidth(3), paddingHorizontal: getWidth(4)}}
            data={journalData.slice(0, 1)}
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
                  {/* Your existing render item content */}
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      <JornalDetaileModal
        journalData={journalData}
        monthPart={monthPart}
        attributeImages={attributeImages}
        enemyImage={enemyImage}
        yearPart={yearPart}
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
    justifyContent: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
