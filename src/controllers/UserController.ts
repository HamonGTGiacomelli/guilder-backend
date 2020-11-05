import User, { UserInterface } from '../schemas/User';
import bcrypt from 'bcrypt';

class UserController {
  public async retrieveOne(userId: string): Promise<UserInterface> {
    const user = await User.findOne({ _id: userId }).populate('characters');
    return user;
  }

  public async userAlreadyExists(userName: string): Promise<boolean> {
    const user = await User.findOne({ userName });
    if (user) {
      return true;
    }
    return false;
  }

  public async authenticate(userName: string, password: string): Promise<UserInterface> {
    const user = await User.findOne({ userName }).select('+password');
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
    const userAlreadyExists = await this.userAlreadyExists(user.userName);
    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }
    user = await User.create(user);
    user.password = undefined;
    return user;
  }
}

export default new UserController();
