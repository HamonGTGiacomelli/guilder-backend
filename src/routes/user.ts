/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserInterface } from '../schemas/User';
import validateTokenAuth from '../middlewares/validateTokenAuth';
import { AuthenticatedRequest } from '../types';

const routes = Router();

routes.use(validateTokenAuth);

routes.get(
  '/',
  async (req: AuthenticatedRequest<{}, {}, UserInterface>, res: Response): Promise<Response> => {
    const { userId } = req.context;
    try {
      const user = await UserController.retrieveOne(userId);
      return res.send({ user });
    } catch (err) {
      const ex: Error = err;
      res.send({ error: ex.message });
    }
  }
);

export default (router: Router): void => {
  router.use('/user', routes);
};
