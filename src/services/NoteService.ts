import mongoose from 'mongoose';

import Note from '../models/Note';
import { AppError } from '../errors/AppError';

import { CreateNoteDto } from '../models/dto/CreateNoteDto';
import { UpdateNoteDto } from '../models/dto/UpdateNoteDto';

import { CategoryService } from './CategoryService';

export class NoteService {

    private readonly categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    async getAllNotes() {
        return Note.find()
            .populate('category');
    }

    async getNoteById(id: string) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError(
                'Invalid note id',
                400
            );
        }

        const note = await Note
            .findById(id)
            .populate('category');

        if (!note) {
            throw new AppError(
                'Note not found',
                404
            );
        }

        return note;
    }

    async createNote(
        noteData: CreateNoteDto
    ) {

        const existingNote =
            await Note.findOne({
                title: noteData.title
            });

        if (existingNote) {
            throw new AppError(
                'A note with this title already exists, please try a different one.',
                409
            );
        }

        const category =
            await this.categoryService
                .findOrCreateCategory(
                    noteData.category
                );

        const note = await Note.create({
            title: noteData.title,
            content: noteData.content,
            category: category._id
        });

        return Note.findById(note._id)
            .populate('category');
    }

    async getNotesByCategory(
        categoryId: string
    ) {

        if (
            !mongoose.Types.ObjectId.isValid(
                categoryId
            )
        ) {
            throw new AppError(
                'Invalid category id',
                400
            );
        }

        return Note.find({
            category: categoryId
        }).populate('category');
    }

    async updateNote(
        id: string,
        dto: UpdateNoteDto
    ) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError(
                'Invalid note id',
                400
            );
        }

        const updateData: Record<string, any> = {};

        if (dto.title) {
            updateData.title = dto.title;
        }

        if (dto.content) {
            updateData.content = dto.content;
        }

        if (dto.category) {
            const category =
                await this.categoryService
                    .findOrCreateCategory(
                        dto.category
                    );

            updateData.category =
                category._id;
        }

        if (
            Object.keys(updateData).length === 0
        ) {
            throw new AppError(
                'No update fields provided',
                400
            );
        }

        const note =
            await Note.findByIdAndUpdate(
                id,
                {
                    $set: updateData
                },
                {
                    new: true,
                    runValidators: true
                }
            ).populate('category');

        if (!note) {
            throw new AppError(
                'Note not found',
                404
            );
        }

        return note;
    }

    async deleteNote(
        id: string
    ) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError(
                'Invalid note id',
                400
            );
        }

        const note =
            await Note.findByIdAndDelete(id);

        if (!note) {
            throw new AppError(
                'Note not found',
                404
            );
        }

        return {
            success: true,
            message: 'Note deleted successfully'
        };
    }
}