// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import { sendVerifyEmail } from "../modules/verify-email";

// errors
import { handleError, MissingFieldsError, UserNotFoundError } from "../classes/errors";

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
            throw new UserNotFoundError();
        }

        // send email
        await sendVerifyEmail(user);

        let response: DefaultResponse = {
            message: "Verification email has been sent.",
            payload: {},
        };

        return response;
    } catch (error) {
        throw handleError(error);
    }
};
