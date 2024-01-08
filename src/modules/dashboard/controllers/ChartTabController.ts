import {assign, createMachine, DoneInvokeEvent} from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChartResponse} from '../interfaces/ChartResponse';
import {DISCORD_ID, oracleClient} from '../../../app/config';
import {BarData} from '../interfaces/ChartTypes';

type CurrentChart = {
  hrv: number;
  strain: number;
  recovery: number;
};

type CTContext = {
  belowChartData: CurrentChart | null;
  chartData: BarData[] | null;
  data: ChartResponse | null;
};

type CTEvents = {type: 'REFRESH'};

const getChartData = async (): Promise<ChartResponse> => {
  const discordID = await AsyncStorage.getItem(DISCORD_ID);

  if (!discordID) {
    throw new Error();
  }

  const response = await oracleClient.get<ChartResponse>(
    `/user/${discordID}/score`,
  );

  return response.data;
};

export const ChartTabController = createMachine<CTContext, CTEvents>(
  {
    id: 'chartTabController',
    predictableActionArguments: true,
    initial: 'loading',
    context: {
      belowChartData: null,
      chartData: null,
      data: null,
    },
    states: {
      loading: {
        invoke: {
          id: 'getChartData',
          src: getChartData,
          onDone: {
            target: 'idle',
            actions: ['prepareData'],
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
          id: 'getChartData',
          src: getChartData,
          onDone: {
            target: 'idle',
            actions: ['prepareData'],
          },
          onError: {
            target: 'idle',
          },
        },
      },
    },
  },
  {
    actions: {
      prepareData: assign((context, _event: any) => {
        const event: DoneInvokeEvent<ChartResponse> = _event;

        if (event.type !== 'done.invoke.getChartData') {
          return {...context};
        }

        let chartData: BarData[] = event.data.weekly.previous_scores.map(score => {
          const parts = score.date.split('-').map(p => Number(p));

          const date = new Date(parts[0], parts[1], parts[2]);

          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);

          return {
            label: `${month}/${day}`,
            value: score.score,
          };
        });

        return {
          ...context,
          data: event.data,
          chartData,
          belowChartData: {
            hrv: event.data.current_score.hrv || 0,
            strain: event.data.current_score.activity || 0,
            recovery: event.data.current_score.recovery || 0,
          },
        };
      }),
    },
  },
);
