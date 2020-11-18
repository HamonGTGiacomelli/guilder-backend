import { Router } from 'express';
import RegisterRoutes from './register';
import AuthRoutes from './authentication';
import UserRoutes from './user';
import CharacterRoutes from './character';
import RPGTableRoutes from './rpgTable';
import MatchRoutes from './match';

const routes = Router();

RegisterRoutes(routes);
AuthRoutes(routes);
UserRoutes(routes);
CharacterRoutes(routes);
RPGTableRoutes(routes);
MatchRoutes(routes);

export default routes;
