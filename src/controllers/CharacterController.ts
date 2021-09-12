import Character, { CharacterInterface } from '../schemas/Character';
import { RPGTableInterface } from '../schemas/RPGTable';
import User from '../schemas/User';
import RPGTableController from './RPGTableController';
import UserController from './UserController';

class CharacterController {
  public async findById(characterId: string): Promise<CharacterInterface> {
    return await Character.findOne({ _id: characterId });
  }

  public async create(userId: string, character: CharacterInterface): Promise<CharacterInterface> {
    character = await Character.create({
      user: userId,
      ...character,
    });
    UserController.addCharacter(userId, character);
    return character;
  }

  public async update(userId: string, character: CharacterInterface): Promise<CharacterInterface> {
    const user = await User.findOne({ _id: userId });
    return await Character.updateOne(
      {
        _id: character._id,
        user,
      },
      { ...character }
    );
  }

  public async delete(userId: string, characterId: string): Promise<boolean> {
    await UserController.removeCharacter(userId, characterId);
    const result = await Character.deleteOne({ _id: characterId });
    if (result.deletedCount > 0) {
      return true;
    }
    return false;
  }

  public async acceptTable(userId: string, characterId: string, tableId: string): Promise<CharacterInterface> {
    const user = await User.findOne({ _id: userId });
    const table = await RPGTableController.findById(tableId);
    const characterData = await Character.findById(characterId);
    if (table.interestedCharacters.includes(characterId)) {
      RPGTableController.addCharacterToTable(characterData, table);
      this.addTableToCharacter(characterData, table);
    } else {
      return await Character.updateOne(
        {
          _id: characterData._id,
          user,
        },
        {
          interestedTables: [table, ...characterData.interestedTables],
        }
      );
    }
  }

  public async rejectTable(userId: string, characterId: string, tableId: string): Promise<CharacterInterface> {
    const user = await User.findOne({ _id: userId });
    const table = await RPGTableController.findById(tableId);
    const characterData = await Character.findById(characterId);
    return await Character.updateOne(
      {
        _id: characterData._id,
        user,
      },
      {
        rejectedTables: [table, ...characterData.rejectedTables],
      }
    );
  }

  public async retrieveAvailableCharacters(userId: string, except: CharacterInterface[]): Promise<CharacterInterface[]> {
    return await Character.find({ user: { $ne: userId }, _id: { $nin: except } });
  }

  public async addTableToCharacter(character: CharacterInterface, table: RPGTableInterface): Promise<CharacterInterface> {
    return await Character.updateOne(
      {
        _id: character._id,
      },
      {
        table,
      }
    );
  }
}

export default new CharacterController();
