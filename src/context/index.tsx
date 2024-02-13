import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';

type GlobalDataContextType = {
  data: {
    avatarURL: string;
    token: string;
    loginToken: string;
    email: string;
    playerTag: string;
    gender: string;
    weightGoal: string;
    physiqueGoal: string[];
    height: number;
    weight: number;
    age: number;
    location: string;
    timeZone: string;
    userIp: string;
    gamesToPlay: string[];
    stepCounting: boolean;
    motionDetection: boolean;
    heartRateDetection: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      avatarURL: string;
      token: string;
      loginToken: string;
      email: string;
      playerTag: string;
      gender: string;
      weightGoal: string;
      physiqueGoal: string[];
      height: number;
      weight: number;
      age: number;
      location: string;
      timeZone: string;
      userIp: string;
      gamesToPlay: string[];
      stepCounting: boolean;
      motionDetection: boolean;
      heartRateDetection: string;
    }>
  >;
};

const initialData = {
  avatarURL: '',
  token: '',
  loginToken: '',
  email: '',
  playerTag: '',
  gender: '',
  weightGoal: '',
  physiqueGoal: [],
  height: 0,
  weight: 0,
  age: 0,
  location: '',
  timeZone: '',
  userIp: '',
  gamesToPlay: [],
  stepCounting: false,
  motionDetection: false,
  heartRateDetection: '',
};

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(
  undefined,
);

export const useGlobalDataContext = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalDataContext must be used within a MyProvider');
  }
  return context;
};

export const GlobalDataProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [data, setData] = useState<{
    avatarURL: string;
    token: string;
    loginToken: string;
    email: string;
    playerTag: string;
    gender: string;
    weightGoal: string;
    physiqueGoal: string[];
    height: number;
    weight: number;
    age: number;
    location: string;
    timeZone: string;
    userIp: string;
    gamesToPlay: string[];
    stepCounting: boolean;
    motionDetection: boolean;
    heartRateDetection: string;
  }>(initialData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('globalData');
        if (storedData !== null) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('globalData', JSON.stringify(data));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    saveData();
  }, [data]);

  return (
    <GlobalDataContext.Provider value={{data, setData}}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataContext;
