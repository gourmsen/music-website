// basics
import dotenv from "dotenv";
import fs from "fs";
import { cleanEnv, port, str, bool } from "envalid";
import { CustomError } from "./classes/errors";
import { fetchToken, verifyToken } from "./modules/jwt";

// server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// http
import http from "http";
import https from "https";

// loggers
import { systemLogger, apiLogger } from "./modules/logger";

// requests (get)
import { viewUser } from "./requests/user-detail";

// requests (post)
import { register } from "./requests/register";
import { login } from "./requests/login";
import { verifyEmail } from "./requests/verify-email";
import { verifyResend } from "./requests/verify-resend";
import { resetPassword } from "./requests/reset-password";
import { updateUser } from "./requests/user-update";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    PORT: port(),
    PROD: bool(),
    KEY_PATH: str(),
    CERT_PATH: str(),
    FRONTEND_URL: str(),
    HTTPS: bool(),
});
export default env;

// create express app
const app = express();

// create server depending on environment
let server;
if (env.PROD) {
    // define private key and certificate file for SSL
    let credentials = {
        key: fs.readFileSync(env.KEY_PATH, "utf8"),
        cert: fs.readFileSync(env.CERT_PATH, "utf8"),
    };

    // create https server (production)
    server = https.createServer(credentials, app);
} else {
    // create http server (development)
    server = http.createServer(app);
}

// cors options
const corsOptions = {
    origin: env.FRONTEND_URL,
    credentials: true,
};

// handle CORS for Angular
app.use(cors(corsOptions));

// parse JSON body
app.use(express.json());

// parse cookies
app.use(cookieParser());

/*
<----- GET REQUESTS ----->
*/

// default
app.get("/", (req, res) => {});

// user-detail
app.get("/user-detail", async (req, res) => {
    let { email } = req.body;

    logApiMessage("http", "Request", req, { email: email });

    try {
        let token = await fetchToken(req);
        await verifyToken(token);
        let result = await viewUser(email);
        res.status(200).json(result);

        logApiMessage("info", "Success", req, { email: email });
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });

        logApiMessage("warn", "Failure", req, { email: email }, (error as CustomError).status);
    }
});

/*
<----- POST REQUESTS ----->
*/

// register
app.post("/register", async (req, res) => {
    let { email, password } = req.body;

    logApiMessage("http", "Request", req, { email: email });

    try {
        let result = await register({ email, password });
        res.status(200).json(result);

        logApiMessage("info", "Success", req, { email: email });
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });

        logApiMessage("warn", "Failure", req, { email: email }, (error as CustomError).status);
    }
});

// login
app.post("/login", async (req, res) => {
    let { email, password } = req.body;

    logApiMessage("http", "Request", req, { email: email });

    try {
        let result = await login(email, password);
        res.cookie("token", result.payload.token, {
            httpOnly: true,
            secure: env.HTTPS,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1 hour
        });
        delete result.payload.token;
        res.status(200).json(result);

        logApiMessage("info", "Success", req, { email: email });
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });

        logApiMessage("warn", "Failure", req, { email: email }, (error as CustomError).status);
    }
});

// verify-email
app.post("/verify-email", async (req, res) => {
    let { token } = req.body;

    logApiMessage("http", "Request", req, { token: token });

    try {
        let result = await verifyEmail(token);
        res.status(200).json(result);

        logApiMessage("info", "Success", req, { token: token });
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });

        logApiMessage("warn", "Failure", req, { token: token }, (error as CustomError).status);
    }
});

// verify-resend
app.post("/verify-resend", async (req, res) => {
    let { email } = req.body;

    logApiMessage("http", "Request", req, { email: email });

    try {
        let result = await verifyResend(email);
        res.status(200).json(result);

        logApiMessage("info", "Success", req, { email: email });
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });

        logApiMessage("warn", "Failure", req, { email: email }, (error as CustomError).status);
    }
});

// reset-password
app.post("/reset-password", async (req, res) => {
    let { email } = req.body;

    logApiMessage("http", "Request", req, { email: email });

    try {
        let result = await resetPassword(email);
        res.status(200).json(result);

        logApiMessage("info", "Success", req, { email: email });
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });

        logApiMessage("warn", "Failure", req, { email: email }, (error as CustomError).status);
    }
});

/*
<----- PATCH REQUESTS ----->
*/

// user-update
app.patch("/user-update", async (req, res) => {
    let { token } = req.body;
    let data = req.body;

    let prunedData = { ...data };
    delete prunedData.password;

    logApiMessage("http", "Request", req, prunedData);

    try {
        token = token || (await fetchToken(req));
        let result = await updateUser(token, data);
        res.status(200).json(result);

        logApiMessage("info", "Success", req, prunedData);
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });

        logApiMessage("warn", "Failure", req, prunedData, (error as CustomError).status);
    }
});

/*
<----- EXPRESS LAUNCH ----->
*/

// activate app and listen on port
server.listen(env.PORT, () => {
    systemLogger.info("API is online on port " + env.PORT);
});

function logApiMessage(level: string, message: string, req: any, data?: any, status?: number) {
    let defaults = {
        ip: req.ip,
        method: req.method,
        url: req.url,
    };

    let parameters: string = "";
    for (let key in data) {
        parameters += `${key}: ${data[key]}, `;
    }
    parameters = parameters.slice(0, -2);
    parameters = `(${parameters})`;

    message += ` ${parameters}`;

    if (status) message += ` -> ${status}`;

    switch (level) {
        case "http":
            apiLogger.http(message, defaults);
            break;
        case "info":
            apiLogger.info(message, defaults);
            break;
        case "warn":
            apiLogger.warn(message, defaults);
            break;
        case "error":
            apiLogger.error(message, defaults);
            break;
        default:
            apiLogger.info(message, defaults);
    }
}
