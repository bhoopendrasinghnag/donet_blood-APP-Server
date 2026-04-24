import { getDB } from "../../db.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const collectionName = process.env.MONGO_COLLECTION;

const findUserByEmail = async (email, otp) => {
  const db = await getDB();
  const user = await db.collection(collectionName).findOne({email})

  if (!user) throw new Error("User not found");
  console.log(user);
  

  if (user.resetOtp !== otp) throw new Error("Invalid OTP");
  
  if (new Date() > user.resetOtpExpiry)

    throw new Error("OTP expired");

  return {
    message: "Otp Verified. Enter New password !",
  };
}



export default findUserByEmail;