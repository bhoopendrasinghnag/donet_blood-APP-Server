import jwt from "jsonwebtoken";
import registerRepository from "../reposetory/registerReposetory.js";

const registerUserService = async (data) => {

  const userExists = await registerRepository.findUserByEmail(data.email);
  if (userExists) {
    return {
      success: false,
      message: "User already exists",
      error: "User already exists"
    }
  }

  // 2️⃣ Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generated OTP:", otp);

  const token = jwt.sign(
    {
      userData: data,
      otp: otp,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

  console.log(token);
  

  await registerRepository.otpSender(data.email, otp);

  return {
    success: true,
    message: "OTP sent successfully",
    token,
  };
};

export default registerUserService;