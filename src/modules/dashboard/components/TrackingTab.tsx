/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from 'react';
import { Box,  VStack, Skeleton } from 'native-base';
import { useMachine } from '@xstate/react';

import { BarChart } from './charts';
import { ChartTabController } from '../controllers/ChartTabController';

type TrankingTabProps = {
  setRefreshing: (refreshing: boolean) => void;
  refresh: number;
};

export const TrackingTab: FC<TrankingTabProps> = ({ refresh, setRefreshing }) => {
  const [machine, send] = useMachine(ChartTabController);

  useEffect(() => {
    setRefreshing(machine.matches('refreshing'));
  }, [machine.value]);

  useEffect(() => {
    if (refresh > 0) {
      send({ type: 'REFRESH' });
    }
  }, [refresh]);

  return machine.context.chartData ? (
    <Box>
      <BarChart title="weeks" data={machine.context.chartData || []} raw={machine.context.data!} />
    </Box>
  ) : (
    <VStack>
      <Skeleton h="200" marginY={5} rounded="md" />
      <Skeleton my="2" rounded="md" startColor="primary.100" />
      <Skeleton my="2" rounded="md" startColor="primary.100" />
      <Skeleton my="2" rounded="md" startColor="primary.100" />
    </VStack>
  );
};
