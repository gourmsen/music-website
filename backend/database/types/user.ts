import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface User {
    id: Generated<number>;
    email: ColumnType<string>;
    password: ColumnType<string>;
    role: "admin" | "user";
    is_verified: ColumnType<boolean>;
    last_login: ColumnType<Date>;
    created_at: ColumnType<Date>;
    updated_at: ColumnType<Date>;
}
export type UserSelect = Selectable<User>;
export type UserInsert = Insertable<User>;
export type UserUpdate = Updateable<User>;
