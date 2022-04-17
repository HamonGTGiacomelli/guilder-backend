/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import RPGTableController from '../controllers/RPGTableController';
import ScheduleController from '../controllers/ScheduleController';
import { validateTokenAuth } from '../middlewares/validateTokenAuth';
import { RPGTableInterface } from '../schemas/RPGTable';
import { ScheduleInterface } from '../schemas/Schedule';
import { AuthenticatedRequest } from '../types';

const routes = Router();

routes.use(validateTokenAuth);

routes.get('/:tableId', async (req: AuthenticatedRequest, res) => {
  console.log('GET add schedular');
  const { userId } = req.context;
  const { tableId } = req.params;

  res.send(await RPGTableController.retrieveSchedules(userId, tableId));
});

routes.post(
  '/',
  async (
    req: AuthenticatedRequest<{}, {}, { tableId: string; schedule: ScheduleInterface }>,
    res: Response
  ): Promise<Response> => {
    console.log('POST add schedular');
    const { userId } = req.context;
    const { tableId, schedule } = req.body;

    console.log({ userId, tableId, schedule });

    return res.send(await RPGTableController.addSchedule(userId, tableId, schedule));
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
  async (req: AuthenticatedRequest<{}, {}, { scheduleId: string; characterId: string }>, res: Response): Promise<Response> => {
    console.log('POST accept schedular');
    const { scheduleId, characterId } = req.body;

    return res.send(await ScheduleController.accept(scheduleId, characterId));
  }
);

routes.post(
  '/reject',
  async (req: AuthenticatedRequest<{}, {}, { scheduleId: string; characterId: string }>, res: Response): Promise<Response> => {
    console.log('POST reject schedular');
    const { scheduleId, characterId } = req.body;

    return res.send(await ScheduleController.reject(scheduleId, characterId));
  }
);

export default (router: Router): void => {
  router.use('/schedule', routes);
};
