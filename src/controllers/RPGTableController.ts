import RPGTable, { RPGTableInterface } from '../schemas/RPGTable';
import User from '../schemas/User';
import CharacterController from './CharacterController';
import UserController from './UserController';

class RPGTableController {
  public async retrieveAll(): Promise<RPGTableInterface[]> {
    return await RPGTable.find().populate('characters');
  }

  public async findById(rpgTableId: string): Promise<RPGTableInterface> {
    return await (await RPGTable.findOne({ _id: rpgTableId })).populated('elegibleCharacters');
  }

  public async create(userId: string, rpgTable: RPGTableInterface): Promise<RPGTableInterface> {
    rpgTable = await RPGTable.create({
      user: userId,
      ...rpgTable,
    });
    UserController.addRPGTable(userId, rpgTable);
    return rpgTable;
  }

  public async update(userId: string, rpgTable: RPGTableInterface): Promise<RPGTableInterface> {
    const user = await User.findOne({ _id: userId });
    rpgTable = await RPGTable.updateOne(
      {
        _id: rpgTable._id,
        user,
      },
      { ...rpgTable }
    );

    return rpgTable;
  }

  public async delete(userId: string, rpgTable: RPGTableInterface): Promise<boolean> {
    UserController.removeRPGTable(userId, rpgTable);
    RPGTable.deleteOne({ _id: rpgTable._id });
    return true;
  }

  public async addCharacterToPendingList(rpgTableId: string, characterId: string): Promise<RPGTableInterface> {
    const rpgTable = await this.findById(rpgTableId);
    const character = await CharacterController.findById(characterId);
    rpgTable.elegibleCharacters.push(character);
    return await rpgTable.save();
  }
}

export default new RPGTableController();
