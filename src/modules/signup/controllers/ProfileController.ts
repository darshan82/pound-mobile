import { createMachine, assign, DoneInvokeEvent } from 'xstate';

import { poundClient } from '../../../app/config';
import { GendersResponse } from '../interfaces';
import { InputOption } from '../../../interfaces/InputFormat';

export type Profile = {
  first_name: string;
  last_name: string;
  birthday: string;
  gender: string;
  country: string;
};

type ProfileContext = {
  data: Profile | null;
  genders: InputOption[];
  rawData: any
};

type ProfileEvent = { type: 'CREATE'; data: Profile };

const getGenders = async (context: ProfileContext): Promise<GendersResponse> => {
  const response = await poundClient.get<GendersResponse>('/api/genders_list');

  context.rawData = 0;

  return response.data;
};

const createProfile = async (context: ProfileContext): Promise<void> => {
  const { data } = context;

  await poundClient.post('/api/user/personal_information', { ...data });
};

export const ProfileController = createMachine<ProfileContext, ProfileEvent>(
  {
    id: 'ProfileController',
    predictableActionArguments: true,
    initial: 'loading',
    context: {
      genders: [],
      data: null,
      rawData: null,
    },
    states: {
      loading: {
        invoke: {
          id: 'getGenders',
          src: getGenders,
          onDone: {
            target: 'idle',
            actions: ['mapGenders'],
          },
          onError: {},
        },
      },
      idle: {
        on: {
          CREATE: {
            target: 'creating',
            actions: assign({ data: (_, event) => event.data }),
          },
        },
      },
      creating: {
        invoke: {
          id: 'createProfile',
          src: createProfile,
          onDone: {
            target: 'created',
          },
          onError: {
            target: 'unrecognized',
          },
        },
      },
      created: {
        type: 'final',
      },
      unrecognized: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      mapGenders: assign((context, _event: any) => {
        const event: DoneInvokeEvent<GendersResponse> = _event;

        if (event.type !== 'done.invoke.getGenders') {
          return { ...context };
        }

        return {
          ...context,
          genders: event.data.data.map(g => ({ value: g, label: g })),
        };
      }),
    },
  },
);
