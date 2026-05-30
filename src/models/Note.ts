import mongoose, { Schema, Document } from 'mongoose';
import { INote } from '../interfaces/INote';

export interface NoteDocument extends INote, Document {}

const noteSchema = new Schema<NoteDocument>(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    },

    {
        timestamps: true
    }
);

export default mongoose.model<NoteDocument>(
    'Note',
    noteSchema
);