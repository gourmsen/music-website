// basic
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import { UserInsert } from "../database/types/user";
import bcrypt from "bcrypt";
import { sendEmail } from "../modules/email";
import { generateToken } from "../modules/jwt";

// errors
import { DatabaseError, MissingFieldsError, UserAlreadyExistsError } from "../classes/errors";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    JWT_EXP_EMAIL: str(),
});
export default env;

export const register = async (userInsert: UserInsert) => {
    try {
        let missingFields: string[] = [];

        if (!userInsert.email) {
            missingFields.push("email");
        }

        if (!userInsert.password) {
            missingFields.push("password");
        }

        if (missingFields.length) {
            throw new MissingFieldsError(missingFields);
        }

        let user = await userRepo.findUserByEmail(userInsert.email);

        if (user) {
            throw new UserAlreadyExistsError(userInsert.email);
        }

        userInsert.password = await bcrypt.hash(userInsert.password, 10);

        user = await userRepo.createUser(userInsert);

        let response: DefaultResponse = {
            message: "User registered successfully",
            payload: {
                user: user,
            },
        };

        // generate token
        let token = await generateToken(
            {
                email: user.email,
                role: user.role,
            },
            user.id.toString(),
            env.JWT_EXP_EMAIL
        );

        let verifyLink = process.env.FRONTEND_URL + "/verify?token=" + token;

        // send email
        let subject = "Email Verification";
        let text = "Please verify your email with this link: " + verifyLink;
        let html = `<p>Please verify your email with <a href="${verifyLink}">this link</a></p>`;
        await sendEmail(user.email, subject, text, html);

        return response;
    } catch (error) {
        if (error instanceof MissingFieldsError || error instanceof UserAlreadyExistsError) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
