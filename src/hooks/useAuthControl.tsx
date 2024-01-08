/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useState, useEffect} from 'react';
import {useMachine} from '@xstate/react';
import {useNavigation} from '@react-navigation/native';
import {AppController} from '../app/controller/AppController';
import {AppContext} from '../app/context';

export const useAuthControl = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const {setRefreshTokens} = useContext(AppContext);

  const [machine] = useMachine(AppController, {
    actions: {
      GoToDashboard: ctx => {
        if (ctx.tokens) {
          setRefreshTokens(ctx.tokens);
        }
        navigation.navigate('Dashboard' as never, {} as never);
      },
    },
  });

  useEffect(() => {
    if (machine.matches('unauthorized')) {
      setIsLoading(false);
    }
  }, [machine.value]);

  return {
    isLoading,
  };
};
