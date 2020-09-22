import axios from 'axios';
import {BACKEND_ENDPOINT} from 'config';

const client = axios.create({
  baseURL: BACKEND_ENDPOINT,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
