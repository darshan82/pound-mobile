import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useMachine } from '@xstate/react';

import { LiveController } from '../controllers/LiveController';
import { LoadingSpinner } from '../../../components/layout/Spinner';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import "react-native-gesture-handler";

export const LiveScreen = () => {
  const [machine, send] = useMachine(LiveController);
  const [camera, setCamera] = useState<any>();

  let recording: any = null;
  let recordingPath: any = null;

  async function startRecording() {
    if (!camera) {
      console.warn('camera not loaded!');
      return;
    }

    if (recording) {
      console.warn('Already recording!');
      return;
    }

    const { uri, codec } = await camera.recordAsync();

    recording = {
      uri,
      codec,
      path: recordingPath,
    };

    console.log('Recording started');
  }

  async function stopRecording() {
    if (!camera) {
      console.warn('camera not loaded!');
      return;
    }

    if (!recording) {
      console.warn('Not recording!');
      return;
    }

    await camera.stopRecording();

    recording = null;
    console.log('Recording stopped');
  }
  const navigation = useNavigation();

  return machine.matches('loading') || !machine.context.profile ? (
    <LoadingSpinner />
  ) : (
    <SafeAreaView style={styles.container}>
    
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
});