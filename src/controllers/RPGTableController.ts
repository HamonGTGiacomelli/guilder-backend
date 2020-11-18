import RPGTable, { RPGTableInterface } from '../schemas/RPGTable';
import User from '../schemas/User';

class RPGTableController {
  public async retrieveAll(): Promise<RPGTableInterface[]> {
    return await RPGTable.find().populate('characters');
  }

  public async create(userId: string, rpgTable: RPGTableInterface): Promise<RPGTableInterface> {
    rpgTable = await RPGTable.create({
      user: userId,
      ...rpgTable,
    });
    const user = await User.findOne({ _id: userId }).populate('rpgTables');
    user.rpgTables.push(rpgTable);
    await user.save();
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
    const user = await User.findOne({ _id: userId }).populate('rpgTables');
    user.rpgTables = await user.rpgTables.filter((item) => {
      return item.id != rpgTable._id;
    });
    user.save();
    RPGTable.deleteOne({ _id: rpgTable._id });
    return true;
  }
}

export default new RPGTableController();
