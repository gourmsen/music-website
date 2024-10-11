// basic
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { generateToken } from "./jwt";
import { sendEmail } from "./email";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    JWT_EXP_EMAIL: str(),
    FRONTEND_URL: str(),
});
export default env;

export const sendVerifyEmail = async (user: any) => {
    // generate token
    let token = await generateToken(
        {
            email: user.email,
            role: user.role,
        },
        user.id.toString(),
        env.JWT_EXP_EMAIL
    );

    let verifyLink = process.env.FRONTEND_URL + "/verify?token=" + token;

    // send email
    let subject = "Email Verification";
    let text = "Please verify your email with this link: " + verifyLink;
    let html = `<p>Please verify your email with <a href="${verifyLink}">this link</a></p>`;

    await sendEmail(user.email, subject, text, html);
};
