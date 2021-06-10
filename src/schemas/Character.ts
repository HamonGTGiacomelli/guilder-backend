import { Schema, model, Document } from 'mongoose';
import { RPGTableInterface } from './RPGTable';
import { UserInterface } from './User';

export interface CharacterInterface extends Document {
  user: UserInterface | string;
  name: string;
  description?: string;
  background?: string;
  table: RPGTableInterface;
  interestedTables?: RPGTableInterface[];
  rejectedTables?: RPGTableInterface[];
}

const CharacterSchema = new Schema(
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
    background: String,
    table: {
      type: Schema.Types.ObjectId,
      ref: 'RPGTable',
    },

    interestedTables: [
      {
        type: Schema.Types.ObjectId,
        ref: 'RPGTable',
      },
    ],
    rejectedTables: [
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

export default model<CharacterInterface>('Character', CharacterSchema);
