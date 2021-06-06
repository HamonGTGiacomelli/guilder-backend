import { Schema, model, Document } from 'mongoose';
import { CharacterInterface } from './Character';
import { UserInterface } from './User';

export interface RPGTableInterface extends Document {
  user: UserInterface | string;
  name: string;
  description?: string;
  characters: CharacterInterface[];
  interestedCharacters: CharacterInterface[];
  rejectedCharacters: CharacterInterface[];
}

const RPGTableSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    characters: {
      type: Schema.Types.ObjectId,
      ref: 'Character',
    },
    interestedCharacters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
    rejectedCharacters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<RPGTableInterface>('RPGTable', RPGTableSchema);
