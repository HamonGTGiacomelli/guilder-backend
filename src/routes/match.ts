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
  '/characterId/:characterId/availableTables',
  async (req: AuthenticatedRequest<{ characterId: string }, {}, {}>, res: Response): Promise<Response> => {
    console.log('GET match/availableTables');
    const { userId } = req.context;
    const { characterId } = req.params;
    const { interestedTables = [], rejectedTables = [] } = await CharacterController.findById(characterId);
    const rpgTables = await RPGTableController.retrieveAvailableTables(userId, [...interestedTables, ...rejectedTables]);
    return res.send({ rpgTables });
  }
);

routes.get(
  '/tableId/:tableId/availableCharacters',
  async (req: AuthenticatedRequest<{ tableId: string }, {}, {}>, res: Response): Promise<Response> => {
    console.log('GET match/availableCharacters');
    const { userId } = req.context;
    const { tableId } = req.params;
    const { interestedCharacters = [], rejectedCharacters = [] } = await RPGTableController.findById(tableId);
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
    console.log('POST match/characterAcceptTable');
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
    console.log('POST match/characterRejectTable');
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
    console.log('POST match/tableAcceptCharacter');
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
    console.log('POST match/tableRejectCharacter');
    const { userId } = req.context;
    const { character, table } = req.body;
    const tableResult = await RPGTableController.rejectCharacter(userId, character._id, table._id);
    return res.send({ table: tableResult });
  }
);

export default (router: Router): void => {
  router.use('/match', routes);
};
