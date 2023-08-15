import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (payload: JwtPayload, expiresIn?: string) =>
    jwt.sign(payload, process.env.JWT_secret!, {
        expiresIn: expiresIn || '1d',
    });
