import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
}, {
    timestamps: true
});

export default model('User', UserSchema);