/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import { RPGTableInterface } from '../schemas/RPGTable';
import { validateTokenAuth } from '../middlewares/validateTokenAuth';
import { AuthenticatedRequest } from '../types';
import RPGTableController from '../controllers/RPGTableController';

const routes = Router();

routes.use(validateTokenAuth);

routes.post(
  '/',
  async (req: AuthenticatedRequest<{}, {}, RPGTableInterface>, res: Response): Promise<Response> => {
    console.log('POST rpgTable');
    const { userId } = req.context;
    const rpgTableRequested = req.body;

    const rpgTable = await RPGTableController.create(userId, rpgTableRequested);

    return res.send({ rpgTable });
  }
);

routes.delete(
  '/:id',
  async (req: AuthenticatedRequest<{ id: string }, {}, RPGTableInterface>, res: Response): Promise<Response> => {
    console.log('DELETE rpgTable');
    const { userId } = req.context;
    const { id: tableId } = req.params;

    const result = await RPGTableController.delete(userId, tableId);

    if (result) {
      return res.send({ success: true });
    }
    return res.send({ error: 'An error has occurred!' });
  }
);

routes.put(
  '/',
  async (req: AuthenticatedRequest<{}, {}, RPGTableInterface>, res: Response): Promise<Response> => {
    console.log('PUT rpgTable');
    const { userId } = req.context;
    const rpgTableRequested = req.body;

    const rpgTable = await RPGTableController.update(userId, rpgTableRequested);

    return res.send({ rpgTable });
  }
);

export default (router: Router): void => {
  router.use('/rpgTable', routes);
};
