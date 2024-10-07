// basics
import dotenv from "dotenv";
import betterLogging from "better-logging";
import fs from "fs";
import { cleanEnv, port, str, bool } from "envalid";
import { CustomError } from "./classes/errors";

// server
import express from "express";
import cors from "cors";

// http
import http from "http";
import https from "https";

// requests (get)
import { viewUser } from "./requests/user-detail";

// requests (post)
import { register } from "./requests/register";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    PORT: port(),
    PROD: bool(),
    KEY_PATH: str(),
    CERT_PATH: str(),
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

// handle CORS for Angular
app.use(cors());

// parse JSON body
app.use(express.json());

// setup better logging
betterLogging(console);

/*
<----- GET REQUESTS ----->
*/

// default
app.get("/", (req, res) => {});

// user-detail
app.get("/user-detail", async (req, res) => {
    let { email } = req.body;

    try {
        let result = await viewUser(email);
        res.status(200).json(result);
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });
    }
});

/*
<----- POST REQUESTS ----->
*/

// register
app.post("/register", async (req, res) => {
    let { email, password } = req.body;

    try {
        let result = await register({ email, password });
        res.status(200).json(result);
    } catch (error) {
        res.status((error as CustomError).status).json({
            name: (error as CustomError).name,
            message: (error as CustomError).message,
        });
    }
});

/*
<----- EXPRESS LAUNCH ----->
*/

// activate app and listen on port
server.listen(env.PORT, () => {
    console.log("API is online on port " + env.PORT);
});
