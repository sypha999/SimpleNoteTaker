import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
    Request,
    Response,
    NextFunction
} from 'express';

type ClassConstructor<T> = {
    new (): T;
};

export function validateDto<T>(
    dtoClass: ClassConstructor<T>
) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        const dto = plainToInstance(
            dtoClass,
            req.body
        );

        const errors = await validate(
            dto as object
        );

        if (errors.length > 0) {
            res.status(400).json({
                message: 'Validation failed',
                errors
            });
            return;
        }

        req.body = dto;

        next();
    };
}