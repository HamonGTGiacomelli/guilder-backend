import { CharacterInterface } from '../schemas/Character';
import RPGTable, { RPGTableInterface } from '../schemas/RPGTable';
import { ScheduleInterface } from '../schemas/Schedule';
import User from '../schemas/User';
import CharacterController from './CharacterController';
import ScheduleController from './ScheduleController';
import UserController from './UserController';

class RPGTableController {
  public async retrieveAll(): Promise<RPGTableInterface[]> {
    return await RPGTable.find().populate('characters');
  }

  public async findById(rpgTableId: string): Promise<RPGTableInterface> {
    return await RPGTable.findOne({ _id: rpgTableId });
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
      rpgTable
    );

    return rpgTable;
  }

  public async delete(userId: string, rpgTableId: string): Promise<boolean> {
    UserController.removeRPGTable(userId, rpgTableId);
    const result = await RPGTable.deleteOne({ _id: rpgTableId });
    if (result.deletedCount > 0) {
      return true;
    }
    return false;
  }

  public async acceptCharacter(userId: string, characterId: string, tableId: string): Promise<RPGTableInterface> {
    const user = await User.findOne({ _id: userId });
    const table = await this.findById(tableId);
    const characterData = await CharacterController.findById(characterId);
    if (characterData.interestedTables.includes(tableId)) {
      this.addCharacterToTable(characterData, table);
      CharacterController.addTableToCharacter(characterData, table);
    } else {
      return await RPGTable.updateOne(
        {
          _id: table._id,
          user,
        },
        {
          interestedCharacters: [characterData, ...table.interestedCharacters],
        }
      );
    }
  }

  public async rejectCharacter(userId: string, characterId: string, tableId: string): Promise<RPGTableInterface> {
    const user = await User.findOne({ _id: userId });
    const table = await this.findById(tableId);
    const characterData = await CharacterController.findById(characterId);
    return await RPGTable.updateOne(
      {
        _id: table._id,
        user,
      },
      {
        rejectedCharacters: [characterData, ...table.rejectedCharacters],
      }
    );
  }

  public async retrieveAvailableTables(userId: string, except: RPGTableInterface[]): Promise<RPGTableInterface[]> {
    return await RPGTable.find({ user: { $ne: userId }, _id: { $nin: except } }).populate('characters');
  }

  public async addCharacterToTable(character: CharacterInterface, table: RPGTableInterface): Promise<RPGTableInterface> {
    return await RPGTable.updateOne(
      {
        _id: table._id,
      },
      {
        characters: [character, ...table.characters],
      }
    );
  }

  public async retrieveSchedules(userId: string, tableId: string) {
    const rpgTable = await RPGTable.findOne({
      _id: tableId,
    }).populate('schedules');

    const { schedules } = rpgTable;

    return schedules;
  }

  public async addSchedule(userId: string, tableId: string, schedule: ScheduleInterface): Promise<RPGTableInterface> {
    const scheduleData = await ScheduleController.create(schedule);
    return await RPGTable.updateOne({ user: userId, _id: tableId }, { $push: { schedules: scheduleData } });
  }

  public async removeSchedule(userId: string, tableId: string, schedule: ScheduleInterface): Promise<RPGTableInterface> {
    // TODO: validate if schedule belongs to the user before deleting
    await ScheduleController.remove(schedule);
    return await RPGTable.updateOne({ user: userId, _id: tableId }, { $pull: { schedules: schedule._id } });
  }
}

export default new RPGTableController();
