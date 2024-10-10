// basics
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import jwt from "jsonwebtoken";

// errors
import { ExpiredJWTError, InvalidJWTError, MissingJWTError } from "../classes/errors";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    JWT_KEY: str(),
    JWT_ISSUER: str(),
    JWT_AUDIENCE: str(),
});
export default env;

export const generateToken = async (payload: any, sub: string, exp: string) => {
    return jwt.sign(payload, env.JWT_KEY, {
        issuer: env.JWT_ISSUER,
        subject: sub,
        audience: env.JWT_AUDIENCE,
        expiresIn: exp,
    });
};

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, env.JWT_KEY, {
            issuer: env.JWT_ISSUER,
            audience: env.JWT_AUDIENCE,
        });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ExpiredJWTError();
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw new InvalidJWTError();
        }
    }
};

export const fetchToken = async (req: any) => {
    let token = req.cookies.token;

    if (!token) {
        throw new MissingJWTError();
    }

    return token;
};
