// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import { verifyToken } from "../modules/jwt";

// errors
import {
    DatabaseError,
    MissingFieldsError,
    ExpiredJWTError,
    InvalidJWTError,
    UserNotFoundError,
} from "../classes/errors";

export const verifyEmail = async (token: string) => {
    try {
        // check for missing fields
        let missingFields: string[] = [];

        if (!token) {
            missingFields.push("token");
        }

        if (missingFields.length) {
            throw new MissingFieldsError(missingFields);
        }

        let decodedToken = await verifyToken(token);

        // get email
        let email;
        if (typeof decodedToken === "object") {
            email = decodedToken.email;
        }

        // check for user
        let user = await userRepo.findUserByEmail(email);

        if (!user) {
            throw new UserNotFoundError(email);
        }

        // update user
        await userRepo.updateUser(user.id, { is_verified: true, updated_at: new Date() });
        user = await userRepo.findUserByEmail(email);

        // prepare response
        let response: DefaultResponse = {
            message: "Email verified successfully",
            payload: {
                user: user,
            },
        };

        return response;
    } catch (error) {
        if (
            error instanceof MissingFieldsError ||
            error instanceof ExpiredJWTError ||
            error instanceof InvalidJWTError ||
            error instanceof UserNotFoundError
        ) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
