import { getDB } from "../../db.js";

const collection = process.env.MONGO_COLLECTION;

const findUserByEmail = async (email) => {
  const db = await getDB();
  return await db.collection(collection).findOne({ email });
};

const updatePassword = async (email, hashedPassword) => {
  const db = await getDB();

  return await db.collection(collection).updateOne(
    { email },
    {
      $set: { password: hashedPassword },
      $unset: { resetOtp: "", resetOtpExpiry: "" }
    }
  );
};

export default {
  findUserByEmail,
  updatePassword
};