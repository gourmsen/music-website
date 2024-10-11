// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import { sendVerifyEmail } from "../modules/verify-email";

// errors
import { DatabaseError, MissingFieldsError, UserNotFoundError } from "../classes/errors";

export const verifyResend = async (email: string) => {
    try {
        // check for missing fields
        let missingFields: string[] = [];

        if (!email) {
            missingFields.push("email");
        }

        if (missingFields.length) {
            throw new MissingFieldsError(missingFields);
        }

        // check for user
        let user = await userRepo.findUserByEmail(email);

        if (!user) {
            throw new UserNotFoundError(email);
        }

        // send email
        await sendVerifyEmail(user);

        let response: DefaultResponse = {
            message: "Verification email has been sent.",
            payload: {},
        };

        return response;
    } catch (error) {
        if (error instanceof MissingFieldsError || error instanceof UserNotFoundError) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
