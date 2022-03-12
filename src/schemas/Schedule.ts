import { Document, model, Schema } from 'mongoose';
import { CharacterInterface, CharacterSchemaName } from './Character';

export interface ScheduleInterface extends Document {
  date: string;
  accepted: (CharacterInterface | string)[];
  rejected: (CharacterInterface | string)[];
}

export const ScheduleSchemaName = 'Schedule'

const ScheduleSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    accepted: [
      {
        type: Schema.Types.ObjectId,
        ref: CharacterSchemaName,
      },
    ],
    rejected: [
      {
        type: Schema.Types.ObjectId,
        ref: CharacterSchemaName,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<ScheduleInterface>(ScheduleSchemaName, ScheduleSchema);
