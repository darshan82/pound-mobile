import { createMachine, assign } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { oracleClient } from '../../../app/config/oracleClient';
import { WalletResponse } from '../interfaces/WalletResponse';
import { DISCORD_ID } from '../../../app/config/storageKeys';

type WalletContext = {
  data: WalletResponse | null;
};

type WalletEvent = {
  type: 'REFRESH';
};

const getProfileInfo = async (): Promise<any> => {
  const discordID = await AsyncStorage.getItem(DISCORD_ID);

  if (!discordID) {
    throw new Error();
  }

  const response = await oracleClient.get<WalletResponse>(
    `/user/${discordID}/wallet`,
  );

  return response.data;
};

export const WalletController = createMachine<WalletContext, WalletEvent>({
  id: 'WalletController',
  predictableActionArguments: true,
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getProfileInfo',
        src: getProfileInfo,
        onDone: {
          target: 'idle',
          actions: assign({ data: (_, event) => event.data }),
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
          actions: assign({ data: (_, event) => event.data }),
        },
        onError: {
          target: 'idle',
        },
      },
    },
  },
});
