import React, { FC, useState } from 'react';
import { tabs } from '../helpers/tabs';
import { TrackingTab } from '../components/TrackingTab';
import { StyleSheet } from 'react-native';

type TabsContainerProps = {
  refresh: number;
  setRefreshing: (refreshing: boolean) => void;
};

export const TabsContainer: FC<TabsContainerProps> = ({
  refresh,
  setRefreshing,
}) => {
  const [activeTab, setActiveTab] = useState(
    tabs.length > 0 ? tabs[0].key : '',
  );

  return (
    <>

      {activeTab === tabs[0].key && (
        <TrackingTab refresh={refresh} setRefreshing={setRefreshing} />
      )}
    </>
  );
};