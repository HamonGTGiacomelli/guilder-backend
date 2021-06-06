/* eslint-disable @typescript-eslint/ban-types */
import { Router, Response } from 'express';
import { validateTokenAuth } from '../middlewares/validateTokenAuth';
import { AuthenticatedRequest } from '../types';
import RPGTableController from '../controllers/RPGTableController';
import { CharacterInterface } from '../schemas/Character';
import CharacterController from '../controllers/CharacterController';
import { RPGTableInterface } from '../schemas/RPGTable';

const routes = Router();

routes.use(validateTokenAuth);

routes.get(
  '/availableTable',
  async (req: AuthenticatedRequest<{}, {}, CharacterInterface>, res: Response): Promise<Response> => {
    const { userId } = req.context;
    const { _id } = req.body;
    const { interestedTables = [], rejectedTables = [] } = await CharacterController.findById(_id);
    const rpgTables = await RPGTableController.retrieveAvailableTables(userId, [...interestedTables, ...rejectedTables]);
    return res.send({ rpgTables });
  }
);

routes.get(
  '/availableCharacters',
  async (req: AuthenticatedRequest<{}, {}, CharacterInterface>, res: Response): Promise<Response> => {
    const { userId } = req.context;
    const { _id } = req.body;
    const { interestedCharacters = [], rejectedCharacters = [] } = await RPGTableController.findById(_id);
    const characters = await CharacterController.retrieveAvailableCharacters(userId, [
      ...interestedCharacters,
      ...rejectedCharacters,
    ]);
    return res.send({ characters });
  }
);

routes.post(
  '/characterAcceptTable',
  async (
    req: AuthenticatedRequest<{}, {}, { character: CharacterInterface; table: RPGTableInterface }>,
    res: Response
  ): Promise<Response> => {
    const { userId } = req.context;
    const { character, table } = req.body;
    const characterResult = await CharacterController.acceptTable(userId, character._id, table._id);
    return res.send({ character: characterResult });
  }
);

routes.post(
  '/characterRejectTable',
  async (
    req: AuthenticatedRequest<{}, {}, { character: CharacterInterface; table: RPGTableInterface }>,
    res: Response
  ): Promise<Response> => {
    const { userId } = req.context;
    const { character, table } = req.body;
    const characterResult = await CharacterController.rejectTable(userId, character._id, table._id);
    return res.send({ character: characterResult });
  }
);

routes.post(
  '/tableAcceptCharacter',
  async (
    req: AuthenticatedRequest<{}, {}, { character: CharacterInterface; table: RPGTableInterface }>,
    res: Response
  ): Promise<Response> => {
    const { userId } = req.context;
    const { character, table } = req.body;
    const tableResult = await RPGTableController.acceptCharacter(userId, character._id, table._id);
    return res.send({ table: tableResult });
  }
);

routes.post(
  '/tableRejectCharacter',
  async (
    req: AuthenticatedRequest<{}, {}, { character: CharacterInterface; table: RPGTableInterface }>,
    res: Response
  ): Promise<Response> => {
    const { userId } = req.context;
    const { character, table } = req.body;
    const tableResult = await RPGTableController.rejectCharacter(userId, character._id, table._id);
    return res.send({ table: tableResult });
  }
);

export default (router: Router): void => {
  router.use('/match', routes);
};
