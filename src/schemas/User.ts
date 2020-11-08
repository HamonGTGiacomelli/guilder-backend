import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { CharacterInterface } from './Character';
import { RPGTableInterface } from './RPGTable';

export interface UserInterface extends Document {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  characters?: CharacterInterface[];
  rpgTables?: RPGTableInterface[];
}

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    characters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
    rpgTables: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RPGTable',
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserInterface>('save', async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

export default model<UserInterface>('User', UserSchema);
