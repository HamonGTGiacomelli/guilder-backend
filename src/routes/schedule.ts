/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import { validateTokenAuth } from '../middlewares/validateTokenAuth';
import { CharacterInterface } from '../schemas/Character';
import { RPGTableInterface } from '../schemas/RPGTable';
import { ScheduleInterface } from '../schemas/Schedule';
import { AuthenticatedRequest } from '../types';

const routes = Router();

routes.use(validateTokenAuth);

routes.post(
  '/add',
  async (
    req: AuthenticatedRequest<{}, {}, { rpgTable: RPGTableInterface; schedule: ScheduleInterface }>,
    res: Response
  ): Promise<Response> => {
    console.log('GET add schedular');

    return res.send('TODO');
  }
);

routes.post(
  '/remove',
  async (req: AuthenticatedRequest<{}, {}, ScheduleInterface>, res: Response): Promise<Response> => {
    console.log('GET remove schedular');

    return res.send('TODO');
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
