// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";

// errors
import { DatabaseError, MissingFieldsError, UserNotFoundError } from "../classes/errors";

export const viewUser = async (email: string) => {
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

        // prepare response
        let response: DefaultResponse = {
            message: "User retrieved successfully",
            payload: {
                user: user,
            },
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
