import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8787;

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Note Taking API',
            version: '1.0.0',
            description: 'Simple Note Taking API'
        },
        servers: [
            {
                url: 'http://localhost:'+PORT,
            }
        ]
    },
    apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);