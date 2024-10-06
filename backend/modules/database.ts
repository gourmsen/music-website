// basics
import dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

// database
import { Database } from "../database/types/database";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASS: str(),
    DB_HOST: str(),
    DB_PORT: port(),
});
export default env;

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
