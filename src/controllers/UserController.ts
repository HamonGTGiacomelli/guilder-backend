import User, { UserInterface } from '../schemas/User';
import bcrypt from 'bcrypt';
import { CharacterInterface } from '../schemas/Character';
import { RPGTableInterface } from '../schemas/RPGTable';

class UserController {
  public async findById(userId: string): Promise<UserInterface> {
    const user = await User.findOne({ _id: userId }).populate('characters').populate('rpgTables');
    return user;
  }

  public async findByUsername(username: string): Promise<UserInterface> {
    return await User.findOne({ username });
  }

  public async authenticate(username: string, password: string): Promise<UserInterface> {
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      throw new Error('User name not found!');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid Password!');
    }
    user.password = undefined;

    return user;
  }

  public async create(user: UserInterface): Promise<UserInterface> {
    const userAlreadyExists = await this.findByUsername(user.username);
    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }
    user = await User.create(user);
    user.password = undefined;
    return user;
  }

  public async addCharacter(userId: string, character: CharacterInterface): Promise<UserInterface> {
    const user = await User.findOne({ _id: userId }).populate('characters');
    user.characters.push(character);
    return await user.save();
  }

  public async removeCharacter(userId: string, character: CharacterInterface): Promise<UserInterface> {
    const user = await User.findOne({ _id: userId }).populate('characters');
    user.characters = await user.characters.filter((item) => {
      return item.id != character._id;
    });
    return await user.save();
  }

  public async addRPGTable(userId: string, rpgTable: RPGTableInterface): Promise<UserInterface> {
    const user = await User.findOne({ _id: userId }).populate('rpgTables');
    user.rpgTables.push(rpgTable);
    return await user.save();
  }

  public async removeRPGTable(userId: string, rpgTables: RPGTableInterface): Promise<UserInterface> {
    const user = await User.findOne({ _id: userId }).populate('rpgTables');
    user.rpgTables = await user.rpgTables.filter((item) => {
      return item.id != rpgTables._id;
    });
    return await user.save();
  }
}

export default new UserController();
