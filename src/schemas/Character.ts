import { Schema, model, Document } from 'mongoose';
import { RPGTableInterface, RPGTableSchemaName } from './RPGTable';
import { UserInterface, UserSchemaName } from './User';

export interface CharacterInterface extends Document {
  user: UserInterface | string;
  name: string;
  description?: string;
  background?: string;
  table: RPGTableInterface | string;
  interestedTables?: (RPGTableInterface | string)[];
  rejectedTables?: (RPGTableInterface | string)[];
}

export const CharacterSchemaName = 'Character'

const CharacterSchema = new Schema(
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
    background: String,
    table: {
      type: Schema.Types.ObjectId,
      ref: RPGTableSchemaName,
    },
    interestedTables: [
      {
        type: Schema.Types.ObjectId,
        ref: RPGTableSchemaName,
      },
    ],
    rejectedTables: [
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

export default model<CharacterInterface>(CharacterSchemaName, CharacterSchema);
