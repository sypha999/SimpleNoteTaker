"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteValidator = void 0;
const CreateNoteDto_1 = require("../models/dto/CreateNoteDto");
const AppError_1 = require("../errors/AppError");
const NoteValidator = (body) => {
    const { title, content } = body;
    if (!title || typeof title !== 'string') {
        throw new AppError_1.AppError('Title is required', 400);
    }
    if (!content || typeof content !== 'string') {
        throw new AppError_1.AppError('Content is required', 400);
    }
    return new CreateNoteDto_1.CreateNoteDto(title.trim(), content.trim());
};
exports.NoteValidator = NoteValidator;
