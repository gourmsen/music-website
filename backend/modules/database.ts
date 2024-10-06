// basics
import env from "../app";

// database
import { Database } from "../database/types/database";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
    pool: new Pool({
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASS,
        host: env.DB_HOST,
        port: env.DB_PORT,
    }),
});

// create database instance
export const db = new Kysely<Database>({
    dialect,
});
