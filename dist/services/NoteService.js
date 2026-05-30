"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const AppError_1 = require("../errors/AppError");
class NoteService {
    async getAllNotes() {
        return Note_1.default.find();
    }
    async getNoteById(id) {
        const note = await Note_1.default.findById(id);
        if (!note) {
            throw new AppError_1.AppError('Note not found', 404);
        }
        return note;
    }
    async createNote(noteData) {
        return Note_1.default.create(noteData);
    }
    async deleteNote(id) {
        const note = await Note_1.default.findByIdAndDelete(id);
        if (!note) {
            throw new AppError_1.AppError('Note not found', 404);
        }
    }
}
exports.NoteService = NoteService;
