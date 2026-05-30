import { getDB } from "../../db.js";
import SibApiV3Sdk from "sib-api-v3-sdk";

const collection = process.env.MONGO_COLLECTION;

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const findUserByEmail = async (email) => {
  const db = await getDB();
  const user = await db.collection(collection).findOne(email);
  return user;
};

const otpSender =
  async (email, otp) => {

    try {
      const response = await apiInstance.sendTransacEmail({
        sender: {
          email: process.env.EMAIL_USER,
          name: "Blood Donation App"
        },
        to: [email],
        subject: "OTP Verification",
        htmlContent: `
              <div style="font-family: Arial; padding: 20px;">
                <h2> Blood Donation App ❤️ </h2>
                <h1> verification OTP : ${otp} </h1>
                <p> This OTP is valid for 5 minutes. </p>
              </div>
            `
      });

      const data = {
        status: true,
        otp: otp
      }
      
      console.log("MAIL SENT ✅");
      return data;

    } catch (err) {

      console.log("MAIL ERROR ❌");
      console.log(err);
      throw err;
    }
  };

export default {
  findUserByEmail,
  otpSender,
};