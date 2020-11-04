import { NextFunction, Response } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import { AuthenticatedRequest } from '../types';

const validateTokenAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;
  const context = AuthenticationController.validateToken(token);

  if (context) {
    req.context = context;
    next();
  } else {
    res.status(401).send({ error: 'Unauthorized!' });
  }
};

export default validateTokenAuth;
