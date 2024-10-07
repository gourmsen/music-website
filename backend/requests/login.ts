// basic
import * as userRepo from "../database/repos/user";
import bcrypt from "bcrypt";

// errors
import { DatabaseError, MissingFieldsError, InvalidCredentialsError } from "../classes/errors";

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

        return user;
    } catch (error) {
        if (error instanceof MissingFieldsError || error instanceof InvalidCredentialsError) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
