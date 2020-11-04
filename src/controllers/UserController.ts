import User, { UserInterface } from '../schemas/User';
import bcrypt from 'bcrypt';

class UserController {
  public async retrieveAll(): Promise<UserInterface[]> {
    const users = await User.find();
    return users;
  }

  public async retrieveOne(userName: string): Promise<UserInterface> {
    const user = await User.findOne({ userName });
    return user;
  }

  public async authenticate(userName: string, password: string): Promise<UserInterface> {
    const user = await User.findOne({ userName }).select('+password');
    if (!user) {
      throw new Error('User name nor found!');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid Password!');
    }
    return user;
  }

  public async create(user: UserInterface): Promise<UserInterface> {
    const userAlreadyExists = await this.retrieveOne(user.userName);
    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }
    user = await User.create(user);
    return user;
  }
}

export default new UserController();
