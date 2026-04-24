import bcrypt from "bcryptjs";
import forgotRepository from "../reposetory/forgotRepository.js";

const updatePasswordService = async ({ email, password }) => {

  if (!email || !password) {
    throw new Error("Email and new password required");
  }

  const user = await forgotRepository.findUserByEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  await forgotRepository.updatePassword(email, hashedPassword);

  return {
    message: "Password updated successfully"
  };
};

export default {
  updatePasswordService
};