/* eslint-disable @typescript-eslint/ban-types */
import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserInterface } from '../schemas/User';
import AuthenticationController from '../controllers/AuthenticationController';

const routes = Router();

routes.post('/', async (req: Request<{}, {}, UserInterface>, res: Response) => {
  console.log('POST authentication');
  const user = req.body;
  const { username, password } = user;
  try {
    const user = await UserController.authenticate(username, password);
    const token = AuthenticationController.generateToken(user.id);
    res.send({ user, token });
  } catch (err) {
    const ex: Error = err;
    res.send({ error: ex.message });
  }
});

export default (router: Router): void => {
  router.use('/authentication', routes);
};
