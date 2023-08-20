import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (payload: JwtPayload, expiresIn?: string) =>
    jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: expiresIn || '1d',
    });

export const getDataFromToken = (token: string) => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!,
        ) as JwtPayload;
        return decoded.userId;
    } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
    }
};
