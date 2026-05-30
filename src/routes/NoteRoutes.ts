import express from 'express';
import { NoteController } from '../controllers/NoteController';
import {UpdateNoteDto} from "../models/dto/UpdateNoteDto";

import {CreateNoteDto} from "../models/dto/CreateNoteDto";
import {validateDto} from "../middlewares/ValidatorMiddleware";

const router = express.Router();

const noteController = new NoteController();

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6858c0f8b4b1d6f48d123456
 *         name:
 *           type: string
 *           example: Work
 *
 *     Note:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6858c0f8b4b1d6f48d999999
 *         title:
 *           type: string
 *           example: Sprint Planning
 *         content:
 *           type: string
 *           example: Review backlog and discuss priorities
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateNoteRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           example: Sprint Planning
 *         content:
 *           type: string
 *           example: Review backlog and discuss priorities
 *         category:
 *           type: string
 *           example: Work
 *
 *     UpdateNoteRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Updated Sprint Planning
 *         content:
 *           type: string
 *           example: Updated meeting agenda
 *         category:
 *           type: string
 *           example: Personal
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Note not found
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated note id
 *           example: 6858c0f8b4b1d6f48d123456
 *         title:
 *           type: string
 *           description: Note title
 *           example: Shopping List
 *         content:
 *           type: string
 *           description: Note content
 *           example: Buy milk, bread and eggs
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *
 *     CreateNoteRequest:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: Shopping List
 *         content:
 *           type: string
 *           example: Buy milk, bread and eggs
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Note not found
 */

/**
 * @swagger
 * /api/v1/notes:
 *   get:
 *     summary: Retrieve all notes
 *     description: Returns all notes stored in the database
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: Notes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   get:
 *     summary: Retrieve a note by ID
 *     description: Returns a single note matching the provided id
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB note id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid note id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notes:
 *   post:
 *     summary: Create a new note
 *     description: Creates and stores a new note in MongoDB
 *     tags:
 *       - Notes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequest'
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     description: Deletes an existing note from the database
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB note id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Note deleted successfully
 *       400:
 *         description: Invalid note id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/v1/notes/categories/{categoryId}:
 *   get:
 *     summary: Retrieve notes by category
 *     description: Returns all notes belonging to a specific category
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Category ID
 *     responses:
 *       200:
 *         description: Notes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid category id
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   patch:
 *     summary: Update an existing note
 *     description: Updates one or more fields of a note
 *     tags:
 *       - Notes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteRequest'
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */

router.get(
    '/',
    noteController.getNotes.bind(noteController)
);

router.get(
    '/:id',
    noteController.getNote.bind(noteController)
);

router.post(
    '/',
    validateDto(CreateNoteDto),
    noteController.createNote.bind(noteController)
);

router.get(
    '/categories/:categoryId',
    noteController.getNotesByCategory
);

router.patch(
    '/:id',
    validateDto(UpdateNoteDto),
    noteController.updateNote
);

router.delete(
    '/:id',
    noteController.deleteNote.bind(noteController)
);

export default router;