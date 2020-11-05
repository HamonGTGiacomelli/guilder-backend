import { Router } from 'express';
import RegisterRoutes from './register';
import AuthRoutes from './authentication';
import UserRoutes from './user';
import CharacterRoutes from './character';

const routes = Router();

RegisterRoutes(routes);
AuthRoutes(routes);
UserRoutes(routes);
CharacterRoutes(routes);

export default routes;
