
import mongoose from "mongoose";

export interface INote {
    title: string;
    content: string;
    category: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}