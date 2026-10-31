import axios from 'axios';
import {ENV} from './env';

export const oracleClient = axios.create({
  baseURL: ENV.ORACLE_API_URL,
  headers: {
    Authorization: ENV.ORACLE_API_KEY,
  },
});
