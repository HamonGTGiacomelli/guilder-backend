import { Document, model, Schema } from 'mongoose';
import { CharacterInterface } from './Character';

export interface ScheduleInterface extends Document {
  date: string;
  accepted: (CharacterInterface | string)[];
  rejected: (CharacterInterface | string)[];
}

const ScheduleSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    accepted: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Character',
      },
    ],
    rejected: [
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

export default model<ScheduleInterface>('Schedule', ScheduleSchema);
