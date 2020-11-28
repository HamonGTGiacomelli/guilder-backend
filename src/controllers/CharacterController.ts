import Character, { CharacterInterface } from '../schemas/Character';
import User from '../schemas/User';
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
    character = await Character.updateOne(
      {
        _id: character._id,
        user,
      },
      { ...character }
    );

    return character;
  }

  public async delete(userId: string, character: CharacterInterface): Promise<boolean> {
    await UserController.removeCharacter(userId, character);
    Character.deleteOne({ _id: character._id });
    return true;
  }
}

export default new CharacterController();
