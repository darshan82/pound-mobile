import {createMachine, assign, DoneInvokeEvent} from 'xstate';

import {poundClient} from '../../../app/config';
import {UserStatusResponse} from '../interfaces';
import {Status} from '../interfaces/UserStatusResponse';
import {BoardingResponse} from '../interfaces/BoardingResponse';
import {oracleClient} from '../../../app/config';

type EVContext = {
  data: BoardingResponse | null;
  email: string;
  screen: Status;
  discordID: string;
};

type EVEvents =
  | {type: 'VERIFY'; email: string}
  | {type: 'RETRY'}
  | {type: 'RESET'};

type StatusResponse = {
  screen: Status;
  discordID: string;
};

const verifyEmail = async (context: EVContext): Promise<StatusResponse> => {
  poundClient.defaults.headers.common.email = context.email;

  const response = await poundClient.get<UserStatusResponse>(
    '/api/user/status',
  );

  return {
    screen: response.data.user_status,
    discordID: response.data.discord_id,
  };
};

const fetchDataForBoarding = async (
  context: EVContext,
): Promise<BoardingResponse> => {
  const {email} = context;

  const response = await oracleClient.get<BoardingResponse>(`/${email}/signup`);

  return response.data;
};

export const EmailValidationController = createMachine<EVContext, EVEvents>(
  {
    id: 'EVController',
    predictableActionArguments: true,
    initial: 'idle',
    context: {
      data: null,
      email: '',
      screen: Status.IDLE,
      discordID: '',
    },
    states: {
      idle: {
        on: {
          VERIFY: {
            target: 'verifying',
            actions: assign({email: (_, event) => event.email}),
          },
        },
      },
      verifying: {
        invoke: {
          id: 'verifyEmail',
          src: verifyEmail,
          onDone: {
            target: 'fetching',
            actions: ['completeSignUp'],
          },
          onError: {
            target: 'unauthorized',
          },
        },
      },
      fetching: {
        invoke: {
          id: 'fetchDataForBoarding',
          src: fetchDataForBoarding,
          onDone: {
            target: 'completed',
            actions: assign({data: (_, event) => event.data}),
          },
          onError: {
            target: 'unauthorized',
          },
        },
      },
      unauthorized: {
        on: {
          RETRY: {
            target: 'idle',
            actions: ()=>{
              alert("SDfsdfd")
            }
          },
        },
      },
      completed: {
        after: {
          1500: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    actions: {
      completeSignUp: assign((context, _event: any) => {
        const event: DoneInvokeEvent<StatusResponse> = _event;

        if (event.type !== 'done.invoke.verifyEmail') {
          return {...context};
        }

        return {
          ...context,
          screen: Status[event.data.screen as unknown as keyof typeof Status],
          discordID: event.data.discordID,
        };
      }),
    },
  },
);
