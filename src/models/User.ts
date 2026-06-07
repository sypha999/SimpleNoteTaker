import mongoose, {
    Document,
    Schema
} from 'mongoose';

import { IUser } from '../interfaces/IUser';

export interface UserDocument
    extends IUser,
        Document {}

const userSchema =
    new Schema<UserDocument>(
        {
            firstName: {
                type: String,
                required: true
            },

            lastName: {
                type: String,
                required: true
            },

            email: {
                type: String,
                unique: true,
                required: true
            },

            password: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }
    );

export default mongoose.model<UserDocument>(
    'User',
    userSchema
);