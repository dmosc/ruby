import express from 'express';
import {PORT} from './config';
import routes from './routes';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.json({limit: '50mb'}));
app.use(routes);

(async () => {
  try {
    await Promise.all([app.listen(PORT)]);

    console.info(`🚀  Server listening on port ${PORT}`);
  } catch (e) {
    console.error(e);
  }
})();
