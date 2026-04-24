import { getDB } from "../../db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const findUserByEmail = async (data) => {
  
  const email = data.email;

  const db = await getDB();
  const existingUser = await db
    .collection(process.env.MONGO_COLLECTION)
    .findOne({ email });

  if (!existingUser) {
    return {
      status: 404,
      success: false,
      message: "You need to Register first"
    };
  }

  const isMatch = await bcrypt.compare(data.password, existingUser.password);

  if (!isMatch) {
    return {
      status: 401,
      success: false,
      message: "Wrong password"
    };
  }

  const token = jwt.sign(
    { id: existingUser._id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    status: 200,
    success: true,
    existingUser,
    message: "User LogIn Successfully",
    token,
    logInAt: new Date()
  };
};

export default findUserByEmail;