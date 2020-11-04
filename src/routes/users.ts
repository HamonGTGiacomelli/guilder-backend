/* eslint-disable @typescript-eslint/ban-types */
import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserInterface } from '../schemas/User';

const routes = Router();

routes.get(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const users = await UserController.retrieveAll();
    return res.send({ users });
  }
);

routes.post(
  '/',
  async (req: Request<{}, {}, UserInterface>, res: Response): Promise<Response> => {
    const user = req.body;
    try {
      const result = await UserController.create(user);
      return res.send(result);
    } catch (err) {
      const ex: Error = err;
      res.send({ error: ex.message });
    }
  }
);

export default (router: Router): void => {
  router.use('/users', routes);
};
