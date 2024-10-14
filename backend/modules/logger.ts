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

// custom format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

// system logger
export const systemLogger = createLogger({
    level: env.LOG_LEVEL,
    defaultMeta: { service: "system" },
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.align(), logFormat),
        }),
        new transports.File({
            filename: "logs/system.log",
            format: format.combine(format.uncolorize(), logFormat, format.json(), format.prettyPrint()),
        }),
    ],
});

// API logger
export const apiLogger = createLogger({
    level: env.LOG_LEVEL,
    defaultMeta: { service: "api" },
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.align(), logFormat),
        }),
        new transports.File({
            filename: "logs/api.log",
            format: format.combine(format.uncolorize(), logFormat, format.json(), format.prettyPrint()),
        }),
    ],
});
