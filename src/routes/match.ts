/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import { RPGTableInterface } from '../schemas/RPGTable';
import validateTokenAuth from '../middlewares/validateTokenAuth';
import { AuthenticatedRequest } from '../types';
import RPGTableController from '../controllers/RPGTableController';

const routes = Router();

routes.use(validateTokenAuth);

routes.get(
  '/',
  async (req: AuthenticatedRequest<{}, {}, RPGTableInterface>, res: Response): Promise<Response> => {
    const rpgTables = await RPGTableController.retrieveAll();

    return res.send({ rpgTables });
  }
);

export default (router: Router): void => {
  router.use('/match', routes);
};
