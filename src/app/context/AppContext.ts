import {createContext} from 'react';
import {LoginResponse} from '../../modules/login/interfaces/LoginResponse';
import {RefreshResponse} from '../../interfaces/RefreshResponse';
import {BoardingResponse} from '../../modules/signup/interfaces/BoardingResponse';

export interface AppState {
  boardingData: BoardingResponse | null;
  discordID: string;
  headerShown: boolean;
  tokens: LoginResponse | null;
}

export interface AppActions extends AppState {
  setBoardingData: (boardingData: BoardingResponse | null) => void;
  setDiscordID: (discordID: string) => void;
  setHeaderShown: (show: boolean) => void;
  setRefreshTokens: (tokens: RefreshResponse) => void;
  setTokens: (tokens: LoginResponse | null) => void;
}

export const AppContext = createContext({} as AppActions);
