import dotenv from "dotenv";
import SibApiV3Sdk from "sib-api-v3-sdk";
import { getDB } from "../../db.js";

dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const saveDonationForm = async (formData) => {
    console.log(formData.donationDate);

    const db = await getDB();
    const response = await db.collection(process.env.DONATIONFORM_COLLECTION).insertOne(formData);

    console.log("response:", response);

    const email = formData.email;

    const sendConfirmationEmail = async (email) => {
        await apiInstance.sendTransacEmail({
            sender: {
                email: process.env.EMAIL_USER,
                name: "Blood Donation App"
            },
            to: [{ email }],
            subject: "Blood Donation Registration Successful 🩸",
            htmlContent: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 500px; margin: auto; background: white; padding: 25px; border-radius: 10px;">
                        
                        <h2 style="color: #d32f2f; text-align: center;">
                            🩸 Thank You for Registering!
                        </h2>

                        <p style="font-size: 16px; color: #333;">
                            Hi <b>${formData.name || "Donor"}</b>,
                        </p>

                        <p style="font-size: 15px; color: #555;">
                            Your blood donation registration has been successfully completed. 🎉  
                            Your willingness to donate blood can save lives and make a real difference.
                        </p>

                        <div style="background: #fff3f3; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p><b>📍 Location:</b> ${formData.hospital + " " + formData.district + " " + formData.state || "N/A"}</p>
                            <p><b>🩸 Blood Group:</b> ${formData.bloodGroup || "N/A"}</p>
                            <p><b>📞 Contact:</b> ${formData.phone || "N/A"}</p>
                            <p><b>📞 Donation Date:</b> ${formData.preferredTime || "N/A"} ${formData.donationDate || "N/A"}</p>
                        </div>

                        <p style="font-size: 14px; color: #777;">
                            We will notify you when someone needs your help.
                        </p>

                        <hr style="margin: 20px 0;" />

                        <p style="font-size: 12px; color: #aaa; text-align: center;">
                            ❤️ Thank you for being a lifesaver!
                        </p>

                    </div>
                </div>
            `,
        });
    };

    await sendConfirmationEmail(email);

    return {
        success: true,
        data: response,
        message: "Donation Successful 🎉"
    };
};

export default saveDonationForm;