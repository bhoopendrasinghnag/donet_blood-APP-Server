import bcrypt from "bcrypt";
import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
import { getDB } from "../../db.js";

dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const updatePassword = async (email, password) => {
    console.log("newPassword", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const db = await getDB();
    const response = await db.collection(process.env.MONGO_COLLECTION).updateOne(
        { email },
        {
            $set: { password: hashedPassword }
        });

    console.log("response:", response);

    const sendConfirmationEmail = async (email) => {
        await apiInstance.sendTransacEmail({
            sender: {
                email: process.env.EMAIL_USER,
                name: "Blood Donation Portal"
            },
            to: [{ email }],
            subject: "🔐 Password Updated Successfully",
            htmlContent: `
                    <div style="font-family:Arial; padding:20px;">
                    <h2 style="color:#16a34a;">
                        🔐 Password Updated Successfully
                    </h2>
                    <p> Your Blood Donation Portal password has been changed. </p>
                    <p> ❤️ Thank you,<br/> Blood Donation Portal Team </p>
                    </div>
                    `
        });
    };

    await sendConfirmationEmail(email);

    return {
        success: true,
        message: "Password Changed 🎉"
    };
};

export default updatePassword;