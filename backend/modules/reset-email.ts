// basic
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import { generateToken } from "./jwt";
import { sendEmail } from "./email";

// create environment variables conforming to TypeScript
dotenv.config();
const env = cleanEnv(process.env, {
    JWT_EXP_RESET: str(),
    FRONTEND_URL: str(),
});
export default env;

export const sendResetEmail = async (user: any) => {
    // generate token
    let token = await generateToken(
        {
            email: user.email,
            role: user.role,
        },
        user.id.toString(),
        env.JWT_EXP_RESET
    );

    let resetLink = process.env.FRONTEND_URL + "/reset?token=" + token;

    // send email
    let subject = "Reset Password";
    let text = "Reset your password with this link: " + resetLink;
    let html = `<p>Reset your password with <a href="${resetLink}">this link</a></p>`;

    await sendEmail(user.email, subject, text, html);
};
