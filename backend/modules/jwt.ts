// basics
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import jwt from "jsonwebtoken";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    JWT_KEY: str(),
});
export default env;

export const generateToken = async (payload: any) => {
    return jwt.sign(payload, env.JWT_KEY, {
        expiresIn: "1h",
        issuer: "music_website",
        audience: "music_website_users",
    });
};
