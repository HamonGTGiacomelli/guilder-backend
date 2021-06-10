/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import { CharacterInterface } from '../schemas/Character';
import { validateTokenAuth } from '../middlewares/validateTokenAuth';
import { AuthenticatedRequest } from '../types';
import CharacterController from '../controllers/CharacterController';

const routes = Router();

routes.use(validateTokenAuth);

routes.post(
  '/',
  async (req: AuthenticatedRequest<{}, {}, CharacterInterface>, res: Response): Promise<Response> => {
    console.log('POST character');
    const { userId } = req.context;
    const characterRequested = req.body;

    const character = await CharacterController.create(userId, characterRequested);

    return res.send({ character });
  }
);

routes.delete(
  '/',
  async (req: AuthenticatedRequest<{}, {}, CharacterInterface>, res: Response): Promise<Response> => {
    console.log('DELETE character');
    const { userId } = req.context;
    const characterRequested = req.body;

    const result = await CharacterController.delete(userId, characterRequested);

    if (result) {
      return res.send({ success: true });
    }
    return res.send({ error: 'An error has occurred!' });
  }
);

routes.put(
  '/',
  async (req: AuthenticatedRequest<{}, {}, CharacterInterface>, res: Response): Promise<Response> => {
    console.log('PUT character');
    const { userId } = req.context;
    const characterRequested = req.body;

    const character = await CharacterController.update(userId, characterRequested);

    return res.send({ character });
  }
);

export default (router: Router): void => {
  router.use('/character', routes);
};
