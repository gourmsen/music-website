// basic
import * as userRepo from "../database/repos/user";

// errors
import { DatabaseError, UserNotFoundError } from "../classes/errors";

export const viewUser = async (email: string) => {
    try {
        let user = await userRepo.findUserByEmail(email);

        if (!user) {
            throw new UserNotFoundError(email);
        }

        return user;
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
