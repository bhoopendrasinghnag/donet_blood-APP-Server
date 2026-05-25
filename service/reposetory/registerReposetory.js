import { getDB } from "../../db.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import SibApiV3Sdk from "sib-api-v3-sdk";


dotenv.config();

const collection = process.env.MONGO_COLLECTION;

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// ================= FIND USER =================
const findUserByEmail = async (email) => {
  const db = await getDB();
  return await db.collection(collection).findOne({ email });
};

const otpSender =
  async (email, otp) => {

    try {
      const response = await apiInstance.sendTransacEmail({
        sender: {
          email: process.env.EMAIL_USER,
          name: "Blood Donation App"
        },
        to: [{ email }],
        subject: "OTP Verification",
        htmlContent: `
              <div style="font-family: Arial; padding: 20px;">
                <h2> Blood Donation App ❤️ </h2>
                <h1> OTP: ${otp} </h1>
                <p> This OTP is valid for 5 minutes. </p>
              </div>
            `
      });

      console.log("MAIL SENT ✅");

      console.log(response);
      return true;

    } catch (err) {

      console.log("MAIL ERROR ❌");
      console.log(err);
      throw err;
    }
  };

// ================= CREATE USER =================
const createUser = async (userData) => {
  const db = await getDB();
  const { confirmPassword, ...user } = userData;
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  user.password = hashedPassword;
  user.createdAt = new Date();
  console.log("UserDasta", user);
  const response = await db.collection(collection).insertOne(user);

  return {
    success: true,
    data: response,
    message: "Registration Successful 🎉"
  };
};

export default {
  findUserByEmail,
  otpSender,
  createUser,
};