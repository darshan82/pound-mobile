import axios from 'axios';
import {ENV} from './env';

export const poundClient = axios.create({
  baseURL: ENV.POUND_LAMBDA_URL,
  headers: {
    Authorization: `Bearer ${ENV.POUND_LAMBDA_TOKEN}`,
  },
});
