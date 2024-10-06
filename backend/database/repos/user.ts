import { db } from "../../modules/database";
import { User, UserInsert, UserUpdate } from "../types/user";

export async function findUserByEmail(email: string) {
    // prettier-ignore
    return await db
        .selectFrom("user")
        .where("email", "=", email)
        .selectAll()
        .executeTakeFirst();
}
