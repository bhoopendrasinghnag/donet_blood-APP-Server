import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import verifyOtpRepository from "../reposetory/verifyOTPRepository.js";
// import registerRepository  from "../reposetory/registerReposetory.js"
import dotenv from "dotenv";

dotenv.config();

const verifyregisterOtpService = async (formData, token, otp) => {  
console.log(token);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);    
    
  } catch (err) {
    return {success: false, message: err.message}
  }

  if (decoded.otp !== otp) {
    return {message : "Invalid OTP" ,success: false}
  }
  
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  return {
    success: true,
    message: "Otp Verified!",

  };
};






const verifyOtpService = async ({ token, otp }) => {
  const user = await verifyOtpRepository(token, otp);  

  return {
    message: "Otp Verified Enter New password !",
  };
};


export default {verifyOtpService, verifyregisterOtpService}