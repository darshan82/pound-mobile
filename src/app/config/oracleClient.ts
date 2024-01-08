import axios from 'axios';

export const oracleClient = axios.create({
  // baseURL: 'https://separate-heavenly-hope.glitch.me',
  baseURL: 'http://34.27.120.197',
  headers: {
    Authorization: 'Psg26gwWui2w0o',
  },
});
