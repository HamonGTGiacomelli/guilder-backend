import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { CharacterInterface, CharacterSchemaName } from './Character';
import { RPGTableInterface, RPGTableSchemaName } from './RPGTable';

export interface UserInterface extends Document {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  characters?: CharacterInterface[];
  rpgTables?: RPGTableInterface[];
}

export const UserSchemaName = 'User';

const UserSchema = new Schema(
  {
    username: {
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
        ref: CharacterSchemaName,
      },
    ],
    rpgTables: [
      {
        type: Schema.Types.ObjectId,
        ref: RPGTableSchemaName,
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

export default model<UserInterface>(UserSchemaName, UserSchema);
