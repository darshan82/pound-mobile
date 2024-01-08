import AsyncStorage from '@react-native-async-storage/async-storage';
import {LINKED_SERVICES} from '../../../app/config';

const updateServicesLinked = async ({
  service,
  linked,
}: {
  service: string;
  linked: boolean;
}): Promise<void> => {
  let services: {[key: string]: boolean} = {};
  const rawServices = await AsyncStorage.getItem(LINKED_SERVICES);

  if (rawServices) {
    services = JSON.parse(rawServices);
  }

  services[service] = linked;

  await AsyncStorage.setItem(LINKED_SERVICES, JSON.stringify(services));
};

export const isAlreadyLinked = async (service: string): Promise<boolean> => {
  let services: {[key: string]: boolean} = {};
  const rawServices = await AsyncStorage.getItem(LINKED_SERVICES);

  if (rawServices) {
    services = JSON.parse(rawServices);
  }

  return services[service] || false;
};

export default updateServicesLinked;
