import { createMachine, assign } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { oracleClient } from '../../../app/config/oracleClient';
import { LiveResponse, ProfileResponse } from '../interfaces/LiveResponse';
import { DISCORD_ID } from '../../../app/config/storageKeys';

type LiveContext = {
  profile: ProfileResponse | null;
};

type LiveEvent = {
  type: 'REFRESH';
};

const getLiveInfo = async (): Promise<LiveResponse> => {
  const discordID = await AsyncStorage.getItem(DISCORD_ID);

  if (!discordID) {
    throw new Error();
  }

  const response = await oracleClient.get<ProfileResponse>(
    `/user/${discordID}/info`,
  )



  return {
    //@ts-ignore
    profile: response.data,
  };
};

export const LiveController = createMachine<LiveContext, LiveEvent>({
  id: 'LiveController',
  predictableActionArguments: true,
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getLiveInfo',
        src: getLiveInfo,
        onDone: {
          target: 'idle',
          actions: assign({ profile: (_, event) => event.data.profile }),
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
        id: 'getLiveInfo',
        src: getLiveInfo,
        onDone: {
          target: 'idle',
          actions: assign({ profile: (_, event) => event.data.profile }),
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
  },
});
