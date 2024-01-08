import axios from 'axios';
import {ROOK_TOKEN} from './storageKeys';

export const rookConnectClient = axios.create({
  baseURL: 'https://api.rook-connect.com',
  headers: {
    Authorization: `Basic ${ROOK_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
