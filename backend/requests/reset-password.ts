// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import { sendResetEmail } from "../modules/reset-email";

// errors
import { handleError, MissingFieldsError, UserNotFoundError } from "../classes/errors";

export const resetPassword = async (email: string) => {
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

        // send reset email
        await sendResetEmail(user);

        // prepare response
        let response: DefaultResponse = {
            message: "Reset email sent",
            payload: {},
        };

        return response;
    } catch (error) {
        throw handleError(error);
    }
};
