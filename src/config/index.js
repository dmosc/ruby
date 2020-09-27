import dotenv from 'dotenv';

dotenv.config();

const {
  REACT_APP_BACKEND_ENDPOINT: BACKEND_ENDPOINT,
  REACT_APP_YOUTUBE_API_KEY: YT_API_KEY,
} = process.env;

export {BACKEND_ENDPOINT, YT_API_KEY};
