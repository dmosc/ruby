import dotenv from 'dotenv';

dotenv.config();

const {REACT_APP_BACKEND_ENDPOINT: BACKEND_ENDPOINT} = process.env;

export {BACKEND_ENDPOINT};
