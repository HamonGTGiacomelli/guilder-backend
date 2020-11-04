import { Router } from 'express';
import RegisterRoutes from './register';
import AuthRoutes from './authentication';
import UserRoutes from './user';

const routes = Router();

RegisterRoutes(routes);
AuthRoutes(routes);
UserRoutes(routes);

export default routes;
