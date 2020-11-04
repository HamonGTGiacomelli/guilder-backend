import {Router} from 'express';
import UserRoutes from './users';
import AuthRoutes from './authentication';

const routes = Router();

UserRoutes(routes);
AuthRoutes(routes);

export default routes;