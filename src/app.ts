import express from 'express';
import { errorHandler } from './middlewares/ErrorMiddleware';
import noteRoutes from './routes/NoteRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/Swagger';
import {logger} from "./middlewares/LoggingMiddleware";

const app = express();

app.use(express.json());
app.use(logger);
app.use('/api/v1/notes', noteRoutes);
app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);
export default app;