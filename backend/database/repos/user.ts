import { db } from "../../modules/database";
import { User, UserInsert, UserUpdate } from "../types/user";

export async function findUserById(id: number) {
    // prettier-ignore
    return await db
        .selectFrom("users")
        .where("id", "=", id)
        .selectAll()
        .executeTakeFirst();
}

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

export async function updateUser(id: number, userUpdate: UserUpdate) {
    // prettier-ignore
    await db
        .updateTable("users")
        .set(userUpdate)
        .where("id", "=", id)
        .execute()
}
