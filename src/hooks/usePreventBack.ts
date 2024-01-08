import {useCallback} from 'react';
import {BackHandler, Alert} from 'react-native';
import {usePreventRemoveContext} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

type usePreventBackConfig = {
  disableBack: boolean;
  doFirst?: () => void;
};

export const usePreventBack = ({
  disableBack,
  doFirst,
}: usePreventBackConfig) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (disableBack) {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        } else {
          doFirst && doFirst();
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        subscription.remove();
      };
    }, [disableBack, doFirst]),
  );
};
