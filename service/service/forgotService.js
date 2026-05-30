import forgotRepository from "../reposetory/forgotRepository.js";

const updatePasswordService = async (email) => {
  if (!email) {
    throw new Error("Email required");
  }

  const user = await forgotRepository.findUserByEmail(email);
  if (user) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return await forgotRepository.otpSender(email, otp);
  }

};

export default {
  updatePasswordService
};