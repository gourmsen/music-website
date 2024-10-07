import { db } from "../../modules/database";
import { User, UserInsert, UserUpdate } from "../types/user";

export async function findUserByEmail(email: string) {
    // prettier-ignore
    return await db
        .selectFrom("users")
        .where("email", "=", email)
        .selectAll()
        .executeTakeFirst();
}

export async function createUser(userInsert: UserInsert) {
    // prettier-ignore
    return await db
        .insertInto("users")
        .values(userInsert)
        .returningAll()
        .executeTakeFirstOrThrow();
}
