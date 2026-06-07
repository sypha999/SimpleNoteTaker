import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { RegisterDto } from '../models/dto/RegisterDto';
import User from '../models/User';
import { LoginDto } from '../models/dto/LoginDto';

export class AuthService {

    async register( dto: RegisterDto ) {
        const existingUser =
            await User.findOne({
                email: dto.email
            });

        if (existingUser) {
            throw new AppError(
                'User already exists',
                409
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                dto.password,
                10
            );

        const user =
            await User.create({
                ...dto,
                password:
                    hashedPassword
            });


        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
    }

    async login(
        dto: LoginDto
    ) {

        const user =
            await User.findOne({
                email: dto.email
            });

        if (!user) {
            throw new AppError(
                'Invalid credentials',
                401
            );
        }

        const matches =
            await bcrypt.compare(
                dto.password,
                user.password
            );

        if (!matches) {
            throw new AppError(
                'Invalid credentials',
                401
            );
        }

        const token =
            jwt.sign(
                {
                    userId:
                        user._id.toString(),
                    email:
                        user.email
                },
                process.env.JWT_SECRET!,
                {
                    expiresIn: '30m'
                }
            );

        return {
            token
        };
    }
}