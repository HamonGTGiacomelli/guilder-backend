import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface UserInterface extends Document {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserInterface>("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export default model<UserInterface>("User", UserSchema);
