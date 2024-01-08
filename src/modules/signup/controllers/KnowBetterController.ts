import {createMachine, assign} from 'xstate';
import {InputList} from '../../../interfaces/InputFormat';
import {poundClient} from '../../../app/config';
import {Identities} from '../interfaces/KnowBetter';
import {LoginResponse} from '../../login/interfaces/LoginResponse';

export type AdditionalData = {
  height_ft: number;
  height_in: number;
  weight: number;
  goal: string;
  commitment: string;
  [key: string]: boolean | string | number;
};

type KBContext = {
  identities: InputList[];
  tokens: LoginResponse | null;
  variables: AdditionalData | null;
};

type KBEvents =
  | {type: 'UPDATE'; list: InputList[]}
  | {type: 'CREATE'; data: AdditionalData};

const prepareDataForInputs = async (): Promise<InputList[]> => {
  const response = await poundClient.get<Identities>('/api/identities_list');

  return response.data.data.map(i => ({label: i, checked: false}));
};

const setAdditionalData = async (context: KBContext): Promise<void> => {
  const {variables} = context;

  if (!variables) {
    throw new Error('');
  }

  await poundClient.post('/api/user/additional_information', {...variables});
};

const login = async (): Promise<LoginResponse> => {
  const response = await poundClient.get<LoginResponse>('/api/user/sign_in');
  return response.data;
};

export const KnowBetterController = createMachine<KBContext, KBEvents>({
  id: 'KBController',
  predictableActionArguments: true,
  initial: 'loading',
  context: {
    identities: [],
    tokens: null,
    variables: null,
  },
  states: {
    loading: {
      invoke: {
        id: 'prepareDataForInputs',
        src: prepareDataForInputs,
        onDone: {
          target: 'idle',
          actions: assign({identities: (_, event) => event.data}),
        },
      },
    },
    idle: {
      on: {
        UPDATE: {
          actions: assign({identities: (_, event) => event.list}),
        },
        CREATE: {
          target: 'creating',
          actions: assign({variables: (_, event) => event.data}),
        },
      },
    },
    creating: {
      invoke: {
        id: 'setAdditionalData',
        src: setAdditionalData,
        onDone: {
          target: 'authenticating',
        },
        onError: {
          target: 'unrecognized',
        },
      },
    },
    authenticating: {
      invoke: {
        id: 'login',
        src: login,
        onDone: {
          target: 'complete',
          actions: assign({tokens: (_, event) => event.data}),
        },
        onError: {
          target: 'complete',
        },
      },
    },
    complete: {
      type: 'final',
    },
    unrecognized: {
      type: 'final',
    },
  },
});
