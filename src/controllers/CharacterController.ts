import Character, { CharacterInterface } from '../schemas/Character';
import User, { UserInterface } from '../schemas/User';

class CharacterController {
  public async create(userId: string, character: CharacterInterface): Promise<UserInterface> {
    character = await Character.create({
      user: userId,
      ...character,
    });
    const user = await User.findOne({ _id: userId }).populate('characters');
    user.characters.push(character);
    return user.save();
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
    const user = await User.findOne({ _id: userId }).populate('characters');
    user.characters = await user.characters.filter((item) => {
      return item.id != character._id;
    });
    user.save();
    Character.deleteOne({ _id: character._id });
    return true;
  }
}

export default new CharacterController();
