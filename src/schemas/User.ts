import {Schema, model, Document} from 'mongoose';

interface UserInterface extends Document {
    userName?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
}

const UserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
}, {
    timestamps: true
});

export default model<UserInterface>('User', UserSchema);