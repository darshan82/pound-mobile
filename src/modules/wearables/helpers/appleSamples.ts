import AsyncStorage from '@react-native-async-storage/async-storage';
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from 'react-native-health';
import {rookConnectClient} from '../../../app/config';
import {APPLE_SOURCE, DISCORD_ID} from '../../../app/config/storageKeys';
import updateServicesLinked from './updateServicesLinked';
import {isAlreadyLinked} from './updateServicesLinked';
import dayjs from 'dayjs';

/*Action sheet to enable the permissions to active apple health */
export const initHealthKit = async (user: string): Promise<void> => {
  if (!user) {
    return;
  }

  await HealthKitInit(user);
};

const HealthKitInit = (user: string): Promise<void> => {
  return new Promise(resolve => {
    const permissions = getPermissions();

    AppleHealthKit.initHealthKit(permissions, async (err: string) => {
      if (err) {
        console.log('[ERROR] Cannot grant permissions!');
        return;
      }

      if (!user) {
        return;
      }

      const isLinked = await isAlreadyLinked('apple');

      if (isLinked) {
        return;
      }

      await updateServicesLinked({service: 'apple', linked: true});

      rookConnectClient
        .post('/api/v1/create-user', {
          user_id: user,
          sources_of_data: 'Apple Health',
        })
        .then(() => configureNativeAppEventEmitter())
        .catch();

      resolve();
    });
  });
};

const getPermissions = (): HealthKitPermissions => {
  const excluded = [
    'ProcedureRecord',
    'VitalSignRecord',
    'MedicationRecord',
    'AllergyRecord',
    'ImmunizationRecord',
    'CoverageRecord',
    'LabResultRecord',
    'ConditionRecord',
  ];

  const bridge = Object.values(AppleHealthKit.Constants.Permissions).filter(
    t => !excluded.includes(t),
  );

  const permissions = {
    permissions: {
      read: bridge,
    },
  } as HealthKitPermissions;

  return permissions;
};

/**
 * configure the lecture of samples
 */
export const configureNativeAppEventEmitter = async () => {
  const discordID = await currentUser();

  if (!discordID) {
    return;
  }

  const lastReview = await AsyncStorage.getItem('lastAPPHealthREview');
  const current = new Date();

  // const options = {
  //   startDate: lastReview || current.toISOString(),
  //   endDate: current.toISOString(),
  // };

  const options = {
    startDate: new Date(2023, 2, 15, 0, 0, 0).toISOString(),
    endDate: current.toISOString(),
  };

  current.setSeconds(current.getSeconds() + 1);

  await AsyncStorage.setItem('lastAPPHealthREview', current.toISOString());

  await HealthKitAvailable();

  AppleHealthKit.getSleepSamples(options, (err: string, res: HealthValue[]) =>
    uploadSleepSamples(err, res, discordID),
  );

  AppleHealthKit.getHeartRateVariabilitySamples(
    options,
    (err: string, res: HealthValue[]) => uploadHRVEvents(err, res, discordID),
  );

  AppleHealthKit.getActiveEnergyBurned(
    options,
    (err: string, results: HealthValue[]) =>
      uploadCaloriesSamples(err, results, discordID),
  );
};

const uploadSleepSamples = async (
  err: string,
  results: HealthValue[],
  discordID: string,
): Promise<void> => {
  if (err) {
    console.log(err);
    return;
  }

  results.forEach(sleep => {
    rookConnectClient
      .post('/api/v1/sleep-data-summary', {
        user_id: discordID,
        sources_of_data: APPLE_SOURCE,
        datetime: dayjs(sleep.startDate).format('YYYY-MM-DD'),
        sleep_date: dayjs(sleep.startDate).format('YYYY-MM-DD'),
        sleep_start_datetime: dayjs(sleep.startDate).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        sleep_end_datetime: dayjs(sleep.endDate).format('YYYY-MM-DD HH:mm:ss'),
        sleep_duration_seconds:
          (new Date(sleep.endDate).valueOf() -
            new Date(sleep.startDate).valueOf()) /
          1000,
      })
      .then(() => console.log('data de sueño', sleep.value))
      .catch(t => console.log('es', t.response));
  });
};

const uploadCaloriesSamples = async (
  err: string,
  results: HealthValue[],
  discordID: string,
): Promise<void> => {
  if (err) {
    return;
  }

  results.forEach(calories => {
    rookConnectClient
      .post('/api/v1/physical-data-event', {
        user_id: discordID,
        sources_of_data: APPLE_SOURCE,
        datetime: dayjs(calories.startDate).format('YYYY-MM-DD'),
        activity_start_time_date_time: dayjs(calories.startDate).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        activity_end_time_date_time: dayjs(calories.endDate).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        active_seconds: 0,
        calories_net_active_kilocalories: calories.value,
      })
      .then(() => console.log('data de calories', calories.value))
      .catch(t => console.log('ec', t));
  });
};

const uploadHRVEvents = async (
  err: string,
  results: HealthValue[],
  discordID: string,
  event: string = 'hrv',
): Promise<void> => {
  if (err) {
    console.log(err);
    return;
  }

  results.forEach(hrv => {
    rookConnectClient
      .post('/api/v1/physical-data-event', {
        user_id: discordID,
        sources_of_data: APPLE_SOURCE,
        datetime: dayjs(hrv.startDate).format('YYYY-MM-DD'),
        activity_start_time_date_time: dayjs(hrv.startDate).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        activity_end_time_date_time: dayjs(hrv.endDate).format(
          'YYYY-MM-DD HH:mm:ss',
        ),
        active_seconds: 0,
        hrv_avg_sdnn_number: hrv.value,
      })
      .then(() => console.log(`data de ${event}`, hrv.value))
      .catch(t => console.log('ehrv', t));
  });
};

const HealthKitAvailable = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.isAvailable((error: Object) => {
      if (error) {
        reject();
        return;
      }

      resolve('');
    });
  });
};

const currentUser = async (): Promise<string> => {
  const discord = await AsyncStorage.getItem(DISCORD_ID);
  return discord || '';
};
