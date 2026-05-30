"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8787;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Note Taking API',
            version: '1.0.0',
            description: 'Simple Note Taking API'
        },
        servers: [
            {
                url: 'http://localhost:' + PORT,
            }
        ]
    },
    apis: ['./routes/*.ts']
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
