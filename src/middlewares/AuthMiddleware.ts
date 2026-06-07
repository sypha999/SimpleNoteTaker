import {
    Request,
    RequestHandler
} from 'express';
import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/IJwtPayload';

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authenticate: RequestHandler = (
    req,
    res,
    next
) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            message: 'Missing token'
        });
        return;
    }

    const token = authHeader.replace(
        'Bearer ',
        ''
    );

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        (req as AuthenticatedRequest).user =
            payload as IJwtPayload;

        next();

    } catch {

        res.status(401).json({
            message: 'Invalid token'
        });
    }
};