import { Request, Response, NextFunction } from 'express';
import { NoteService } from '../services/NoteService';

const noteService = new NoteService();

export class NoteController {

    async getNotes(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const notes = await noteService.getAllNotes();

            res.status(200).json(notes);
        } catch (error) {
            next(error);
        }
    }

    async getNote(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const note =
                await noteService.getNoteById(req.params.id.toString());

            res.status(200).json(note);
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    async createNote(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const note =
                await noteService.createNote(req.body);

            res.status(201).json(note);

        } catch (error) {
            next(error);
        }
    }

    public getNotesByCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            const notes =
                await noteService
                    .getNotesByCategory(
                        req.params.categoryId.toString(),
                    );

            res.status(200).json(notes);

        } catch (error) {
            next(error);
        }
    };


    public updateNote = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            const note =
                await noteService.updateNote(
                    req.params.id.toString(),
                    req.body
                );

            res.status(200).json(note);

        } catch (error) {
            next(error);
        }
    };

    async deleteNote(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            await noteService.deleteNote(req.params.id.toString());

            res.status(200).json({
                message: 'Note deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}