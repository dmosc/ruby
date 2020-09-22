import {Router} from 'express';

const routes = Router();

routes.get('/', (_, res) => {
  res.status(200).send('Server is alive!');
});

export default routes;
