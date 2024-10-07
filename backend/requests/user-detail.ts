// basic
import * as userRepo from "../database/repos/user";

// errors
import { DatabaseError, MissingFieldsError, UserNotFoundError } from "../classes/errors";

export const viewUser = async (email: string) => {
    try {
        let missingFields: string[] = [];

        if (!email) {
            missingFields.push("email");
        }

        if (missingFields.length) {
            throw new MissingFieldsError(missingFields);
        }

        let user = await userRepo.findUserByEmail(email);

        if (!user) {
            throw new UserNotFoundError(email);
        }

        return user;
    } catch (error) {
        if (error instanceof MissingFieldsError || error instanceof UserNotFoundError) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
