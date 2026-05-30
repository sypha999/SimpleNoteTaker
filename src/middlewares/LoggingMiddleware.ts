import {
    Request,
    Response,
    NextFunction
} from 'express';

interface LogEntry {
    method: string;
    url: string;
    timestamp: string;
}

export const logger = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    const log: LogEntry = {
        method: req.method,
        url: req.originalUrl,
        timestamp:
            new Date().toISOString()
    };

    console.log(log);
    next();
};