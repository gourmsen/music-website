// basics
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";

// loggers
import { createLogger, format, transports } from "winston";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    LOG_LEVEL: str(),
});
export default env;

// system format
const systemFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
    })
);

// API format
const apiFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, ip, level, method, url, message }) => {
        return `[${timestamp}] [${ip}] [${level.toUpperCase()}] [${method}] [${url}]: ${message}`;
    })
);

// system logger
export const systemLogger = createLogger({
    level: env.LOG_LEVEL,
    defaultMeta: { service: "system" },
    transports: [
        new transports.Console({
            format: systemFormat,
        }),
        new transports.File({
            filename: "logs/system.log",
            format: systemFormat,
        }),
    ],
});

// API logger
export const apiLogger = createLogger({
    level: env.LOG_LEVEL,
    defaultMeta: { service: "api" },
    transports: [
        new transports.Console({
            format: apiFormat,
        }),
        new transports.File({
            filename: "logs/api.log",
            format: apiFormat,
        }),
    ],
});
