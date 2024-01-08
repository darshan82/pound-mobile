import { createMachine, assign } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { oracleClient } from '../../../app/config/oracleClient';
import { ChatResponse, ProfileResponse } from '../interfaces/ChatResponse';
import { DISCORD_ID } from '../../../app/config/storageKeys';
import { MessageType } from '../interfaces/MessageType';

type ChatContext = {
  profile: ProfileResponse | null;
  messages: MessageType[]
};

type ChatEvent = {
  type: 'REFRESH';
};

const getChatInfo = async (): Promise<ChatResponse> => {
  const discordID = await AsyncStorage.getItem(DISCORD_ID);

  if (!discordID) {
    throw new Error();
  }

  const response = await oracleClient.get<ProfileResponse>(
    `/user/${discordID}/info`,
  )

  const response2 = await oracleClient.get<MessageType[]>(
    `/messages`,
  );
  console.log(response.data)
  return {
    //@ts-ignore
    profile: response.data,
    //@ts-ignore
    messages: response2.data.sort((a, b) => a.createdAt - b.createdAt)
  };
};

export const ChatController = createMachine<ChatContext, ChatEvent>({
  id: 'ChatController',
  predictableActionArguments: true,
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'getChatInfo',
        src: getChatInfo,
        onDone: {
          target: 'idle',
          actions: assign({ messages: (_, event) => event.data.messages, profile: (_, event) => event.data.profile }),
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
        id: 'getChatInfo',
        src: getChatInfo,
        onDone: {
          target: 'idle',
          actions: assign({ messages: (_, event) => event.data.messages, profile: (_, event) => event.data.profile }),
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
