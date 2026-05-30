"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const NoteService_1 = require("../services/NoteService");
const Notevalidator_1 = require("../utils/Notevalidator");
const noteService = new NoteService_1.NoteService();
class NoteController {
    async getNotes(req, res, next) {
        try {
            const notes = await noteService.getAllNotes();
            res.status(200).json(notes);
        }
        catch (error) {
            next(error);
        }
    }
    async getNote(req, res, next) {
        try {
            const note = await noteService.getNoteById(req.params.id.toString());
            res.status(200).json(note);
        }
        catch (error) {
            next(error);
        }
    }
    async createNote(req, res, next) {
        try {
            const dto = (0, Notevalidator_1.NoteValidator)(req.body);
            const note = await noteService.createNote(dto);
            res.status(201).json(note);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteNote(req, res, next) {
        try {
            await noteService.deleteNote(req.params.id.toString());
            res.status(200).json({
                message: 'Note deleted successfully'
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NoteController = NoteController;
