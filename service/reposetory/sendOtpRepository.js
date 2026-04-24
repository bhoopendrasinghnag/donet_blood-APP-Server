import { getDB } from "../../db.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// 🔹 Find user by email
const findUserByEmail = async (email) => {
  
  const db = await getDB();
  const user= await db.collection(process.env.MONGO_COLLECTION).findOne({ email }); 
  
  return user;
  };


const otpSender = async(email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h3>Your OTP is: ${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });
    return otp;

}
// 🔹 Save OTP
const saveOtp = async (email, otp) => {
  const db = await getDB();

  return await db.collection(process.env.MONGO_COLLECTION).updateOne(
    { email },
    {
      $set: { resetOtp: otp ,
        resetOtpExpiry: new Date(Date.now() + 10 * 60 * 1000)
      },
    }
  );
};


export default {
  findUserByEmail,
  otpSender,
  saveOtp,
};