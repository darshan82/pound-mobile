import {createMachine, assign} from 'xstate';
import {poundClient} from '../../../app/config';
import {InitializeResponse} from '../interfaces';

type Account = {
  nickname: string;
  password: string;
};

type SUPContext = {
  data: Account | null;
  discordID: string;
  unrecognized: boolean;
};

type SUPEvents = {type: 'INITIALIZE'; data: Account};

const setPasswordAndNickname = async (context: SUPContext): Promise<string> => {
  const {data} = context;

  if (!data) {
    throw new Error('');
  }

  poundClient.defaults.headers.common.password = context.data!.password;

  const resp = await poundClient.post<InitializeResponse>(
    '/api/user/initialize',
    {
      nickname: context.data!.nickname,
    },
  );

  return resp.data.data.discord_id;
};

export const SignUpController = createMachine<SUPContext, SUPEvents>({
  id: 'SUPController',
  predictableActionArguments: true,
  initial: 'idle',
  context: {
    data: null,
    discordID: '',
    unrecognized: false,
  },
  states: {
    idle: {
      on: {
        INITIALIZE: {
          target: 'initializing',
          actions: assign({data: (_, event) => event.data}),
        },
      },
    },
    initializing: {
      invoke: {
        id: 'setPasswordAndNickname',
        src: setPasswordAndNickname,
        onDone: {
          target: 'complete',
          actions: assign({discordID: (_, event) => event.data}),
        },
        onError: {
          target: 'unrecognized',
        },
      },
    },
    unrecognized: {
      type: 'final',
    },
    complete: {
      type: 'final',
    },
  },
});
