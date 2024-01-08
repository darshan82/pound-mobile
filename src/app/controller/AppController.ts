import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMachine, assign} from 'xstate';
import {poundClient} from '../config';
import {RefreshResponse} from '../../interfaces/RefreshResponse';
type AppContext = {
  tokens: RefreshResponse | null;
};

type AppEvents = {type: 'Dummy'};

const checkToken = async (): Promise<RefreshResponse> => {
  const refresh = await AsyncStorage.getItem('refreshToken');

  if (!refresh) {
    throw new Error('Not a valid token');
  }

  poundClient.defaults.headers.common.refresh_token = refresh;

  const response = await poundClient.get<RefreshResponse>(
    '/api/user/refresh_token',
  );

  return response.data;
};

export const AppController = createMachine<AppContext, AppEvents>({
  id: 'AppController',
  initial: 'checking',
  predictableActionArguments: true,
  states: {
    checking: {
      invoke: {
        id: 'checkToken',
        src: checkToken,
        onDone: {
          target: 'authorized',
          actions: assign({tokens: (_, event) => event.data}),
        },
        onError: {
          target: 'unauthorized',
          actions: assign((context, event) => {
            return {...context};
          }),
        },
      },
    },
    unauthorized: {
      type: 'final',
    },
    authorized: {
      entry: ['GoToDashboard'],
      type: 'final',
    },
  },
});
