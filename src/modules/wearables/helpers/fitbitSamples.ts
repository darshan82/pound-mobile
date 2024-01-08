import AsyncStorage from '@react-native-async-storage/async-storage';
import {DISCORD_ID, ROOK_CLIENT} from '../../../app/config';
import {rookConnectClient} from '../../../app/config';
import {FitbitLink} from '../interfaces/fitbitLink';
import updateServicesLinked from './updateServicesLinked';

export const initFitBit = async (): Promise<void> => {
  const discordID = await currentUser();

  if (!discordID) {
    return;
  }

  let link = '';

  try {
    const status = await rookConnectClient.get('/api/v1/fitbit-exits-user', {
      params: {
        client_uuid: ROOK_CLIENT,
        user_id: discordID,
      },
    });

    if (status.status !== 200) {
      link = await generateLink(discordID);
    } else {
      await updateServicesLinked({service: 'fitbit', linked: true});
    }
  } catch (error) {
    link = await generateLink(discordID);
  }

  await AsyncStorage.setItem('rookConnectLink', link);
};

const generateLink = async (discordID: string): Promise<string> => {
  try {
    const link = await rookConnectClient.get<FitbitLink>(
      '/api/v1/fitbit-link',
      {
        params: {
          client_uuid: ROOK_CLIENT,
          user_id: discordID,
        },
      },
    );

    return link.data.url;
  } catch (error) {
    return '';
  }
};

export const isFitbitLinked = async (): Promise<boolean> => {
  const discordID = await currentUser();

  if (!discordID) {
    return false;
  }

  try {
    const status = await rookConnectClient.get('/api/v1/fitbit-exits-user', {
      params: {
        client_uuid: ROOK_CLIENT,
        user_id: discordID,
      },
    });

    if (status.status === 200) {
      await updateServicesLinked({service: 'fitbit', linked: true});
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

const currentUser = async (): Promise<string> => {
  const discord = await AsyncStorage.getItem(DISCORD_ID);
  return discord || '';
};
