import axios from 'axios';

export const poundClient = axios.create({
  baseURL: 'https://0mcmjr2ek3.execute-api.us-east-2.amazonaws.com/Prod',
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOiAiMjAyMi0xMi0xOSAwMjo0Mzo0OS44NjM5NTYiLCAic3ViIjogInBvdW5kX2FwcCJ9.JxnGLlLRlFSSslWZ4UhTtgCrC1nDiwkWJt9fi7TXc08',
  },
});
