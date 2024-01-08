import { createMachine, assign } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { oracleClient } from '../../../app/config/oracleClient';
import { ProfileResponse } from '../interfaces/ProfileResponse';
import { DISCORD_ID } from '../../../app/config/storageKeys';

type DashContext = {
  profileData: ProfileResponse | null;
  leaderboard: any[],
  logs: any[]
};

type DashEvent = {
  type: 'REFRESH';
};

export const getProfileInfo = async (): Promise<any> => {
  const discordID = await AsyncStorage.getItem(DISCORD_ID);

  if (!discordID) {
    throw new Error();
  }

  const response = await oracleClient.get<ProfileResponse>(
    `/user/${discordID}/info`,
  );

  const data = await oracleClient.get<any>(
    `/logs/${discordID}`,
  );

  return {
    profile: response.data,
    leaderboard: data.data.leaderboard,
    logs: data.data.logs,
  };
};

export const DashboardController = createMachine<DashContext, DashEvent>({
  id: 'DashController',
  predictableActionArguments: true,
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getProfileInfo',
        src: getProfileInfo,
        onDone: {
          target: 'idle',
          actions: assign({ profileData: (_, event) => event.data.profile, leaderboard: (_, event) => event.data.leaderboard, logs: (_, event) => event.data.logs }),
        },
        onError: {
          actions: assign((context, event) => {
            return {
              ...context,
            };
          }),
        },
      },
    },
    idle: {
      on: {
        REFRESH: {
          target: 'refreshing',
        },
      },
    },
    refreshing: {
      invoke: {
        id: 'getProfileInfo',
        src: getProfileInfo,
        onDone: {
          target: 'idle',
          actions: assign({ profileData: (_, event) => event.data.profile, leaderboard: (_, event) => event.data.leaderboard, logs: (_, event) => event.data.logs }),
        },
        onError: {
          target: 'idle',
        },
      },
    },
  },
});
