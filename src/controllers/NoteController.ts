import { Request, Response, NextFunction } from 'express';
import { NoteService } from '../services/NoteService';
import { getAuthenticatedUserId } from '../utils/AuthUtil';
const noteService = new NoteService();

export class NoteController {

    async getNotes(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const userId =
                getAuthenticatedUserId(
                    req
                );

            const notes =
                await noteService
                    .getAllNotes(
                        userId
                    );

            res.status(200)
                .json(notes);

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

            const userId =
                getAuthenticatedUserId(
                    req
                );

            const note =
                await noteService
                    .getNoteById(
                        req.params.id.toString(),
                        userId
                    );

            res.status(200)
                .json(note);

        } catch (error) {

            next(error);
        }
    }

    async createNote(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const userId =
                getAuthenticatedUserId(
                    req
                );

            const note =
                await noteService
                    .createNote(
                        req.body,
                        userId
                    );

            res.status(201)
                .json(note);

        } catch (error) {

            next(error);
        }
    }

    public getNotesByCategory =
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {

            try {

                const userId =
                    getAuthenticatedUserId(
                        req
                    );

                const notes =
                    await noteService
                        .getNotesByCategory(
                            req.params
                                .categoryId
                                .toString(),
                            userId
                        );

                res.status(200)
                    .json(notes);

            } catch (error) {

                next(error);
            }
        };

    public updateNote =
        async (
            req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {

            try {

                const userId =
                    getAuthenticatedUserId(
                        req
                    );

                const note =
                    await noteService
                        .updateNote(
                            req.params
                                .id
                                .toString(),
                            req.body,
                            userId
                        );

                res.status(200)
                    .json(note);

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

            const userId =
                getAuthenticatedUserId(
                    req
                );

            await noteService
                .deleteNote(
                    req.params
                        .id
                        .toString(),
                    userId
                );

            res.status(200)
                .json({
                    message:
                        'Note deleted successfully'
                });

        } catch (error) {

            next(error);
        }
    }
}





