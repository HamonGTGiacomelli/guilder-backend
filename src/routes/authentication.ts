/* eslint-disable @typescript-eslint/ban-types */
import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserInterface } from '../schemas/User';

const routes = Router();

routes.post('/', async (req: Request<{}, {}, UserInterface>, res: Response) => {
  const user = req.body;
  const { userName, password } = user;
  try {
    const result = await UserController.authenticate(userName, password);
    res.send(result);
  } catch (err) {
    const ex: Error = err;
    res.send({ error: ex.message });
  }
});

export default (router: Router): void => {
  router.use('/auth', routes);
};
