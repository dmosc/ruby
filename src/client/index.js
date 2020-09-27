import axios from 'axios';
import {BACKEND_ENDPOINT, YT_API_KEY} from 'config';

const baseConfig = {
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const api = axios.create({
  baseURL: BACKEND_ENDPOINT,
  ...baseConfig,
});

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  ...baseConfig,
});

youtube.interceptors.request.use((config) => {
  config.url += `&key=${YT_API_KEY}`;
  return config;
});

export {api, youtube};
