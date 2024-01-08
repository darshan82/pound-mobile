import {createMachine, assign} from 'xstate';
import {poundClient} from '../../../app/config';
import {LoginResponse} from '../interfaces/LoginResponse';

type LoginContext = {
  password: string;
  tokens: LoginResponse | null;
};

type LoginEvents = {type: 'AUTHENTICATE'; password: string} | {type: 'RETRY'};

const login = async (context: LoginContext): Promise<LoginResponse> => {
  poundClient.defaults.headers.common.password = context.password;

  const response = await poundClient.get<LoginResponse>('/api/user/sign_in');
  return response.data;
};

export const LoginController = createMachine<LoginContext, LoginEvents>({
  id: 'LoginController',
  predictableActionArguments: true,
  initial: 'idle',
  context: {
    password: '',
    tokens: null,
  },
  states: {
    idle: {
      on: {
        AUTHENTICATE: {
          target: 'authenticating',
          actions: assign({password: (_, event) => event.password}),
        },
      },
    },
    authenticating: {
      invoke: {
        id: 'login',
        src: login,
        onDone: {
          target: 'authenticated',
          actions: [assign({tokens: (_, event) => event.data})],
        },
        onError: {
          target: 'failed',
          actions: [
            assign((context, event) => {
                (event.data.response.data);
              return {...context};
            }),
            'showAlert',
          ],
        },
      },
    },
    authenticated: {
      type: 'final',
    },
    failed: {
      on: {
        RETRY: {
          target: 'idle',
        },
      },
    },
  },
});
