import {Router} from 'express';
import files from './files';

const routes = Router();

routes.use('/files', files);

export default routes;
