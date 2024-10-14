// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import { UserInsert } from "../database/types/user";
import bcrypt from "bcrypt";
import { sendVerifyEmail } from "../modules/verify-email";

// errors
import { handleError, MissingFieldsError, UserAlreadyExistsError } from "../classes/errors";

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
            throw new UserAlreadyExistsError();
        }

        userInsert.password = await bcrypt.hash(userInsert.password, 10);

        user = await userRepo.createUser(userInsert);

        // send verification email
        await sendVerifyEmail(user);

        let response: DefaultResponse = {
            message: "User registered successfully",
            payload: {
                user: user,
            },
        };

        return response;
    } catch (error) {
        throw handleError(error);
    }
};
