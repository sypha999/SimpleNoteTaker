import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {

    private readonly authService =
        new AuthService();

    register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const user =
                await this.authService
                    .register(
                        req.body
                    );

            res.status(201)
                .json(user);

        } catch (error) {
            next(error);
        }
    };

    login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const token =
                await this.authService
                    .login(
                        req.body
                    );

            res.status(200)
                .json(token);

        } catch (error) {
            next(error);
        }
    };
}