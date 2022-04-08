/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import RPGTableController from '../controllers/RPGTableController';
import { validateTokenAuth } from '../middlewares/validateTokenAuth';
import { CharacterInterface } from '../schemas/Character';
import { RPGTableInterface } from '../schemas/RPGTable';
import { ScheduleInterface } from '../schemas/Schedule';
import { AuthenticatedRequest } from '../types';

const routes = Router();

routes.use(validateTokenAuth);

routes.post(
  '/',
  async (
    req: AuthenticatedRequest<{}, {}, { rpgTable: RPGTableInterface; schedule: ScheduleInterface }>,
    res: Response
  ): Promise<Response> => {
    console.log('GET add schedular');
    const { userId } = req.context;
    const { rpgTable, schedule } = req.body;

    return res.send(await RPGTableController.addSchedule(userId, rpgTable._id, schedule));
  }
);

routes.delete(
  '/',
  async (
    req: AuthenticatedRequest<{}, {}, { rpgTable: RPGTableInterface; schedule: ScheduleInterface }>,
    res: Response
  ): Promise<Response> => {
    console.log('GET remove schedular');
    const { userId } = req.context;
    const { rpgTable, schedule } = req.body;

    return res.send(await RPGTableController.removeSchedule(userId, rpgTable._id, schedule));
  }
);

routes.post(
  '/accept',
  async (
    req: AuthenticatedRequest<{}, {}, { rpgTable: RPGTableInterface; chaarcter: CharacterInterface; date: string }>,
    res: Response
  ): Promise<Response> => {
    console.log('GET accept schedular');

    return res.send('TODO');
  }
);

routes.post(
  '/reject',
  async (
    req: AuthenticatedRequest<{}, {}, { rpgTable: RPGTableInterface; chaarcter: CharacterInterface; date: string }>,
    res: Response
  ): Promise<Response> => {
    console.log('GET reject schedular');

    return res.send('TODO');
  }
);

export default (router: Router): void => {
  router.use('/schedule', routes);
};
