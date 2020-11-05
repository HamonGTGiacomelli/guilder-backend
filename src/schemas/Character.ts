import { Schema, model, Document } from 'mongoose';
import { UserInterface } from './User';

export interface CharacterInterface extends Document {
  user: UserInterface;
  name: string;
  description?: string;
  background?: string;
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
  },
  {
    timestamps: true,
  }
);

export default model<CharacterInterface>('Character', CharacterSchema);
