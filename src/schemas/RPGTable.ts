import { Schema, model, Document } from 'mongoose';
import { CharacterInterface, CharacterSchemaName } from './Character';
import { ScheduleInterface, ScheduleSchemaName } from './Schedule';
import { UserInterface, UserSchemaName } from './User';

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

export const RPGTableSchemaName = 'RPGTable'

const RPGTableSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: UserSchemaName,
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
        ref: CharacterSchemaName,
      },
    ],
    interestedCharacters: [
      {
        type: Schema.Types.ObjectId,
        ref: CharacterSchemaName,
      },
    ],
    rejectedCharacters: [
      {
        type: Schema.Types.ObjectId,
        ref: CharacterSchemaName,
      },
    ],
    schedules: [
      {
        type: Schema.Types.ObjectId,
        ref: ScheduleSchemaName,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<RPGTableInterface>(RPGTableSchemaName, RPGTableSchema);
