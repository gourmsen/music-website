// basic
import { DefaultResponse } from "../interfaces/default-response";
import * as userRepo from "../database/repos/user";
import { verifyToken } from "../modules/jwt";
import { UserUpdate } from "../database/types/user";
import bcrypt from "bcrypt";

// errors
import {
    DatabaseError,
    MissingFieldsError,
    InvalidJWTError,
    ExpiredJWTError,
    UserNotFoundError,
} from "../classes/errors";

export const updateUser = async (token: string, data: any) => {
    try {
        // check for missing fields
        let missingFields: string[] = [];

        if (!token) {
            missingFields.push("token");
        }

        if (!data) {
            missingFields.push("data");
        }

        if (missingFields.length) {
            throw new MissingFieldsError(missingFields);
        }

        // verify token
        let decodedToken = await verifyToken(token);

        // get id
        let id = typeof decodedToken === "object" ? Number(decodedToken.sub) : undefined;

        // check for user
        let user = await userRepo.findUserById(id!);

        if (!user) {
            throw new UserNotFoundError();
        }

        // fill fields
        let userUpdate: UserUpdate = {};

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        userUpdate.email = data.email || user.email;
        userUpdate.password = data.password || user.password;

        // update user
        await userRepo.updateUser(id!, userUpdate);
        user = await userRepo.findUserById(id!);

        // prepare response
        let response: DefaultResponse = {
            message: "User updated successfully",
            payload: {
                user: user,
            },
        };

        return response;
    } catch (error) {
        if (
            error instanceof MissingFieldsError ||
            error instanceof InvalidJWTError ||
            error instanceof ExpiredJWTError ||
            error instanceof UserNotFoundError
        ) {
            throw error;
        } else {
            throw new DatabaseError();
        }
    }
};
