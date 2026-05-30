"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const NoteRoutes_1 = __importDefault(require("./routes/NoteRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Swagger_1 = require("./config/Swagger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/notes', NoteRoutes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(Swagger_1.swaggerSpec));
console.log(Swagger_1.swaggerSpec);
app.use(ErrorMiddleware_1.errorHandler);
exports.default = app;
