import { AppError } from '../errors/AppError';
import { AuthenticatedRequest } from '../middlewares/AuthMiddleware';

export function getAuthenticatedUserId(req: AuthenticatedRequest): string {
    if (!req.user) {
        throw new AppError(
            'Unauthorized',
            401
        );
    }
    return req.user.userId;
}