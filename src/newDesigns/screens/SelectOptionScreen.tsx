import React, { useState } from 'react';

import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { InputButton } from '../components/InputButton';
import {
  fontBold,
  fontSemiBold,
  getWidth,
} from '../../modules/dashboard/helpers/tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LogoWithBack from '../components/LogoWithBack';
import Colors from '../components/Colors';
import { getPower, getWeight } from '../../app/helpers';
import { useGlobalDataContext } from '../../context';
import axios from 'axios';

export default function SelectOptionScreen() {
  const navigation = useNavigation();
  const [weight, setWeight] = useState(1);
  const [power, setPower] = useState([]);
  const { data, setData } = useGlobalDataContext();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setPowerState = value => {
    const _power = [...power];
    const index = _power.indexOf(value);
    if (index != -1) {
      _power.splice(index, 1);
      setPower(_power);
    } else {
      console.log('3r4r4343534543', _power);
      if (_power.length != 2) {
        _power.push(value);
        setPower(_power);
      }
    }
  };

  const WeightGoal = getWeight(weight);
  const PhysiqueGoal = getPower(power);
  const trueCount = Object.values(PhysiqueGoal).filter(
    goal => goal === true,
  ).length;

  console.log({ trueCount });

  const UpdateGoal = async () => {
    setIsLoading(true);
    try {
      if (trueCount !== 2) {
        setError('Exactly two goals must be selected');
        return;
      }
      const updateUrl = 'http://18.217.10.162/api/users/update-user';
      const headers = {
        Authorization: `${data.token}`,
        'Content-Type': 'application/json',
      };
      const updateBody = {
        PhysiqueGoal,
        WeightGoal,
      };

      const res = await axios.put(updateUrl, updateBody, {
        headers,
      });
      console.log('Physique Response -->', res.data);
      setData(prevData => ({
        ...prevData,
        weightGoal: res.data.weightGoal,
        physiqueGoal: res.data.physiqueGoal,
      }));
      navigation.navigate('SelectWeightGender');
    } catch (err) {
      console.log('Error -->', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.innerContainer}>
          <LogoWithBack logo={true} />
          <Text style={styles.loginText}>{'It’s your journey.\nOwn it.'}</Text>
          <Text style={styles.discText}>
            {'Lets start with identifying your goals'}
          </Text>

          <Text style={fontBold(4.5)}>{'Pick one goal'}</Text>

          <InputButton
            onPress={() => setWeight(0)}
            style={[
              styles.continueBtn,
              weight == 0
                ? {
                  borderWidth: 2,
                  borderColor: Colors.lightGreen,
                  backgroundColor: Colors.lightGreen + '30',
                }
                : { backgroundColor: Colors.gray2 },
            ]}
            labelTitle="Lose Weight"
            textColor={weight == 0 ? Colors.lightGreen : Colors.white}
          />

          <InputButton
            onPress={() => setWeight(1)}
            style={[
              styles.continueBtn,
              weight == 1
                ? {
                  borderWidth: 2,
                  borderColor: Colors.lightGreen,
                  backgroundColor: Colors.lightGreen + '30',
                }
                : { backgroundColor: Colors.gray2 },
            ]}
            labelTitle="Maintain Weight"
            textColor={weight == 1 ? Colors.lightGreen : Colors.white}
          />

          <InputButton
            onPress={() => setWeight(2)}
            style={[
              styles.continueBtn,
              weight == 2
                ? {
                  borderWidth: 2,
                  borderColor: Colors.lightGreen,
                  backgroundColor: Colors.lightGreen + '30',
                }
                : { backgroundColor: Colors.gray2 },
            ]}
            labelTitle="Gain Weight"
            textColor={weight == 2 ? Colors.lightGreen : Colors.white}
          />

          <Text style={[fontBold(4.5), { marginTop: getWidth(9) }]}>
            {'Pick up to two goal'}
          </Text>

          <InputButton
            onPress={() => {
              setPowerState(0);
              setError('');
            }}
            style={[
              styles.continueBtn,
              power.includes(0)
                ? {
                  borderWidth: 2,
                  borderColor: Colors.lightGreen,
                  backgroundColor: Colors.lightGreen + '30',
                }
                : { backgroundColor: Colors.gray2 },
            ]}
            labelTitle="Tone Up"
            textColor={power.includes(0) ? Colors.lightGreen : Colors.white}
          />

          <InputButton
            onPress={() => {
              setPowerState(1);
              setError('');
            }}
            style={[
              styles.continueBtn,
              power.includes(1)
                ? {
                  borderWidth: 2,
                  borderColor: Colors.lightGreen,
                  backgroundColor: Colors.lightGreen + '30',
                }
                : { backgroundColor: Colors.gray2 },
            ]}
            labelTitle="Bulk Up"
            textColor={power.includes(1) ? Colors.lightGreen : Colors.white}
          />

          <InputButton
            onPress={() => {
              setPowerState(2);
              setError('');
            }}
            style={[
              styles.continueBtn,
              power.includes(2)
                ? {
                  borderWidth: 2,
                  borderColor: Colors.lightGreen,
                  backgroundColor: Colors.lightGreen + '30',
                }
                : { backgroundColor: Colors.gray2 },
            ]}
            labelTitle="Get Strong"
            textColor={power.includes(2) ? Colors.lightGreen : Colors.white}
          />

          <Text
            style={{ color: 'red', paddingHorizontal: 8, paddingVertical: 5 }}>
            {error}
          </Text>

          <View style={{ flex: 1 }} />

        </View>
      </ScrollView>

      <InputButton
        onPress={UpdateGoal}
        style={[
          styles.continueBtn,
          {
            marginTop: getWidth(5),
            borderRadius: getWidth(2),
          },
        ]}
        labelTitle="Continue"
        textColor={Colors.gray1}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getWidth(5),
    paddingVertical: getWidth(6),
    marginTop: getWidth(-3),
    backgroundColor: "#1f1f1f",

  },
  innerContainer: {
    flex: 1,
  },
  logoImage: {
    width: getWidth(18),
    height: getWidth(10),
    marginVertical: getWidth(2),
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
    ...fontBold(6.5),
    textAlign: 'center',
    marginTop: -20
  },
  discText: {
    alignSelf: 'center',
    ...fontSemiBold(4.2, Colors.gray3),
    textAlign: 'center',
    marginVertical: getWidth(4),
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
    marginTop: getWidth(4),
    borderWidth: 0,
    backgroundColor: Colors.lightGreen,
    borderRadius: getWidth(3),
  },
  imgBtn: {
    marginTop: getWidth(4),
    backgroundColor: 'rgba(255,255,552,0.2)',
  },
});
