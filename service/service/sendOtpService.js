import jwt from "jsonwebtoken";
import forgotRepo from "../reposetory/sendOtpRepository.js";

const sendOtpService = async ({ email }) => {

  
  const user = await forgotRepo.findUserByEmail(email);

  if (!user) throw new Error("User not found");

  const otp = await forgotRepo.otpSender(email)

  await forgotRepo.saveOtp(email, otp);



  return { message: "OTP sent successfully" };
};



export default sendOtpService;
