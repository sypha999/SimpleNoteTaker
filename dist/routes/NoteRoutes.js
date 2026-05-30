"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NoteController_1 = require("../controllers/NoteController");
const router = express_1.default.Router();
const noteController = new NoteController_1.NoteController();
/**
 * @swagger
 * /api/v1/notes:
 *   get:
 *     summary: Retrieve all notes
 *     tags:
 *       - Notes
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/', noteController.getNotes.bind(noteController));
router.get('/:id', noteController.getNote.bind(noteController));
router.post('/', noteController.createNote.bind(noteController));
router.delete('/:id', noteController.deleteNote.bind(noteController));
exports.default = router;
