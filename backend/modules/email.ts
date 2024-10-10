// basics
import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";
import nodemailer from "nodemailer";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    SMTP_HOST: str(),
    SMTP_PORT: port(),
    SMTP_USER: str(),
    SMTP_PASS: str(),
});
export default env;

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    let transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: false,
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: '"Max Niessl"' + " <" + env.SMTP_USER + ">",
        to: to,
        subject: subject,
        text: text,
        html: html,
    });
};
