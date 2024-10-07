// basic
import * as userRepo from "../database/repos/user";
import { UserInsert } from "../database/types/user";

// errors
import { DatabaseError, MissingFieldsError, UserAlreadyExistsError } from "../classes/errors";

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

        return await userRepo.createUser(userInsert);
    } catch (error) {
        if (error instanceof MissingFieldsError || error instanceof UserAlreadyExistsError) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
