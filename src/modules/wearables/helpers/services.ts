import {initHealthKit} from './appleSamples';
import {initFitBit, isFitbitLinked} from './fitbitSamples';
import {isAlreadyLinked} from './updateServicesLinked';

type Service = {
  available: boolean;
  isInWebApp: boolean;
  platform: 'ios' | 'android' | 'both';
  serviceName: string;
  initialize: (user: string) => Promise<void>;
  linked: () => Promise<boolean>;
};

export const services: Service[] = [
  {
    serviceName: 'Apple health',
    available: true,
    platform: 'ios',
    isInWebApp: false,
    initialize: initHealthKit,
    linked: () => isAlreadyLinked('apple'),
  },
  {
    serviceName: 'Fitbit',
    available: true,
    platform: 'both',
    isInWebApp: true,
    initialize: initFitBit,
    linked: isFitbitLinked,
  },
];
