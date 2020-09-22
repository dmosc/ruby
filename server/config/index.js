import dotenv from 'dotenv';

dotenv.config();

// Cloud Run and CRA rely on PORT env variable
// to setup the listening port for the container. When developing
// locally, make sure to only setup LOCAL_PORT env variable to avoid
// conflicting issues.
const PORT = process.env.LOCAL_PORT ? process.env.LOCAL_PORT : process.env.PORT;

export {PORT};
