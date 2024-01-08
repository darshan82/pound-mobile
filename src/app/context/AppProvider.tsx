import React, {FC, ReactNode, useReducer} from 'react';

// Context
import {AppContext, AppState} from './AppContext';
import AppReducer from './AppReducer';
import {LoginResponse} from '../../modules/login/interfaces/LoginResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshResponse} from '../../interfaces/RefreshResponse';
import {BoardingResponse} from '../../modules/signup/interfaces/BoardingResponse';
import {DISCORD_ID, NICKNAME, ACCESS_TOKEN, REFRESH_TOKEN} from '../config';

const INITIAL_STATE: AppState = {
  boardingData: null,
  discordID: '',
  headerShown: false,
  tokens: null,
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);

  /**
   * This function takes a boolean value and dispatches an action to the reducer to update the state.
   * @param {boolean} showHeader - boolean - This is the value that we want to set the navigation header to.
   */
  const setHeaderShown = (showHeader: boolean): void => {
    dispatch({
      type: 'SHOW_HEADER',
      payload: showHeader,
    });
  };

  const setTokens = async (tokens: LoginResponse | null): Promise<void> => {
    if (tokens) {
      await Promise.all([
        AsyncStorage.setItem(
          DISCORD_ID,
          tokens.data.user_information.discord_id,
        ),

        AsyncStorage.setItem(NICKNAME, tokens.data.user_information.nickname),
      ]);

      await Promise.all([
        AsyncStorage.setItem(ACCESS_TOKEN, tokens.data.tokens.access_token),
        AsyncStorage.setItem(REFRESH_TOKEN, tokens.data.tokens.refresh_token),
      ]);
    }

    dispatch({
      type: 'SET_TOKENS',
      payload: tokens,
    });
  };

  const setRefreshTokens = async (tokens: RefreshResponse): Promise<void> => {
    const [nickname, discordID] = await Promise.all([
      AsyncStorage.getItem(NICKNAME),
      AsyncStorage.getItem(DISCORD_ID),
    ]);

    const newTokens: LoginResponse = {
      data: {
        user_information: {
          nickname: nickname || '',
          discord_id: discordID || '',
        },
        tokens: tokens.data,
      },
    };

    setTokens(newTokens);
  };

  const setBoardingData = (boardingData: BoardingResponse | null): void => {
    dispatch({
      type: 'SET_BOARDING_DATA',
      payload: boardingData,
    });
  };

  const setDiscordID = async (discordID: string): Promise<void> => {
    await AsyncStorage.setItem(DISCORD_ID, discordID);

    dispatch({
      type: 'SET_DISCORD_ID',
      payload: discordID,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setHeaderShown,
        setTokens,
        setRefreshTokens,
        setBoardingData,
        setDiscordID,
      }}>
      {children}
    </AppContext.Provider>
  );
};
