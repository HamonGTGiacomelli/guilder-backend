import * as core from 'express-serve-static-core';
import { Request } from 'express';
import { Context } from './controllers/AuthenticationController';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AuthenticatedRequest<P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  context: Context;
}
