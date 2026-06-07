import { IJwtPayload } from '../interfaces/IJwtPayload';
import { AuthenticatedRequest }
    from '../middlewares/AuthMiddleware';

export function isAuthenticated(
    req: AuthenticatedRequest
): req is AuthenticatedRequest & {
    user: IJwtPayload;
} {

    return !!req.user;
}