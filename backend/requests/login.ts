// basic
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import bcrypt from "bcrypt";
import { generateToken } from "../modules/jwt";

// errors
import { handleError, InvalidCredentialsError, MissingFieldsError, UserNotVerifiedError } from "../classes/errors";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    JWT_EXP_LOGIN: str(),
});
export default env;

export const login = async (email: string, password: string) => {
    try {
        // check for missing fields
        let missingFields: string[] = [];

        if (!email) {
            missingFields.push("email");
        }

        if (!password) {
            missingFields.push("password");
        }

        if (missingFields.length) {
            throw new MissingFieldsError(missingFields);
        }

        // check for user
        let user = await userRepo.findUserByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        // check for password
        let match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new InvalidCredentialsError();
        }

        // check for verified
        if (!user.is_verified) {
            throw new UserNotVerifiedError();
        }

        // generate token
        let token = await generateToken(
            {
                email: user.email,
                role: user.role,
            },
            user.id.toString(),
            env.JWT_EXP_LOGIN
        );

        // prepare response
        let response: DefaultResponse = {
            message: "Login successful",
            payload: {
                token: token,
            },
        };

        return response;
    } catch (error) {
        throw handleError(error);
    }
};
