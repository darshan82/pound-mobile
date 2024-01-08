// Context
import {AppState} from './AppContext';
import {LoginResponse} from '../../modules/login/interfaces/LoginResponse';
import {RefreshResponse} from '../../interfaces/RefreshResponse';
import {BoardingResponse} from '../../modules/signup/interfaces/BoardingResponse';

type AppAction =
  | {type: 'SHOW_HEADER'; payload: boolean}
  | {type: 'SET_TOKENS'; payload: LoginResponse | null}
  | {type: 'SET_REFRESH_TOKENS'; payload: RefreshResponse}
  | {type: 'SET_DISCORD_ID'; payload: string}
  | {type: 'SET_BOARDING_DATA'; payload: BoardingResponse | null};

export default (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SHOW_HEADER':
      return {
        ...state,
        headerShown: action.payload,
      };

    case 'SET_TOKENS':
      return {
        ...state,
        tokens: action.payload,
      };

    case 'SET_BOARDING_DATA':
      return {
        ...state,
        boardingData: action.payload,
      };

    case 'SET_REFRESH_TOKENS':
      return {
        ...state,
        tokens: {
          data: {
            ...state.tokens!.data,
            tokens: action.payload.data,
          },
        },
      };

    case 'SET_DISCORD_ID':
      return {
        ...state,
        discordID: action.payload,
      };

    default:
      return state;
  }
};
