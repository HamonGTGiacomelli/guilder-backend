/* eslint-disable @typescript-eslint/ban-types */
import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserInterface } from '../schemas/User';
import AuthenticationController from '../controllers/AuthenticationController';

const routes = Router();

routes.post(
  '/',
  async (req: Request<{}, {}, UserInterface>, res: Response): Promise<Response> => {
    const requestedUser = req.body;
    try {
      const user = await UserController.create(requestedUser);
      const token = AuthenticationController.generateToken(user.id);
      return res.send({ user, token });
    } catch (err) {
      const ex: Error = err;
      res.send({ error: ex.message });
    }
  }
);

export default (router: Router): void => {
  router.use('/register', routes);
};
