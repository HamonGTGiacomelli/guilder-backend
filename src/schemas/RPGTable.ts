import { Schema, model, Document } from 'mongoose';
import { CharacterInterface } from './Character';
import { ScheduleInterface } from './Schedule';
import { UserInterface } from './User';

export interface RPGTableInterface extends Document {
  user: UserInterface | string;
  name: string;
  description?: string;
  maxCharacters: number;
  characters: (CharacterInterface | string)[];
  schedules: (ScheduleInterface | string)[];
  interestedCharacters: (CharacterInterface | string)[];
  rejectedCharacters: (CharacterInterface | string)[];
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
    maxCharacters: Number,
    characters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
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
    schedules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<RPGTableInterface>('RPGTable', RPGTableSchema);
